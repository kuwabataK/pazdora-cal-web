import { CounterStore } from './CounterStore'
import { configure } from 'mobx'
import { PazdoraCalStore } from './PazdoraCalStore'
import { ClockStore } from './ClockStore'

configure({ enforceActions: 'always' })

export default {
  counterStore: new CounterStore(),
  pazdoraCalStore: new PazdoraCalStore(),
  clockStore: new ClockStore()
}
