import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import { generateFields } from '../src/utils/pazdora-cal'
import { DateTime } from 'luxon'

const PazdoraCal: React.FC = () => {
  const calcTestSingle = () => {
    const startTime = DateTime.local()
    const res = generateFields({ loopCnt: 1000000 })
    const endTime = DateTime.local()
    console.log(endTime.diff(startTime, 'milliseconds').milliseconds)
    console.log(res.length)
  }

  return (
    <Layout title="パズドラ確率計算機 | Next.js + TypeScript Example">
      <h1>パズドラ確率計算機</h1>
      <button onClick={calcTestSingle}>盤面を作成</button>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default PazdoraCal
