import AsyncPazdoraCal from '../utils/async-pazdora-cal'

export class PazdoraCalStore {
  asyncPazdoraCal: AsyncPazdoraCal | null = null
  createAsyncPazdoraCal(threadNum = 4) {
    this.dispose()
    this.asyncPazdoraCal = new AsyncPazdoraCal(threadNum)
  }
  dispose() {
    if (this.asyncPazdoraCal) this.asyncPazdoraCal.dispose()
  }
}
