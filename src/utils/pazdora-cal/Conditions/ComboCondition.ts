import { BaseCondition } from './BaseCondition'
import { Condition, DropColor } from './ConditionTypes'
import { GenerateFieldStatsReturn } from '../pazdora-cal'

/**
 * 盤面にコンボが存在するかどうかを計算するためのクラス
 */
export class ComboCondition extends BaseCondition implements Condition {
  constructor(opt?: Partial<ComboCondition>) {
    super()
    this.merge(this, opt)
  }
  dropNum = 3
  ope: 'more' | 'less' = 'more'
  comboNum = 7
  isCheckedChainDrop = false
  chainDropNum = 0
  chainDropColor: DropColor = 'heart'

  readonly isValid = (field: GenerateFieldStatsReturn) => {
    // 繋げて消せない場合はfalseを返す
    if (
      this.isCheckedChainDrop &&
      field[this.chainDropColor] < this.chainDropNum
    ) {
      return false
    }
    switch (this.ope) {
      case 'more':
        return (
          Object.entries(field).reduce((acc, cur) => {
            let num
            if (this.isCheckedChainDrop && cur[0] === this.chainDropColor) {
              num = Math.floor((cur[1] - this.chainDropNum) / this.dropNum) + 1
            } else {
              num = Math.floor(cur[1] / this.dropNum)
            }
            return acc + num
          }, 0) >= this.comboNum
        )
      case 'less':
        return (
          Object.entries(field).reduce((acc, cur) => {
            let num
            if (this.isCheckedChainDrop && cur[0] === this.chainDropColor) {
              num = Math.floor((cur[1] - this.chainDropNum) / this.dropNum) + 1
            } else {
              num = Math.floor(cur[1] / this.dropNum)
            }
            return acc + num
          }, 0) <= this.comboNum
        )
      default:
        return true
    }
  }
}
