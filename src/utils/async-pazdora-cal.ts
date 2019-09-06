import PazdoraWorker from 'worker-loader?name=static/[hash].worker.js!../workers/pazdora-cal.worker'
import { GenerateFieldOptions } from './pazdora-cal'
import AsyncLock from 'async-lock'

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

  private generateField(
    worker: PazdoraWorker,
    option: GenerateFieldOptions = {}
  ): Promise<number[][][]> {
    return new Promise(resolve => {
      worker.onmessage = e => {
        resolve(e.data)
      }
      worker.postMessage(option)
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
