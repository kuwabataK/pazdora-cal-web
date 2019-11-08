import * as React from 'react'
import store from '../../store/store'
import { observer } from 'mobx-react'
import { Grid } from '@material-ui/core'
import { DropCondtions } from '../organisms/DropConditions'
import { PazResultCards } from '../molecules/PazResultCards'

const background: React.CSSProperties = {
  backgroundColor: '#f5f5f5'
}

const PazdoraCalTemplate = observer(() => {
  const pazStore = store.pazdoraCalStore

  /**
   * ページ遷移時にスレッドを作成しておく
   */
  React.useEffect(() => {
    // スレッド数を多くしすぎると、低スペック端末での動きが悪くなるので、4スレッドにしておく
    pazStore.pazCalControllStore.createThread(4)
    return () => pazStore.pazCalControllStore.dispose()
  }, [])

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
