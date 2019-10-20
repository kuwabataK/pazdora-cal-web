import * as React from 'react'
import PazdoraCalTemplate from '../src/components/template/PazdoraCalTemplate'

const pageStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  width: '100%',
  height: '100%'
}

const PazdoraCal = () => {
  return (
    <div style={pageStyle}>
      <PazdoraCalTemplate></PazdoraCalTemplate>
    </div>
  )
}

export default PazdoraCal
