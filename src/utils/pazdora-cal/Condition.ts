/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerateFieldStatsReturn } from './pazdora-cal'

export type ConditionFactoryOptions = {
  type: 'Drop' | 'Combo'
  opt: {
    num?: number
    color?: DropColor
    ope: 'more' | 'less'
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

  color: DropColor = 'red'
  ope: 'more' | 'less' = 'more'
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

export type DropColor = 'red' | 'blue' | 'green' | 'white' | 'black' | 'heart'

export interface Condition {
  isValid: (field: GenerateFieldStatsReturn) => boolean
}
