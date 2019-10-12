import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { ConditionFactoryOptions } from '../../utils/pazdora-cal/Condition'
import {
  FormControl,
  InputLabel,
  Select,
  Theme,
  createStyles
} from '@material-ui/core'
import { DropColors } from '../../utils/pazdora-cal/ConditionTypes'
import { colorLang } from '../../filter/lang-filters'

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
  }
})

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

type Props = {
  condition: ConditionFactoryOptions
  setCondition: (newCondition: ConditionFactoryOptions) => void
}

export default function SimpleCard(props: Props) {
  const classes = useStyles()
  const selectClasses = useSelectStyles()

  /**
   * 指定した名前の変更する条件を変更する
   * @param event セレクトボックスが変更された時に発火するイベント
   */
  const handleOptChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    props.setCondition({
      ...props.condition,
      opt: {
        ...props.condition.opt,
        [event.target.name as string]: event.target.value
      }
    })
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <form className={selectClasses.root} autoComplete="off">
          <FormControl className={selectClasses.formControl}>
            <InputLabel>ドロップの色</InputLabel>
            <Select
              native
              value={props.condition.opt.color}
              onChange={handleOptChange}
              inputProps={{
                name: 'color',
                id: 'drop-num-simple'
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
              {[...new Array(30)].map((_val, i) => {
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
