import PazdoraWorker from 'worker-loader?name=static/[hash].worker.js!./pazdora-cal.worker'
import {
  GenerateFieldOptions,
  GenerateFieldStatsReturn,
  CalcReturn
} from '../../utils/pazdora-cal/pazdora-cal'
import AsyncLock from 'async-lock'
import { PostMessageData } from './pazdora-cal.worker'
import {
  ConditionFactoryOptions,
  ConditionClasses
} from '../../utils/pazdora-cal/Condition'

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

  /**
   * optionの条件で盤面を生成し、
   * conditionで指定された条件に対する欠損率を計算します。
   * webWorkerを使ってマルチスレッドで実行されます。
   *
   * @param option 生成する盤面の条件
   * @param conditions 欠損率計算の条件。内側の配列に指定された条件通しはandで評価され、
   * 外側の条件で指定された条件通しはor で評価される。
   */
  async parallelCalc(
    option: GenerateFieldOptions = {},
    conditions: ConditionFactoryOptions<keyof ConditionClasses>[][]
  ): Promise<CalcReturn> {
    if (!option.loopCnt) throw new Error('ループ回数が設定されていません')
    return await this.asyncLock.acquire<CalcReturn>('pazdora', async () => {
      const result = this.workers.map(worker => {
        const _option: PostMessageData = {
          arg: {
            option: {
              ...option,
              loopCnt: Math.floor((option.loopCnt as number) / this.threadNum)
            },
            condition: conditions
          },
          type: 'calc'
        }

        return this.communicateWithWorker<CalcReturn>(worker, _option)
      })
      const reses = await Promise.all(result)
      return reses.reduce(
        (acc, cur) => {
          return {
            total: acc.total + cur.total,
            correct: acc.correct + cur.correct,
            rate: (acc.rate + cur.rate) / 2
          }
        },
        { total: 0, correct: 0, rate: reses[0].rate } as CalcReturn
      )
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
