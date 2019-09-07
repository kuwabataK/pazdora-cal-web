import PazdoraWorker from 'worker-loader?name=static/[hash].worker.js!../workers/pazdora-cal.worker'
import { GenerateFieldOptions, GenerateFieldStatsReturn } from './pazdora-cal'
import AsyncLock from 'async-lock'
import { PostMessageData } from '../workers/pazdora-cal.worker'

export default class AsyncPazdoraCal {
  private threadNum = 4
  private workers: PazdoraWorker[] = []
  private asyncLock = new AsyncLock()

  constructor(threadNum = 4) {
    this.threadNum = threadNum
    this.workers = new Array(threadNum).fill(0).map(() => {
      return new PazdoraWorker()
    })
  }

  /**
   * workerスレッドを使って、盤面を生成して返す
   * @param option
   */
  async asyncGenerateFields(
    option: GenerateFieldOptions = {}
  ): Promise<number[][][]> {
    if (!option.loopCnt) return []
    return await this.asyncLock.acquire('pazdora', async () => {
      const result = this.workers.map(worker => {
        const _option = {
          ...option,
          loopCnt: Math.floor((option.loopCnt as number) / this.threadNum)
        }
        return this.generateField(worker, _option)
      })
      const reses = await Promise.all(result)
      return reses.flat()
    })
  }

  /**
   * workerスレッドを使って、盤面を生成し、各色のドロップの数を返す
   * @param option
   */
  async asyncGenerateFieldStats(
    option: GenerateFieldOptions = {}
  ): Promise<GenerateFieldStatsReturn[]> {
    if (!option.loopCnt) return []
    return await this.asyncLock.acquire('pazdora', async () => {
      const result = this.workers.map(worker => {
        const _option = {
          ...option,
          loopCnt: Math.floor((option.loopCnt as number) / this.threadNum)
        }
        return this.generateFieldStat(worker, _option)
      })
      const reses = await Promise.all(result)
      return reses.flat()
    })
  }

  /**
   * 指定したworkerでパズドラの盤面を生成して、盤面内のドロップの数を返す
   *
   * @param worker
   * @param option
   */
  private generateFieldStat(
    worker: PazdoraWorker,
    option: GenerateFieldOptions = {}
  ): Promise<GenerateFieldStatsReturn[]> {
    const _option: PostMessageData = {
      arg: option,
      type: 'generateFieldStats'
    }

    return new Promise(resolve => {
      worker.onmessage = e => {
        resolve(e.data)
      }
      worker.postMessage(_option)
    })
  }

  /**
   * 指定したworkerでパズドラの盤面を生成して返す
   *
   * @param worker
   * @param option
   */
  private generateField(
    worker: PazdoraWorker,
    option: GenerateFieldOptions = {}
  ): Promise<number[][][]> {
    const data: PostMessageData = {
      arg: option,
      type: 'generateFields'
    }
    return new Promise(resolve => {
      worker.onmessage = e => {
        resolve(e.data)
      }
      worker.postMessage(data)
    })
  }

  dispose() {
    this.asyncLock.acquire('pazdora', () => {
      this.workers.forEach(w => {
        w.terminate()
      })
      this.workers = []
    })
  }
}
