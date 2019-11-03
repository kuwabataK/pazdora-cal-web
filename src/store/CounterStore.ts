import { observable, action } from 'mobx'
import { createDraft, finishDraft } from 'immer'

export class CounterStore {
  @observable counter = 0
  @observable.ref objectCounter = {
    counter: 0,
    deepcnt: {
      counter: 0
    }
  }

  @action
  increment(): void {
    this.counter++
  }

  @action
  decrement(): void {
    this.counter--
  }

  @action
  incrementObj(): void {
    const draft = createDraft(this.objectCounter)
    draft.counter++
    this.objectCounter = finishDraft(draft)
  }

  @action
  decrementObj(): void {
    const draft = createDraft(this.objectCounter)
    draft.counter--
    this.objectCounter = finishDraft(draft)
  }

  @action
  incrementDeep(): void {
    const draft = createDraft(this.objectCounter)
    draft.deepcnt.counter++
    this.objectCounter = finishDraft(draft)
  }

  @action
  decrementDeep(): void {
    const draft = createDraft(this.objectCounter)
    draft.deepcnt.counter--
    this.objectCounter = finishDraft(draft)
  }
}
