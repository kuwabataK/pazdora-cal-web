import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { DropColors } from '../../utils/pazdora-cal/ConditionTypes'

type Props = {
  selectColor?: (keyof typeof DropColors)[]
  setSelectColor: (colors: (keyof typeof DropColors)[]) => void
}

const SectionToggle = (props: Props) => {
  const handleColor = (
    _event: React.MouseEvent<HTMLElement>,
    newColors: (keyof typeof DropColors)[]
  ) => {
    props.setSelectColor(newColors)
  }

  const children = [
    <ToggleButton key={1} value={DropColors.red}>
      火
    </ToggleButton>,
    <ToggleButton key={2} value={DropColors.blue}>
      水
    </ToggleButton>,
    <ToggleButton key={3} value={DropColors.green}>
      木
    </ToggleButton>,
    <ToggleButton key={4} value={DropColors.white}>
      光
    </ToggleButton>,
    <ToggleButton key={5} value={DropColors.black}>
      闇
    </ToggleButton>,
    <ToggleButton key={6} value={DropColors.heart}>
      回復
    </ToggleButton>
  ]
  return (
    <div>
      <ToggleButtonGroup
        size="small"
        value={props.selectColor}
        onChange={handleColor}
      >
        {children}
      </ToggleButtonGroup>
    </div>
  )
}

export default SectionToggle
