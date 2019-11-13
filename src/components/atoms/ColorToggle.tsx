import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { DropColors } from '../../utils/pazdora-cal/Conditions/ConditionTypes'
import { withStyles, makeStyles, createStyles } from '@material-ui/styles'
import { Paper, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap'
    }
  })
)

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup)

type Props = {
  /**
   * 選ばれている色
   */
  selectColor?: (keyof typeof DropColors)[]
  /**
   * 色変更時に発火する処理
   */
  onSelectColor: (colors: (keyof typeof DropColors)[]) => void
}

/**
 * 多色のときの色を選ぶコンポーネント
 * @param props
 */
export const ColorToggle = (props: Props) => {
  const classes = useStyles()
  /**
   * 色を選択したときに発火する処理
   * @param _event
   * @param newColors
   */
  const handleColor = (
    _event: React.MouseEvent<HTMLElement>,
    newColors: (keyof typeof DropColors)[]
  ) => {
    props.onSelectColor(newColors)
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
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup size="small" value={props.selectColor} onChange={handleColor}>
          {children}
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  )
}
