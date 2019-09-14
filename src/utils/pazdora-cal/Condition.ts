/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerateFieldStatsReturn } from './pazdora-cal'

export type ConditionFactoryOptions = {
  type: 'Drop' | 'Combo' | 'MultiColor'
  opt: {
    num?: number
    outOfNum?: number
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
      this.num = opt.num || 3
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
  num = 3
  isValid(field: GenerateFieldStatsReturn) {
    switch (this.ope) {
      case 'more':
        return field[this.color] >= this.num
      case 'less':
        return field[this.color] <= this.num
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
      this.num = opt.num || 3
      this.ope = opt.ope || 'more'
    }
  }
  ope: 'more' | 'less' = 'more'
  num = 3
  isValid(field: GenerateFieldStatsReturn) {
    switch (this.ope) {
      case 'more':
        return (
          Object.values(field).reduce((acc, cur) => {
            return acc + Math.floor(cur / 3)
          }, 0) >= this.num
        )
      case 'less':
        return (
          Object.values(field).reduce((acc, cur) => {
            return acc + Math.floor(cur / 3)
          }, 0) <= this.num
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
      this.num = opt.num || 5
      this.outOfNum = opt.outOfNum || 6
      this.ope = opt.ope || 'more'
    }
  }
  ope: 'more' | 'less' = 'more'
  num = 5
  outOfNum = 6
  isValid(field: GenerateFieldStatsReturn) {
    switch (this.ope) {
      case 'more': {
        const f = Object.values(field).slice(0, this.outOfNum)
        return f.sort((a, b) => b - a)[this.num - 1] >= 3
      }
      case 'less': {
        const f = Object.values(field).slice(0, this.outOfNum)
        return f.sort((a, b) => b - a)[this.num - 1] <= 3
      }
      default:
        return true
    }
  }
}

export type DropColor = 'red' | 'blue' | 'green' | 'white' | 'black' | 'heart'

export interface Condition {
  isValid: (field: GenerateFieldStatsReturn) => boolean
}
