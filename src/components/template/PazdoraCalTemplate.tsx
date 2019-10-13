import * as React from 'react'
import DropCard from '../molecules/DropCard'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import PazButton from '../atoms/PazButton'

const PazdoraCalTemplate = () => {
  const initDropCond: ConditionFactoryOptions = {
    type: 'Drop',
    opt: {
      color: 'red',
      dropNum: 3,
      ope: 'more'
    }
  }
  const [condition, setCondition] = React.useState(initDropCond)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const test = (event: any) => {
    console.log(event)
  }

  return (
    <div>
      <div>
        <PazButton btnName="ドロップ条件を追加" onClick={test}></PazButton>
        <PazButton btnName="コンボ条件を追加"></PazButton>
        <PazButton btnName="多色条件を追加"></PazButton>
      </div>
      <DropCard condition={condition} setCondition={setCondition}></DropCard>
    </div>
  )
}
export default PazdoraCalTemplate
