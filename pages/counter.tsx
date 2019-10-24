import * as React from 'react'
import Link from 'next/link'
import Layout from '../src/components/template/Layout'
import { observer, inject } from 'mobx-react'
import { usePrevious } from '../src/utils/react-hooks'
import store from '../src/store/store'

type Props = {
  store: typeof store
}

const CounterPage: React.FC<Props> = inject('store')(
  observer(props => {
    const preCnt = usePrevious(props.store.counterStore.objectCounter, {
      deepCopy: true
    })
    // const preCnt = usePrevious(store.counterStore.objectCounter)
    console.log(preCnt && preCnt.counter)
    console.log(preCnt && preCnt.deepcnt.counter)

    const increment: () => void = () => {
      props.store.counterStore.incrementObj()
    }

    const decrement: () => void = () => {
      props.store.counterStore.decrementObj()
    }

    const incrementDeep: () => void = () => {
      props.store.counterStore.incrementDeep()
    }

    const decrementDeep: () => void = () => {
      props.store.counterStore.decrementDeep()
    }

    return (
      <Layout title="カウンターページ | Next.js + TypeScript Example">
        <h1>カウンターページ</h1>
        <p>mobxを使ったカウンターページのサンプルです</p>
        <p>{props.store.counterStore.objectCounter.counter}</p>
        <p>deep: {props.store.counterStore.objectCounter.deepcnt.counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementDeep}>deep+</button>
        <button onClick={decrementDeep}>deep-</button>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </Layout>
    )
  })
)
export default CounterPage
