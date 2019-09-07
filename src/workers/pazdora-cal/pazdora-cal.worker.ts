import { generateFields, generateFieldStats } from '../../utils/pazdora-cal'

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any

ctx.onmessage = event => {
  console.log('worker側だよ！！ 受け取った値は', event.data.arg)
  let res

  switch ((event.data as PostMessageData).type) {
    case 'generateFields':
      res = generateFields(event.data.arg)
      break
    case 'generateFieldStats':
      res = generateFieldStats(event.data.arg)
      break
    default:
      break
  }
  ctx.postMessage(res) // 呼び出し元にEventを発火して結果を返す
}

export default ctx

export type PostMessageData = {
  arg: any
  type: 'generateFields' | 'generateFieldStats'
}