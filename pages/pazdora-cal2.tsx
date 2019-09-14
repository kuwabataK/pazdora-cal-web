import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import {
  generateFields,
  generateFieldStats
} from '../src/utils/pazdora-cal/pazdora-cal'
import { DateTime } from 'luxon'
import store from '../src/store/store'
import { observer } from 'mobx-react'
import Clock from '../src/components/organisms/clock'
import { Condition } from '../src/utils/pazdora-cal/Condition'

const PazdoraCal2: React.FC = observer(() => {
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
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 生成した盤面数: ' +
        res.length
    )
  }

  const calcSingleStats = () => {
    setResult('')
    const startTime = DateTime.local()
    const res = generateFieldStats({ loopCnt })
    const endTime = DateTime.local()
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
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelGenerateFields(
      {
        loopCnt
      }
    )
    const endTime = DateTime.local()
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
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelGenerateFieldStats(
      {
        loopCnt
      }
    )
    const endTime = DateTime.local()
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 生成した盤面数: ' +
        res.length
    )
  }

  const calc = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return

    const cond1 = new Condition()
    cond1.color = 'red'
    cond1.num = 3
    cond1.ope = 'more'
    cond1.type = 'dropNum'

    const cond2 = new Condition()
    cond2.color = 'blue'
    cond2.num = 3
    cond2.ope = 'more'
    cond2.type = 'dropNum'

    const conditions = [[cond1, cond2]]

    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelCalc(
      {
        loopCnt
      },
      conditions
    )
    const endTime = DateTime.local()
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 結果: ' +
        res.rate +
        '%'
    )
  }

  const calc2 = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return

    const cond1 = new Condition()
    cond1.color = 'red'
    cond1.num = 5
    cond1.ope = 'more'
    cond1.type = 'dropNum'

    const cond2 = new Condition()
    cond2.color = 'blue'
    cond2.num = 5
    cond2.ope = 'more'
    cond2.type = 'dropNum'

    const conditions = [[cond1], [cond2]]

    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelCalc(
      {
        loopCnt
      },
      conditions
    )
    const endTime = DateTime.local()
    setResult(
      '終わったよ。経過時間は: ' +
        endTime.diff(startTime, 'milliseconds').milliseconds +
        'ms 結果: ' +
        res.rate +
        '%'
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
      <Clock></Clock>
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

      <p>
        盤面を作成:　
        <button onClick={calcSingle}>メインスレッド</button>
        <button onClick={calcMultiTheads}>マルチスレッド</button>
      </p>

      <p>
        盤面を作成して各色の数を計算:　
        <button onClick={calcSingleStats}>メインスレッド</button>
        <button onClick={calcStatsMultiThreads}>マルチスレッド</button>
      </p>

      <p>
        欠損率を計算:　
        <button onClick={calc}>指定2色が存在する確率：マルチスレッド</button>
        <button onClick={calc2}>
          2色いずれか5個以上ある確率：マルチスレッド
        </button>
      </p>

      <p>結果: {result}</p>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
})

export default PazdoraCal2
