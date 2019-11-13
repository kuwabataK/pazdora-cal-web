import * as React from 'react'
import Link from 'next/link'
import Layout from '../src/components/template/Layout'
import { NextPage } from 'next'

const DebugPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <p>
        <Link href="/pazdora-cal">
          <a>パズドラ盤面欠損率計算機</a>
        </Link>
      </p>
      <p>
        <Link href="/pazdora-cal2">
          <a>パズドラ盤面欠損率計算機テスト</a>
        </Link>
      </p>
      <p>
        <Link href="/">
          <a>TOPへ戻る</a>
        </Link>
      </p>
    </Layout>
  )
}

export default DebugPage
