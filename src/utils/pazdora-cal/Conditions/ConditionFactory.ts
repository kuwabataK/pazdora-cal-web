import { ConditionClasses, ConditionFactoryOptions } from './ConditionTypes'
import { DropCondition } from './DropCondition'
import { ComboCondition } from './ComboCondition'
import { MultiColorCondition } from './MultiColorCondition'

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
