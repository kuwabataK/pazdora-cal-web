import { DropColor } from '../utils/pazdora-cal/Condition'

export function colorLang(color: DropColor) {
  switch (color) {
    case 'red':
      return '火'
    case 'black':
      return '闇'
    case 'blue':
      return '水'
    case 'green':
      return '木'
    case 'heart':
      return '回復'
    case 'white':
      return '光'
  }
}
