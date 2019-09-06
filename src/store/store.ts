import { CounterStore } from './CounterStore'
import { configure } from 'mobx'
import { PazdoraCalStore } from './PazdoraCalStore'

configure({ enforceActions: 'always' })

export default {
  counterStore: new CounterStore(),
  asyncPazdoraCalStore: new PazdoraCalStore()
}
