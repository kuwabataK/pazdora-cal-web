import { generateFields, generateFieldStats } from '../utils/pazdora-cal'

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any

ctx.addEventListener('message', async event => {
  if (event.data.type !== 'generateFields') return
  console.log('worker側だよ！！ 受け取った値は', event.data.arg)
  const res = generateFields(event.data.arg)
  ctx.postMessage(res) // 呼び出し元にEventを発火して結果を返す
})

ctx.addEventListener('message', async event => {
  if (event.data.type !== 'generateFieldStats') return
  console.log('worker側だよ！！ 受け取った値は', event.data.arg)
  const res = generateFieldStats(event.data.arg)
  ctx.postMessage(res) // 呼び出し元にEventを発火して結果を返す
})

export default ctx

export type PostMessageData = {
  arg: any
  type: 'generateFields' | 'generateFieldStats'
}
