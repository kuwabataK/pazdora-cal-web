import { observable, action, computed } from 'mobx'
import { DateTime } from 'luxon'

export class ClocStore {
  @observable now = DateTime.local()
  constructor() {
    setInterval(() => {
      this.updateDate()
    }, 100)
  }

  @action
  updateDate() {
    this.now = DateTime.local()
  }

  @computed
  get time() {
    return this.now.toFormat('yyyy/MM/dd hh:mm:ss:SSS')
  }
}
