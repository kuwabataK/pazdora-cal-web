/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerateFieldStatsReturn } from './pazdora-cal'
import {
  DropColors,
  ConditionClasses,
  ConditionFactoryOptions,
  Condition,
  DropColor,
  ChainDrop
} from './ConditionTypes'

abstract class BaseCondition {
  /**
   * 継承先のクラスコンストラクタの引数で指定されたobjを自分自身にマージするためのメソッド
   * 継承先のコンストラクタの中で呼び出す
   * @param self 自分自身。thisを指定する
   * @param obj マージするObject
   */
  protected readonly merge = (self: any, obj?: { [key: string]: any }) => {
    if (!obj) return
    Object.keys(obj).forEach(key => {
      self[key] = obj[key]
    })
  }

  /**
   * 自分自身のシャローコピーを返します
   */
  readonly clone = (): this => {
    return { ...this, __proto__: (this as any).__proto__ }
  }
}

/**
 * worker側に関数を持ったオブジェクトを渡せないので、
 * worker側でConditionを作成できるようにするためのFactoryクラス
 */
export class ConditionFactory {
  static createCondition<T extends keyof ConditionClasses>(
    options: ConditionFactoryOptions<T>
  ) {
    switch (options.type) {
      case 'Drop':
        return new DropCondition(options.opt as Partial<DropCondition>)
      case 'Combo':
        return new ComboCondition(options.opt as Partial<ComboCondition>)
      case 'MultiColor':
        return new MultiColorCondition(options.opt as Partial<
          MultiColorCondition
        >)
      default:
        break
    }
  }
}

/**
 * 特定の色のドロップの数を数えて、指定した条件に一致するかどうかを判定するためのクラス
 */
export class DropCondition extends BaseCondition implements Condition {
  constructor(opt?: Partial<DropCondition>) {
    super()
    this.merge(this, opt)
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
  chainDrop: ChainDrop | null = null
  readonly isValid = (field: GenerateFieldStatsReturn) => {
    // 繋げて消せない場合はfalseを返す
    if (
      this.chainDrop &&
      field[this.chainDrop.dropColor] < this.chainDrop.num
    ) {
      return false
    }
    switch (this.ope) {
      case 'more':
        return (
          Object.entries(field).reduce((acc, cur) => {
            let num
            if (this.chainDrop && cur[0] === this.chainDrop.dropColor) {
              num = Math.floor((cur[1] - this.chainDrop.num) / this.dropNum) + 1
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
            if (this.chainDrop && cur[0] === this.chainDrop.dropColor) {
              num = Math.floor((cur[1] - this.chainDrop.num) / this.dropNum) + 1
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
