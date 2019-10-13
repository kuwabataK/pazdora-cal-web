import * as React from 'react'
import DropCard from '../molecules/DropCard'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import PazButton from '../atoms/PazButton'
import store from '../../store/store'
import { observer } from 'mobx-react'

const PazdoraCalTemplate = observer(() => {
  const initDropCond = (): ConditionFactoryOptions => ({
    type: 'Drop',
    opt: {
      color: 'red',
      dropNum: 3,
      ope: 'more'
    }
  })

  const pazStore = store.pazdoraCalStore
  const conditions = pazStore.conditions

  const setCondition = (
    index: number,
    newcondition: ConditionFactoryOptions
  ) => {
    pazStore.setCondition(index, newcondition)
  }

  const createDropCond = () => {
    pazStore.addCondition(initDropCond())
  }

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
        <PazButton btnName="コンボ条件を追加"></PazButton>
        <PazButton btnName="多色条件を追加"></PazButton>
      </div>
      {conditions.map((cond, i) => {
        return (
          <DropCard
            key={i}
            condition={cond}
            setCondition={newCond => setCondition(i, newCond)}
            deleteCondition={() => deleteCond(i)}
          ></DropCard>
        )
      })}
    </div>
  )
})
export default PazdoraCalTemplate
