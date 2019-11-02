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
import ColorToggle from '../../atoms/ColorToggle'
import { generateUUIDs } from '../../../utils/util'

/**
 * 引数に指定したinCludeDropsの数から選択肢に設定できるドロップの種類数を計算する
 * @param includeDrops
 */
const maxDropColorNum = (includeDrops: string[] | undefined) => {
  if (!includeDrops) return 0
  return includeDrops.length
}

// 一意なIDを３つ生成する
const ids = generateUUIDs(['dropColorNum', 'dropNum', 'ope'])

export default function MultiColorCard(props: DropCardProps<'MultiColor'>) {
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
              <InputLabel htmlFor={ids.dropColorNum}>ドロップの種類</InputLabel>
              <Select
                native
                value={props.condition.opt.dropColorNum}
                onChange={e => selectOpt(e, true)}
                inputProps={{
                  name: 'dropColorNum',
                  id: ids.dropColorNum
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
              <InputLabel htmlFor={ids.dropNum}>ドロップの個数</InputLabel>
              <Select
                native
                value={props.condition.opt.dropNum}
                onChange={e => selectOpt(e, true)}
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
              <InputLabel htmlFor={ids.ope}>ドロップの個数</InputLabel>
              <Select
                native
                value={props.condition.opt.ope}
                onChange={e => selectOpt(e)}
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
