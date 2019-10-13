import PazdoraCalController from '../workers/pazdora-cal/pazdora-cal-worker-controller'
import { GenerateFieldOptions } from '../utils/pazdora-cal/pazdora-cal'
import { ConditionFactoryOptions } from '../utils/pazdora-cal/Condition'
import { observable, action, computed } from 'mobx'

export class PazdoraCalStore {
  /**
   * 計算ページで管理しているリーダースキルの条件
   */
  @observable private _conditions: ConditionFactoryOptions[][] = [[]]

  /**
   * 計算するリーダースキルの条件を指定する
   * @param conditions
   */
  @action
  setConditions(conditions: ConditionFactoryOptions[]) {
    this._conditions[0] = conditions
  }

  /**
   * 指定した条件を更新する
   */
  @action
  setCondition(index: number, condition: ConditionFactoryOptions) {
    this._conditions[0][index] = condition
    this._conditions = [...this._conditions]
  }

  /**
   * 計算ロジックの0番目の条件を返します。
   * ここで返された条件は全部andで評価されます。
   * 現時点では計算ページでは、andの条件しか指定できないので、不要な配列を削除しています
   */
  @computed
  get conditions() {
    return this._conditions[0]
  }

  /**
   * 計算ページで管理している盤面の条件
   */
  @observable option: GenerateFieldOptions = {}

  /**
   * 盤面の条件を指定する
   * @param option
   */
  @action
  setOption(option: GenerateFieldOptions) {
    this.option = option
  }

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
   * ストアの条件で計算を行う
   */
  calcParallelInStoreCondition() {
    return this.calcParallel(this.option, this._conditions)
  }
  /**
   * スレッドを破棄します
   */
  dispose() {
    if (this.pazdoraCalController) this.pazdoraCalController.dispose()
  }
}
