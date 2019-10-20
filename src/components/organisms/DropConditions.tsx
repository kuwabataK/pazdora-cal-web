import React from 'react'
import PazButton from '../atoms/PazButton'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import store from '../../store/store'
import DropCard from '../molecules/DropCard'
import ComboCard from '../molecules/ComboCard'
import MultiColorCard from '../molecules/MultiColorCard'
import { observer } from 'mobx-react'

/**
 * ドロップ条件を追加したときの初期値
 */
const initDropCond = (): ConditionFactoryOptions => ({
  type: 'Drop',
  opt: {
    color: 'red',
    dropNum: 3,
    ope: 'more'
  }
})

/**
 * コンボ条件を追加したときの初期値
 */
const initComboCond = (): ConditionFactoryOptions => ({
  type: 'Combo',
  opt: {
    comboNum: 7,
    dropNum: 3,
    ope: 'more'
  }
})

/**
 * 多色条件を追加したときの初期値
 */
const initMultiColorCond = (): ConditionFactoryOptions => ({
  type: 'MultiColor',
  opt: {
    dropNum: 3,
    includeDrops: ['red'],
    dropColorNum: 1,
    ope: 'more'
  }
})

const DropCondtions = observer(() => {
  const pazStore = store.pazdoraCalStore
  const conditions = pazStore.conditions

  /**
   * Dropカードを作成する
   */
  const createDropCond = () => {
    pazStore.addCondition(initDropCond())
  }

  /**
   * コンボカードを作成する
   */
  const createComboCond = () => {
    pazStore.addCondition(initComboCond())
  }

  /**
   * 多色条件のカードを作成する
   */
  const createMultiCond = () => {
    pazStore.addCondition(initMultiColorCond())
  }

  /**
   * 条件をストアに設定する
   * @param index
   * @param newcondition
   */
  const setCondition = (
    index: number,
    newcondition: ConditionFactoryOptions
  ) => {
    pazStore.setCondition(index, newcondition)
  }

  /**
   * カードを削除する
   * @param index
   */
  const deleteCond = (index: number) => {
    pazStore.deleteCondition(index)
  }

  return (
    <div>
      <div>
        <PazButton
          btnName="ドロップ条件を追加"
          onClick={createDropCond}
        ></PazButton>
        <PazButton
          btnName="コンボ条件を追加"
          onClick={createComboCond}
        ></PazButton>
        <PazButton
          btnName="多色条件を追加"
          onClick={createMultiCond}
        ></PazButton>
      </div>
      {conditions.map((cond, i) => {
        if (cond.type === 'Drop') {
          return (
            <DropCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></DropCard>
          )
        } else if (cond.type === 'Combo') {
          return (
            <ComboCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></ComboCard>
          )
        } else if (cond.type === 'MultiColor') {
          return (
            <MultiColorCard
              key={i}
              condition={cond}
              setCondition={newCond => setCondition(i, newCond)}
              deleteCondition={() => deleteCond(i)}
            ></MultiColorCard>
          )
        }
      })}
    </div>
  )
})

export default DropCondtions
