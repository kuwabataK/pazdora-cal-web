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
import ColorToggle from '../atoms/ColorToggle'

/**
 * 引数に指定したinCludeDropsの数から選択肢に設定できるドロップの種類数を計算する
 * @param includeDrops
 */
const maxDropColorNum = (includeDrops: string[] | undefined) => {
  if (!includeDrops) return 0
  return includeDrops.length
}

export default function MultiColorCard(props: DropCardProps) {
  const classes = useCardStyles()
  const selectClasses = useSelectStyles()

  const { handleDelete, selectOpt, handleOptChange } = generateDropFunc(props)

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.deleteContents}>
          <HighlightOffIcon
            className={classes.deleteButton}
            onClick={handleDelete}
          />
        </div>
        {/* バツボタン */}

        <div className={classes.cardContents}>
          {/* 色を選択するコンポーネント */}
          <ColorToggle
            selectColor={props.condition.opt.includeDrops}
            onSelectColor={includeColors =>
              handleOptChange('includeDrops', includeColors)
            }
          ></ColorToggle>
          <form className={selectClasses.root} autoComplete="off">
            <FormControl className={selectClasses.formControl}>
              <InputLabel>ドロップの種類</InputLabel>
              <Select
                native
                value={props.condition.opt.dropColorNum}
                onChange={selectOpt}
                inputProps={{
                  name: 'dropColorNum',
                  id: 'drop-color-num-simple'
                }}
              >
                {[
                  ...new Array(
                    maxDropColorNum(props.condition.opt.includeDrops)
                  )
                ].map((_val, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}種類以上
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
              <InputLabel>ドロップの個数</InputLabel>
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
