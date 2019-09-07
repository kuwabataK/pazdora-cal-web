import { observable, action, computed } from 'mobx'
import { DateTime } from 'luxon'

export class ClockStore {
  @observable now = DateTime.local()
  clearIntervalId: NodeJS.Timeout | null = null
  constructor() {
    this.startAutoUpdate()
  }

  @action
  updateDate() {
    this.now = DateTime.local()
  }

  stopAutoUpdate() {
    if (this.clearIntervalId) {
      clearInterval(this.clearIntervalId)
    }
  }

  startAutoUpdate() {
    this.stopAutoUpdate()
    this.clearIntervalId = setInterval(() => {
      this.updateDate()
    }, 100)
  }

  @computed
  get time() {
    return this.now.toFormat('yyyy/MM/dd hh:mm:ss:SSS')
  }
}
