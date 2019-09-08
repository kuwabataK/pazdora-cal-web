import PazdoraWorker from 'worker-loader?name=static/[hash].worker.js!./pazdora-cal.worker'
import {
  GenerateFieldOptions,
  GenerateFieldStatsReturn
} from '../../utils/pazdora-cal'
import AsyncLock from 'async-lock'
import { PostMessageData } from './pazdora-cal.worker'

/**
 * pazdora-workerを管理するためのクラス
 * スレッドの生成や廃棄、処理の実行を行うことができる
 */
export default class PazdoraCalWorkerController {
  private threadNum = 4
  private workers: PazdoraWorker[] = []
  private asyncLock = new AsyncLock()

  constructor(threadNum = 4) {
    this.createThread(threadNum)
  }

  /**
   * 指定した数だけスレッドを作成します
   * @param threadNum
   */
  createThread(threadNum: number) {
    if (threadNum < 0) return
    this.dispose()
    this.threadNum = threadNum
    this.workers = new Array(threadNum).fill(0).map(() => {
      return new PazdoraWorker()
    })
  }

  /**
   * workerスレッドを使って、盤面を生成して返す
   * @param option
   */
  async parallelGenerateFields(
    option: GenerateFieldOptions = {}
  ): Promise<number[][][]> {
    if (!option.loopCnt) return []
    return await this.asyncLock.acquire('pazdora', async () => {
      const result = this.workers.map(worker => {
        const data: PostMessageData = {
          arg: {
            ...option,
            loopCnt: Math.floor((option.loopCnt as number) / this.threadNum)
          },
          type: 'generateFields'
        }
        return this.communicateWithWorker<number[][][]>(worker, data)
      })
      const reses = await Promise.all(result)
      return reses.flat()
    })
  }

  /**
   * workerスレッドを使って、盤面を生成し、各色のドロップの数を返す
   * @param option
   */
  async parallelGenerateFieldStats(
    option: GenerateFieldOptions = {}
  ): Promise<GenerateFieldStatsReturn[]> {
    if (!option.loopCnt) return []
    return await this.asyncLock.acquire('pazdora', async () => {
      const result = this.workers.map(worker => {
        const _option: PostMessageData = {
          arg: {
            ...option,
            loopCnt: Math.floor((option.loopCnt as number) / this.threadNum)
          },
          type: 'generateFieldStats'
        }

        return this.communicateWithWorker<GenerateFieldStatsReturn[]>(
          worker,
          _option
        )
      })
      const reses = await Promise.all(result)
      return reses.flat()
    })
  }

  private communicateWithWorker<T>(
    worker: PazdoraWorker,
    option: PostMessageData
  ): Promise<T> {
    return new Promise(resolve => {
      worker.onmessage = e => {
        resolve(e.data)
      }
      worker.postMessage(option)
    })
  }

  /**
   * スレッドをすべて廃棄します
   */
  dispose() {
    this.asyncLock.acquire('pazdora', () => {
      this.workers.forEach(w => {
        w.terminate()
      })
      this.workers = []
    })
  }
}
