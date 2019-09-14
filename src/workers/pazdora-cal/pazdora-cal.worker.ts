import PazdoraCal from '../../utils/pazdora-cal/pazdora-cal'

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any

ctx.onmessage = event => {
  console.log('worker側だよ！！ 受け取った値は', event.data.arg)
  let res

  switch ((event.data as PostMessageData).type) {
    case 'generateFields':
      res = PazdoraCal.generateFields(event.data.arg)
      break
    case 'generateFieldStats':
      res = PazdoraCal.generateFieldStats(event.data.arg)
      break
    case 'calc':
      const fields = PazdoraCal.generateFieldStats(event.data.arg.option)
      res = PazdoraCal.calcUseFactory(event.data.arg.condition, fields)
      break
    default:
      break
  }
  ctx.postMessage(res) // 呼び出し元にEventを発火して結果を返す
}

export default ctx

export type PostMessageData = {
  arg: any
  type: 'generateFields' | 'generateFieldStats' | 'calc'
}
