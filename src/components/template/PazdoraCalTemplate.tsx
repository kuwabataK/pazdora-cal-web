import * as React from 'react'
import DropCard from '../molecules/DropCard'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'

const PazdoraCalTemplate = () => {
  const initCond: ConditionFactoryOptions = {
    type: 'Drop',
    opt: {
      color: 'red',
      dropNum: 3,
      ope: 'more'
    }
  }
  const [condition, setCondition] = React.useState(initCond)
  return (
    <div>
      <DropCard condition={condition} setCondition={setCondition}></DropCard>
    </div>
  )
}
export default PazdoraCalTemplate
