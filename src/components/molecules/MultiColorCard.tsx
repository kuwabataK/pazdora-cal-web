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
import SectionToggle from '../atoms/SectionToggle'

export default function MultiColorCard(props: DropCardProps) {
  const classes = useCardStyles()
  const selectClasses = useSelectStyles()

  const { handleDelete, handleOptChange } = generateDropFunc(props)

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContents}>
        {/* バツボタン */}
        <HighlightOffIcon
          className={classes.deleteButton}
          onClick={handleDelete}
        />
        <div>
          <SectionToggle
            selectColor={props.condition.opt.includeDrops}
            setSelectColor={includeColors =>
              props.setCondition({
                ...props.condition,
                opt: {
                  ...props.condition.opt,
                  includeDrops: includeColors
                }
              })
            }
          ></SectionToggle>
          <form className={selectClasses.root} autoComplete="off">
            <FormControl className={selectClasses.formControl}>
              <InputLabel>ドロップの種類の最低数</InputLabel>
              <Select
                native
                value={props.condition.opt.dropColorNum}
                onChange={handleOptChange}
                inputProps={{
                  name: 'dropColorNum',
                  id: 'drop-color-num-simple'
                }}
              >
                {[...new Array(6)].map((_val, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl className={selectClasses.formControl}>
              <InputLabel>ドロップの個数</InputLabel>
              <Select
                native
                value={props.condition.opt.dropNum}
                onChange={handleOptChange}
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
              <InputLabel>ドロップの個数条件</InputLabel>
              <Select
                native
                value={props.condition.opt.ope}
                onChange={handleOptChange}
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
