import * as React from 'react'
import TestCard from '../molecules/TestCard'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'

const PazdoraCalTemplate = () => {
  const initCond: ConditionFactoryOptions = {
    type: 'Drop',
    opt: {
      color: 'blue',
      dropNum: 5,
      ope: 'more'
    }
  }
  const [condition, setCondition] = React.useState(initCond)
  return (
    <div>
      <TestCard condition={condition} setCondition={setCondition}></TestCard>
    </div>
  )
}
export default PazdoraCalTemplate
