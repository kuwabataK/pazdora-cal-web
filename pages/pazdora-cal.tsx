import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import { generateFields } from '../src/utils/pazdora-cal'
import { DateTime } from 'luxon'
import AsyncPazdoraCal from '../src/utils/async-pazdora-cal'

const PazdoraCal: React.FC = () => {
  let asyncPazdoraCal: AsyncPazdoraCal
  React.useEffect(() => {
    asyncPazdoraCal = new AsyncPazdoraCal(16)
    return () => asyncPazdoraCal.dispose()
  }, [])

  const calcSingle = () => {
    const startTime = DateTime.local()
    const res = generateFields({ loopCnt: 5000000 })
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
    console.log(res[0])
  }

  const calcMultiTheads = async () => {
    // if (!asyncPazdoraCal) return
    const startTime = DateTime.local()
    const res = await asyncPazdoraCal.asyncGenerateFields({ loopCnt: 5000000 })
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
    console.log(res[0])
  }

  return (
    <Layout title="パズドラ確率計算機 | Next.js + TypeScript Example">
      <h1>パズドラ確率計算機</h1>
      <button onClick={calcSingle}>シングルスレッドで盤面を作成</button>
      <button onClick={calcMultiTheads}>マルチスレッドで盤面を作成</button>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default PazdoraCal
