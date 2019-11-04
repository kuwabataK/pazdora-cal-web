import {
  GenerateFieldOptions,
  CalcReturn
} from '../utils/pazdora-cal/pazdora-cal'
import {
  ConditionFactoryOptions,
  ConditionClasses
} from '../utils/pazdora-cal/Conditions/ConditionTypes'
import { observable, action, computed, toJS } from 'mobx'
import { PazCalControllStore } from './PazCalControllStore'

export class PazdoraCalStore {
  pazCalControllStore = new PazCalControllStore()

  /**
   * 計算ページで管理しているリーダースキルの条件
   */
  @observable private _conditions: ConditionFactoryOptions<
    keyof ConditionClasses
  >[][] = [[]]

  /**
   * 計算するリーダースキルの条件を指定する
   * @param conditions
   */
  @action
  setConditions(conditions: ConditionFactoryOptions<keyof ConditionClasses>[]) {
    this._conditions[0] = conditions
    this._conditions = [...this._conditions]
  }

  /**
   * 指定した条件を更新する
   */
  @action
  setCondition(
    index: number,
    condition: ConditionFactoryOptions<keyof ConditionClasses>
  ) {
    this._conditions[0][index] = condition
    this._conditions = [...this._conditions]
  }

  @action
  addCondition(condition: ConditionFactoryOptions<keyof ConditionClasses>) {
    this._conditions[0].unshift(condition)
    this._conditions = [...this._conditions]
  }

  @action
  deleteCondition(index: number) {
    this._conditions[0].splice(index, 1)
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
  @observable option: GenerateFieldOptions = {
    loopCnt: 500000,
    width: 5,
    height: 6
  }

  /**
   * 盤面の条件を指定する
   * @param option
   */
  @action
  setOption(option: GenerateFieldOptions) {
    this.option = option
  }

  /**
   * ストアの条件で計算した計算結果
   */
  @observable result: CalcReturn | null = null

  @action
  private setResult(result: CalcReturn) {
    this.result = result
  }

  /**
   * ストアの条件で計算を行う
   */
  async calcParallelInStoreCondition() {
    const result = await this.pazCalControllStore.calcParallel(
      toJS(this.option),
      toJS(this._conditions)
    )
    this.setResult(result)
    return result
  }

  /**
   * Storeの条件で計算した欠損率を返します
   */
  @computed
  get lossRate() {
    if (!this.result) return 0
    return 100 - this.result.rate
  }

  /**
   * Storeで計算した条件に合致する盤面が存在する確率を返します
   */
  @computed
  get rate() {
    if (!this.result) return 0
    return this.result.rate
  }
}
