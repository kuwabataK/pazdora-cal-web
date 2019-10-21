import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { DropColors } from '../../../utils/pazdora-cal/ConditionTypes'
import { colorLang } from '../../../filter/lang-filters'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {
  DropCardProps,
  generateDropFunc,
  useSelectStyles,
  useCardStyles
} from './DropCardBase'

export default function DropCard(props: DropCardProps) {
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
              <InputLabel htmlFor={'drop-color-simple'}>
                ドロップの色
              </InputLabel>
              <Select
                native
                value={props.condition.opt.color}
                onChange={selectOpt}
                inputProps={{
                  name: 'color',
                  id: 'drop-color-simple'
                }}
              >
                {Object.values(DropColors).map(val => {
                  return (
                    <option key={val} value={val}>
                      {colorLang(val)}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={selectClasses.formControl}>
              <InputLabel htmlFor={'drop-num-simple'}>
                ドロップの個数
              </InputLabel>
              <Select
                native
                value={props.condition.opt.dropNum}
                onChange={selectOpt}
                inputProps={{
                  name: 'dropNum',
                  id: 'drop-num-simple'
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
              <InputLabel htmlFor={'drop-ope-simple'}>条件</InputLabel>
              <Select
                native
                value={props.condition.opt.ope}
                onChange={selectOpt}
                inputProps={{
                  name: 'ope',
                  id: 'drop-ope-simple'
                }}
              >
                <option key="more" value="more">
                  より多い
                </option>
                <option key="less" value="less">
                  より少ない
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
