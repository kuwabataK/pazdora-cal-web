import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Theme,
  createStyles,
  Grid
} from '@material-ui/core'
import PazButton from '../atoms/PazButton'
import { PazdoraCalStore } from '../../store/PazdoraCalStore'
import { useBanmen } from '../../custom-hook/pazhooks'
import { observer } from 'mobx-react'

/**
 * カードのスタイル
 */
export const useCardStyles = makeStyles({
  card: {
    minWidth: 250,
    width: 500,
    maxWidth: 500
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
    justifyContent: 'flex-center'
  },
  deleteContents: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    marginRight: 0
  }
})
/**
 * 上下左右に幅を持たせるスタイル
 */
const marginStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '10px',
  marginLeft: '10px',
  marginRight: '10px'
}
/**
 * セレクトボックスのスタイル
 */
const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'nowrap'
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
  pazStore: PazdoraCalStore
}

const PazResultCards = observer((props: Props) => {
  const pazStore = props.pazStore
  const classes = useCardStyles()
  const selectClasses = useSelectStyles()

  const { banmen, setBanmen } = useBanmen(pazStore)

  const parseRate = (percent: number) => {
    return Math.round(percent * 100) / 100
  }

  return (
    <Grid container alignItems="center" justify="center">
      <Card className={classes.card} style={marginStyle}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <h3>条件を満たす確率</h3>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '45px' }}>
              {parseRate(pazStore.rate)}%
            </span>
          </div>
          <div style={marginStyle}>
            <form className={selectClasses.root} autoComplete="off">
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <FormControl className={selectClasses.formControl}>
                    <InputLabel>盤面</InputLabel>
                    <Select
                      native
                      value={banmen}
                      onChange={event =>
                        setBanmen(event.target.value as '56盤面' | '76盤面')
                      }
                      inputProps={{
                        name: 'banmen',
                        id: 'drop-color-simple'
                      }}
                    >
                      <option value="56盤面">56盤面</option>
                      <option value="76盤面">76盤面</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <PazButton
                    btnName="計算を実行"
                    onClick={() =>
                      props.pazStore.calcParallelInStoreCondition()
                    }
                  ></PazButton>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
        <CardActions>{/* フッターをここにかける */}</CardActions>
      </Card>
    </Grid>
  )
})

export default PazResultCards
