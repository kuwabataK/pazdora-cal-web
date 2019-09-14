import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import PazdoraCalUtil from '../src/utils/pazdora-cal/pazdora-cal'
import { DateTime } from 'luxon'
import store from '../src/store/store'
import { observer } from 'mobx-react'
import Clock from '../src/components/organisms/clock'
import { ConditionFactoryOptions } from '../src/utils/pazdora-cal/Condition'

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
    const res = PazdoraCalUtil.generateFields({ loopCnt })
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
    const res = PazdoraCalUtil.generateFieldStats({ loopCnt })
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

    const cond1: ConditionFactoryOptions = {
      type: 'Drop',
      opt: {
        color: 'red',
        num: 3,
        ope: 'more'
      }
    }

    const cond2: ConditionFactoryOptions = {
      type: 'Drop',
      opt: {
        color: 'blue',
        num: 3,
        ope: 'more'
      }
    }

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

    const cond1: ConditionFactoryOptions = {
      type: 'Drop',
      opt: {
        color: 'red',
        num: 5,
        ope: 'more'
      }
    }

    const cond2: ConditionFactoryOptions = {
      type: 'Drop',
      opt: {
        color: 'blue',
        num: 5,
        ope: 'more'
      }
    }

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

  const calc3 = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return

    const cond1: ConditionFactoryOptions = {
      type: 'Combo',
      opt: {
        num: 8,
        ope: 'more'
      }
    }

    const options = [[cond1]]

    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelCalc(
      { loopCnt },
      options
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

  const calc4 = async () => {
    if (!store.pazdoraCalStore.pazdoraCalController) return

    const cond1: ConditionFactoryOptions = {
      type: 'MultiColor',
      opt: {
        num: 4,
        outOfNum: 5,
        ope: 'more'
      }
    }

    const options = [[cond1]]

    setResult('')
    const startTime = DateTime.local()
    const res = await store.pazdoraCalStore.pazdoraCalController.parallelCalc(
      { loopCnt },
      options
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
        <button onClick={calc3}>8コンボ以上ある確率：マルチスレッド</button>
        <button onClick={calc4}>5色中4色ある確率：マルチスレッド</button>
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
