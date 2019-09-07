import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import { generateFields } from '../src/utils/pazdora-cal'
import { DateTime } from 'luxon'
import store from '../src/store/store'
import { observer } from 'mobx-react'
import Clock from '../src/components/organisms/clock'

const PazdoraCal: React.FC = observer(() => {
  const [threadNum, setThreadNum] = React.useState(4)
  const [loopCnt, setLoopCnt] = React.useState(100000)
  const [result, setResult] = React.useState('')

  React.useEffect(() => {
    store.pazdoraCalStore.createThread(threadNum)
    return () => store.pazdoraCalStore.dispose()
  }, [threadNum])

  const calcSingle = () => {
    setResult('')
    const startTime = DateTime.local()
    const res = generateFields({ loopCnt })
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
    console.log(res[0])
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 生成した盤面数: ' +
        res.length
    )
  }

  const calcMultiTheads = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return
    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.asyncGenerateFields(
      {
        loopCnt
      }
    )
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
    console.log(res[0])
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 生成した盤面数: ' +
        res.length
    )
  }

  const calcStatsMultiThreads = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return
    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.asyncGenerateFieldStats(
      {
        loopCnt
      }
    )
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
    console.log(res[0])
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 生成した盤面数: ' +
        res.length
    )
  }

  const handleThreadNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value)
    if (0 <= num && num <= 32) {
      setThreadNum(num)
    }
  }

  const handleLoopCntChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value)
    if (0 <= num && num <= 5000000) {
      setLoopCnt(num)
    }
  }

  return (
    <Layout title="パズドラ確率計算機 | Next.js + TypeScript Example">
      <h1>パズドラ確率計算機</h1>
      <p>
        <Clock></Clock>
      </p>
      <p>
        スレッド数:{' '}
        <input
          type="number"
          value={threadNum}
          onChange={handleThreadNumChange}
        ></input>
      </p>
      <p>
        生成する盤面の数:{' '}
        <input
          type="number"
          value={loopCnt}
          onChange={handleLoopCntChange}
        ></input>
      </p>
      <button onClick={calcSingle}>メインスレッドで盤面を作成</button>
      <button onClick={calcMultiTheads}>マルチスレッドで盤面を作成</button>
      <button onClick={calcStatsMultiThreads}>
        マルチスレッドで盤面の各色の個数を計算
      </button>
      <p>結果: {result}</p>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
})

export default PazdoraCal
