import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
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
export default function AddButton(props: Props) {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={props.onClick}
      size="small"
    >
      <AddIcon></AddIcon>
      {props.btnName}
    </Button>
  )
}
