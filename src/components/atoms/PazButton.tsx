import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: 'none'
    }
  })
)

type Props = {
  btnName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void
}

/**
 * 実行ボタンなどを表すスタイルコンポーネント
 * @param props
 */
export default function pazButton(props: Props) {
  const classes = useStyles()

  return (
    <Button variant="contained" color="primary" className={classes.button} onClick={props.onClick}>
      {props.btnName}
    </Button>
  )
}
