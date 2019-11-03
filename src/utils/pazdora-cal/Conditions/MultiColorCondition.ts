import { BaseCondition } from './BaseCondition'
import { Condition, DropColor, DropColors } from './ConditionTypes'
import { GenerateFieldStatsReturn } from '../pazdora-cal'

/**
 * 多色の欠損率を計算するためのクラス
 */
export class MultiColorCondition extends BaseCondition implements Condition {
  constructor(opt?: Partial<MultiColorCondition>) {
    super()
    this.merge(this, opt)
  }
  /**
   * moreを指定すると、指定したDropの数よりも多い時にisValidがtrueを返す
   */
  ope: 'more' | 'less' = 'more'
  /**
   * 条件に合致する色の種類数
   */
  dropColorNum = 5
  /**
   * 一個一個のDropの数。more / lessを判定する際の基準になる。
   * 欠損のチェックを行いたい場合は3を指定しておけば良い
   */
  dropNum = 3
  /**
   * 観測するDropの種類を指定する
   */
  includeDrops: DropColor[] = Object.values(DropColors)

  readonly isValid = (field: GenerateFieldStatsReturn) => {
    switch (this.ope) {
      case 'more': {
        const f = (Object.keys(field) as DropColor[])
          .filter(_f => this.includeDrops.includes(_f))
          .map(_f => field[_f])
        return f.sort((a, b) => b - a)[this.dropColorNum - 1] >= this.dropNum
      }
      case 'less': {
        const f = (Object.keys(field) as DropColor[])
          .filter(_f => this.includeDrops.includes(_f))
          .map(_f => field[_f])
        return f.sort((a, b) => b - a)[this.dropColorNum - 1] <= this.dropNum
      }
      default:
        return true
    }
  }
}
