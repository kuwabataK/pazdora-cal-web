import * as React from 'react'
import store from '../../store/store'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'
import DropCondtions from '../organisms/DropConditions'
import PazResultCards from '../molecules/PazResultCards'

const background: React.CSSProperties = {
  backgroundColor: '#f5f5f5'
}

const PazdoraCalTemplate = observer(() => {
  /**
   * ページ遷移時にスレッドを作成しておく
   */
  React.useEffect(() => {
    store.pazdoraCalStore.pazCalControllStore.createThread(8)
    return () => store.pazdoraCalStore.pazCalControllStore.dispose()
  }, [])

  const pazStore = store.pazdoraCalStore

  return (
    <Grid container alignItems="center" justify="center" style={background}>
      <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
        <PazResultCards pazStore={pazStore} />
        <DropCondtions></DropCondtions>
      </Grid>
    </Grid>
  )
})
export default PazdoraCalTemplate
