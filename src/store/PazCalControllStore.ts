import PazdoraCalController from '../workers/pazdora-cal/pazdora-cal-worker-controller'
import { GenerateFieldOptions } from '../utils/pazdora-cal/pazdora-cal'
import { ConditionFactoryOptions } from '../utils/pazdora-cal/Condition'

export class PazCalControllStore {
  // 計算用のスレッドを管理するためのクラスのインスタンス
  pazdoraCalController: PazdoraCalController | null = null
  /**
   * スレッドを生成します。
   * @param threadNum スレッド数
   */
  createThread(threadNum = 4) {
    this.dispose()
    this.pazdoraCalController = new PazdoraCalController(threadNum)
  }
  /**
   * マルチスレッドで、欠損率の計算を実行します。
   */
  calcParallel(
    option: GenerateFieldOptions,
    conditions: ConditionFactoryOptions[][]
  ) {
    if (!this.pazdoraCalController) {
      throw new Error('計算用のWebWorkerコントローラーが生成されていません')
    }
    return this.pazdoraCalController.parallelCalc(option, conditions)
  }

  /**
   * スレッドを破棄します
   */
  dispose() {
    if (this.pazdoraCalController) this.pazdoraCalController.dispose()
  }
}
