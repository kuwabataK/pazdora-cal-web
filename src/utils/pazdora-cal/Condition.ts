/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerateFieldStatsReturn } from './pazdora-cal'

export type ConditionFactoryOptions = {
  type: 'Drop' | 'Combo' | 'MultiColor'
  opt: {
    /**
     * 対象のドロップの個数
     */
    dropNum?: number
    /**
     * 候補となるドロップの種類
     */
    includeDrops?: DropColor[]
    /**
     * 候補となるドロップの種類が何種類あれば良いかを指定
     */
    dropColorNum?: number
    /**
     * コンボ数
     */
    comboNum?: number
    color?: DropColor
    ope?: 'more' | 'less'
  }
}

/**
 * worker側に関数を持ったオブジェクトを渡せないので、
 * worker側でConditionを作成できるようにするためのFactoryクラス
 */
export class ConditionFactory {
  static createCondition(options: ConditionFactoryOptions) {
    switch (options.type) {
      case 'Drop':
        return new DropCondition(options.opt)
      case 'Combo':
        return new ComboCondition(options.opt)
      case 'MultiColor':
        return new MultiColorCondition(options.opt)
      default:
        break
    }
  }
}

/**
 * 特定の色のドロップの数を数えて、指定した条件に一致するかどうかを判定するためのクラス
 */
export class DropCondition implements Condition {
  constructor(opt?: ConditionFactoryOptions['opt']) {
    if (opt) {
      this.color = opt.color || 'red'
      this.dropNum = opt.dropNum || 3
      this.ope = opt.ope || 'more'
    }
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
  isValid(field: GenerateFieldStatsReturn) {
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
export class ComboCondition implements Condition {
  constructor(opt?: ConditionFactoryOptions['opt']) {
    if (opt) {
      this.comboNum = opt.comboNum || 7
      this.ope = opt.ope || 'more'
      this.dropNum = opt.dropNum || 3
    }
  }
  dropNum = 3
  ope: 'more' | 'less' = 'more'
  comboNum = 7
  isValid(field: GenerateFieldStatsReturn) {
    switch (this.ope) {
      case 'more':
        return (
          Object.values(field).reduce((acc, cur) => {
            return acc + Math.floor(cur / this.dropNum)
          }, 0) >= this.comboNum
        )
      case 'less':
        return (
          Object.values(field).reduce((acc, cur) => {
            return acc + Math.floor(cur / this.dropNum)
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
export class MultiColorCondition implements Condition {
  constructor(opt?: ConditionFactoryOptions['opt']) {
    if (opt) {
      this.dropColorNum = opt.dropColorNum || 5
      this.includeDrops = opt.includeDrops || [
        'red',
        'blue',
        'green',
        'white',
        'black',
        'heart'
      ]
      this.ope = opt.ope || 'more'
      this.dropNum = opt.dropNum || 3
    }
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
  includeDrops: DropColor[] = [
    'red',
    'blue',
    'green',
    'white',
    'black',
    'heart'
  ]
  isValid(field: GenerateFieldStatsReturn) {
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

export type DropColor = 'red' | 'blue' | 'green' | 'white' | 'black' | 'heart'

export interface Condition {
  /**
   * オブジェクトの変数に設定した条件に、引数に指定した盤面が合致しているかどうかを返す
   */
  isValid: (field: GenerateFieldStatsReturn) => boolean
}
