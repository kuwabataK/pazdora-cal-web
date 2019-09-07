import PazdoraCalController from '../workers/pazdora-cal/pazdora-cal-worker-controller'

export class PazdoraCalStore {
  pazdoraCalController: PazdoraCalController | null = null
  createThread(threadNum = 4) {
    this.dispose()
    this.pazdoraCalController = new PazdoraCalController(threadNum)
  }
  dispose() {
    if (this.pazdoraCalController) this.pazdoraCalController.dispose()
  }
}
