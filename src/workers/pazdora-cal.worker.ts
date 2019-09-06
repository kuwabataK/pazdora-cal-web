import { generateFields } from '../utils/pazdora-cal'

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any

ctx.addEventListener('message', async event => {
  console.log('worker側だよ！！ 受け取った値は', event.data)
  const res = generateFields(event.data)
  ctx.postMessage(res) // 呼び出し元にEventを発火して結果を返す
})

export default ctx
