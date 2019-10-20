import * as React from 'react'
import PazButton from '../atoms/PazButton'
import store from '../../store/store'
import { observer } from 'mobx-react'
import {
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  createStyles,
  Theme,
  Grid
} from '@material-ui/core'
import { useBanmen } from '../../custom-hook/pazhooks'
import DropCondtions from '../organisms/DropConditions'

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

/**
 * 上下左右にに幅を持たせるスタイル
 */
const marginStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '10px',
  marginLeft: '10px',
  marginRight: '10px'
}

const PazdoraCalTemplate = observer(() => {
  /**
   * ページ遷移時にスレッドを作成しておく
   */
  React.useEffect(() => {
    store.pazdoraCalStore.pazCalControllStore.createThread(8)
    return () => store.pazdoraCalStore.pazCalControllStore.dispose()
  }, [])

  const selectClasses = useSelectStyles()

  const pazStore = store.pazdoraCalStore

  const { banmen, setBanmen } = useBanmen(pazStore)

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} sm={6}>
        <div style={marginStyle}>
          <h3>　条件を満たす確率: {pazStore.rate}%</h3>
        </div>
        <div style={marginStyle}>
          <form className={selectClasses.root} autoComplete="off">
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
            <PazButton
              btnName="計算を実行"
              onClick={() => pazStore.calcParallelInStoreCondition()}
            ></PazButton>
          </form>
        </div>
      </Grid>
      <DropCondtions></DropCondtions>
    </Grid>
  )
})
export default PazdoraCalTemplate
