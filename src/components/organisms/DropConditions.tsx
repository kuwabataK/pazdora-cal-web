import React from 'react'
import {
  ConditionFactoryOptions,
  ConditionClasses
} from '../../utils/pazdora-cal/Condition'
import store from '../../store/store'
import DropCard from '../molecules/DropCards/DropCard'
import ComboCard from '../molecules/DropCards/ComboCard'
import MultiColorCard from '../molecules/DropCards/MultiColorCard'
import { observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import AddButton from '../atoms/AddButton'

/**
 * ドロップ条件を追加したときの初期値
 */
const initDropCond = (): ConditionFactoryOptions<'Drop'> => ({
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
const initComboCond = (): ConditionFactoryOptions<'Combo'> => ({
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
const initMultiColorCond = (): ConditionFactoryOptions<'MultiColor'> => ({
  type: 'MultiColor',
  opt: {
    dropNum: 3,
    includeDrops: ['red'],
    dropColorNum: 1,
    ope: 'more'
  }
})

/**
 * 条件カードと条件追加ボタンを表示するコンポーネント
 */
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
    newcondition: ConditionFactoryOptions<keyof ConditionClasses>
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
    <Grid container alignItems="center" justify="center">
      <Grid container alignItems="center" justify="center">
        <AddButton btnName="ドロップ" onClick={createDropCond}></AddButton>
        <AddButton btnName="コンボ" onClick={createComboCond}></AddButton>
        <AddButton btnName="多色" onClick={createMultiCond}></AddButton>
      </Grid>
      <Grid container alignItems="center" justify="center">
        {conditions.map((cond, i) => {
          cond = cond as ConditionFactoryOptions<keyof ConditionClasses>
          if (cond.type === 'Drop') {
            return (
              <Grid key={i} container alignItems="center" justify="center">
                <DropCard
                  condition={cond as ConditionFactoryOptions<'Drop'>}
                  setCondition={newCond => setCondition(i, newCond)}
                  deleteCondition={() => deleteCond(i)}
                />
              </Grid>
            )
          } else if (cond.type === 'Combo') {
            return (
              <Grid key={i} container alignItems="center" justify="center">
                <ComboCard
                  condition={cond as ConditionFactoryOptions<'Combo'>}
                  setCondition={newCond => setCondition(i, newCond)}
                  deleteCondition={() => deleteCond(i)}
                />
              </Grid>
            )
          } else if (cond.type === 'MultiColor') {
            return (
              <Grid key={i} container alignItems="center" justify="center">
                <MultiColorCard
                  condition={cond as ConditionFactoryOptions<'MultiColor'>}
                  setCondition={newCond => setCondition(i, newCond)}
                  deleteCondition={() => deleteCond(i)}
                />
              </Grid>
            )
          }
        })}
      </Grid>
    </Grid>
  )
})

export default DropCondtions
