import { BaseCondition } from './BaseCondition'
import { Condition, DropColor } from './ConditionTypes'
import { GenerateFieldStatsReturn } from '../pazdora-cal'

/**
 * 特定の色のドロップの数を数えて、指定した条件に一致するかどうかを判定するためのクラス
 */
export class DropCondition extends BaseCondition implements Condition {
  constructor(opt?: Partial<DropCondition>) {
    super()
    this.mergeToThis(this, opt)
  }

  /**
   * 対象の色
   */
  color: DropColor = 'red'
  ope: 'more' | 'less' = 'more'
  /**
   * 指定色の数
   */
  dropNum = 3
  readonly isValid = (field: GenerateFieldStatsReturn) => {
    switch (this.ope) {
      case 'more':
        return field[this.color] >= this.dropNum
      case 'less':
        return field[this.color] <= this.dropNum
      default:
        return true
    }
  }
}
