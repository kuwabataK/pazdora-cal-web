import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {
  FormControl,
  InputLabel,
  Select,
  Theme,
  createStyles
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { DropCardProps, generateDropFunc } from './DropCardBase'

/**
 * カードのスタイル
 */
const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 450
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardContents: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    marginRight: 0
  }
})

/**
 * セレクトボックスのスタイル
 */
const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

export default function ComboCard(props: DropCardProps) {
  const classes = useStyles()
  const selectClasses = useSelectStyles()

  const { handleDelete, handleOptChange } = generateDropFunc(props)

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContents}>
        <HighlightOffIcon
          className={classes.deleteButton}
          onClick={handleDelete}
        />
        <form className={selectClasses.root} autoComplete="off">
          <FormControl className={selectClasses.formControl}>
            <InputLabel>消せるドロップ数</InputLabel>
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
            <InputLabel>コンボ数</InputLabel>
            <Select
              native
              value={props.condition.opt.comboNum}
              onChange={handleOptChange}
              inputProps={{
                name: 'comboNum',
                id: 'drop-color-simple'
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
            <InputLabel>条件</InputLabel>
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
      </CardContent>
      <CardActions>{/* フッターをここにかける */}</CardActions>
    </Card>
  )
}
