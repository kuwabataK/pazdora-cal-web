import Layout from '../src/components/template/Layout'
import Link from 'next/link'
import * as React from 'react'
import { generateFields } from '../src/utils/pazdora-cal'

const PazdoraCal: React.FC = () => {
  const calcTest = () => {
    const res = generateFields({ loopCnt: 100 })
    console.log(res)
  }

  return (
    <Layout title="パズドラ確率計算機 | Next.js + TypeScript Example">
      <h1>パズドラ確率計算機</h1>
      <button onClick={calcTest}></button>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default PazdoraCal
