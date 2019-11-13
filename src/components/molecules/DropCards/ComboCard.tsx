import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { FormControl, InputLabel, Select, Checkbox } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { DropCardProps, generateDropFunc, useCardStyles, useSelectStyles } from './DropCardBase'
import { generateUUIDs } from '../../../utils/util'
import { DropColors } from '../../../utils/pazdora-cal/Conditions/ConditionTypes'
import { colorLang } from '../../../filter/lang-filters'

const ids = generateUUIDs(['dropNum', 'comboNum', 'ope', 'chainColor', 'chainNum'])

export function ComboCard(props: DropCardProps<'Combo'>) {
  const classes = useCardStyles()
  const selectClasses = useSelectStyles()

  const {
    dropNum,
    chainDropColor,
    chainDropNum,
    comboNum,
    ope,
    isCheckedChainDrop
  } = props.condition.opt

  const { handleDelete, selectOpt, handleOptChange } = generateDropFunc(props)

  // 繋げるドロップを設定するかどうかを選択するチェックボックスのハンドラー
  const changeIsChainDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleOptChange('isCheckedChainDrop', event.target.checked)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.deleteContents}>
          <HighlightOffIcon className={classes.deleteButton} onClick={handleDelete} />
        </div>
        <div className={classes.cardContents}>
          <form className={selectClasses.root} autoComplete="off">
            <FormControl className={selectClasses.formControl}>
              <InputLabel htmlFor={ids.dropNum}>消せるドロップ数</InputLabel>
              <Select
                native
                value={dropNum}
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
              <InputLabel htmlFor={ids.comboNum}>コンボ数</InputLabel>
              <Select
                native
                value={comboNum}
                onChange={e => selectOpt(e, true)}
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
                value={ope}
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
          <form className={selectClasses.root} autoComplete="off">
            <FormControl className={selectClasses.formControl} disabled={!isCheckedChainDrop}>
              <InputLabel htmlFor={ids.chainColor}>繋げるドロップ</InputLabel>
              <Select
                native
                value={chainDropColor}
                onChange={e => selectOpt(e)}
                inputProps={{
                  name: 'chainDropColor',
                  id: ids.chainColor
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
            <FormControl className={selectClasses.formControl} disabled={!isCheckedChainDrop}>
              <InputLabel htmlFor={ids.chainNum}>繋げるドロップ</InputLabel>
              <Select
                native
                value={chainDropNum}
                onChange={e => selectOpt(e, true)}
                inputProps={{
                  name: 'chainDropNum',
                  id: ids.chainNum
                }}
              >
                {[...new Array(31)].map((_val, i) => {
                  return (
                    <option key={i} value={i + (dropNum || 0)}>
                      {i + (dropNum || 0)}個
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <Checkbox
              checked={isCheckedChainDrop}
              onChange={event => changeIsChainDrop(event)}
              value="isCheckedChainDrop"
              inputProps={{
                'aria-label': 'primary checkbox'
              }}
            />
          </form>
        </div>
      </CardContent>
      <CardActions>{/* フッターをここにかける */}</CardActions>
    </Card>
  )
}
