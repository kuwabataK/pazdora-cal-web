import store from '../../store/store'
import * as React from 'react'
import { observer } from 'mobx-react-lite'

const Clock: React.FC = observer(() => {
  const stop = () => {
    store.clockStore.stopAutoUpdate()
  }
  const start = () => {
    store.clockStore.startAutoUpdate()
  }

  return (
    <div>
      現在時刻: {store.clockStore.time}
      <p>
        <button onClick={stop}>時刻の更新を停止</button>
        <button onClick={start}>時刻の更新を再開</button>
      </p>
    </div>
  )
})

export default Clock
