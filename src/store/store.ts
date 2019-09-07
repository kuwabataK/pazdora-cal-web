import { CounterStore } from './CounterStore'
import { configure } from 'mobx'
import { PazdoraCalStore } from './PazdoraCalStore'
import { ClocStore } from './ClocStore'

configure({ enforceActions: 'always' })

export default {
  counterStore: new CounterStore(),
  pazdoraCalStore: new PazdoraCalStore(),
  clocStore: new ClocStore()
}
