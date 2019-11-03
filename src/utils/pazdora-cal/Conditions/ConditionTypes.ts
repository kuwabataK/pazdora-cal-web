import { generateEnum } from '../../util'
import { GenerateFieldStatsReturn } from '../pazdora-cal'
import { DropCondition } from './DropCondition'
import { ComboCondition } from './ComboCondition'
import { MultiColorCondition } from './MultiColorCondition'

/**
 * Conditionの候補となるクラスたちを定義した型
 */
export type ConditionClasses = {
  Drop: DropCondition
  Combo: ComboCondition
  MultiColor: MultiColorCondition
}

export type ConditionFactoryOptions<T extends keyof ConditionClasses> = {
  type: T
  opt: Partial<ConditionClasses[T]>
}

/**
 * ドロップの色の定義を返す
 */
export const DropColors = generateEnum([
  'red',
  'blue',
  'green',
  'white',
  'black',
  'heart'
])

export type DropColor = keyof typeof DropColors

export type ChainDrop = {
  num: number
  dropColor: DropColor
}

export interface Condition {
  /**
   * オブジェクトの変数に設定した条件に、引数に指定した盤面が合致しているかどうかを返す
   */
  readonly isValid: (field: GenerateFieldStatsReturn) => boolean
}
