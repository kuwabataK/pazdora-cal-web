import store from '../../store/store'
import * as React from 'react'
import { observer } from 'mobx-react-lite'

const Clock: React.FC = observer(() => {
  const disable = () => {
    store.clockStore.disableAutoUpdate()
  }
  const enable = () => {
    store.clockStore.enableAutoUpdate()
  }

  React.useEffect(() => {
    enable()
    return disable
  }, [])

  return (
    <div>
      現在時刻: {store.clockStore.time}
      <p>
        <button onClick={disable}>時刻の更新を停止</button>
        <button onClick={enable}>時刻の更新を再開</button>
      </p>
    </div>
  )
})

export default Clock
