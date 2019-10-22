import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {
  DropCardProps,
  generateDropFunc,
  useCardStyles,
  useSelectStyles
} from './DropCardBase'
import { generateUUIDs } from '../../../utils/util'

const ids = generateUUIDs(['dropNum', 'comboNum', 'ope'])

export default function ComboCard(props: DropCardProps) {
  const classes = useCardStyles()
  const selectClasses = useSelectStyles()

  const { handleDelete, selectOpt } = generateDropFunc(props)

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.deleteContents}>
          <HighlightOffIcon
            className={classes.deleteButton}
            onClick={handleDelete}
          />
        </div>
        <div className={classes.cardContents}>
          <form className={selectClasses.root} autoComplete="off">
            <FormControl className={selectClasses.formControl}>
              <InputLabel htmlFor={ids.dropNum}>消せるドロップ数</InputLabel>
              <Select
                native
                value={props.condition.opt.dropNum}
                onChange={selectOpt}
                inputProps={{
                  name: 'dropNum',
                  id: ids.dropNum
                }}
              >
                {[...new Array(31)].map((_val, i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={selectClasses.formControl}>
              <InputLabel htmlFor={ids.comboNum}>コンボ数</InputLabel>
              <Select
                native
                value={props.condition.opt.comboNum}
                onChange={selectOpt}
                inputProps={{
                  name: 'comboNum',
                  id: ids.comboNum
                }}
              >
                {[...new Array(14)].map((_val, i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={selectClasses.formControl}>
              <InputLabel htmlFor={ids.ope}>条件</InputLabel>
              <Select
                native
                value={props.condition.opt.ope}
                onChange={selectOpt}
                inputProps={{
                  name: 'ope',
                  id: ids.ope
                }}
              >
                <option key="more" value="more">
                  以上
                </option>
                <option key="less" value="less">
                  以下
                </option>
              </Select>
            </FormControl>
          </form>
        </div>
      </CardContent>
      <CardActions>{/* フッターをここにかける */}</CardActions>
    </Card>
  )
}
