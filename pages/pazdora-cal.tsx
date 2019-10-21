import * as React from 'react'
import PazdoraCalTemplate from '../src/components/template/PazdoraCalTemplate'
import Head from 'next/head'

const pageStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  width: '100%',
  height: '100%'
}

const PazdoraCal = () => {
  return (
    <div style={pageStyle}>
      <Head>
        <title>パズドラ盤面欠損率計算機</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PazdoraCalTemplate></PazdoraCalTemplate>
    </div>
  )
}

export default PazdoraCal
