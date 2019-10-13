import { PazdoraCalStore } from '../store/PazdoraCalStore'
import * as React from 'react'

type ReturnUseBanmen = {
  banmen: '56盤面' | '76盤面'
  setBanmen: (banmen: '56盤面' | '76盤面') => void
}

/**
 * 盤面を利用する
 * @param pazStore
 */
export function useBanmen(pazStore: PazdoraCalStore): ReturnUseBanmen {
  const [banmen, setBanmen] = React.useState('56盤面')
  React.useEffect(() => {
    if (banmen === '56盤面') {
      pazStore.setOption({
        ...pazStore.option,
        width: 5,
        height: 6
      })
    }
    if (banmen === '76盤面') {
      pazStore.setOption({
        ...pazStore.option,
        width: 7,
        height: 6
      })
    }
  }, [banmen])
  return { banmen: banmen as '56盤面' | '76盤面', setBanmen }
}
