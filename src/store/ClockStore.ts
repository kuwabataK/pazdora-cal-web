import { observable, action, computed } from 'mobx'
import { DateTime } from 'luxon'

export class ClockStore {
  @observable now = DateTime.local()
  clearIntervalId: NodeJS.Timeout | null = null
  constructor() {
    // this.enableAutoUpdate()
  }

  @action
  updateDate() {
    this.now = DateTime.local()
  }

  /**
   * 現在時刻のAutoUpdateを無効にする
   */
  disableAutoUpdate() {
    if (this.clearIntervalId) {
      clearInterval(this.clearIntervalId)
    }
  }

  /**
   * 現在時刻のAutoUpdateを有効にする
   */
  enableAutoUpdate() {
    this.disableAutoUpdate()
    this.clearIntervalId = setInterval(() => {
      this.updateDate()
    }, 100)
  }

  @computed
  get time() {
    return this.now.toFormat('yyyy/MM/dd hh:mm:ss:SSS')
  }
}
