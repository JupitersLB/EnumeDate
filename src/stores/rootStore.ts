import { createContext } from 'react'
import { applySnapshot, types } from 'mobx-state-tree'
import { IUiStore, UiStore } from './uiStore'
import { EventStore, IEventStore } from './eventStore'

export interface IRootStore {
  uiStore: IUiStore
  eventStore: IEventStore
}

const RootStore = types
  .model('RootStore', {
    uiStore: types.optional(UiStore, () => UiStore.create({})),
    eventStore: types.optional(EventStore, () => EventStore.create({})),
  })
  .actions((self) => ({
    reset() {
      applySnapshot(self, {})
    },
  }))

export const rootStore = RootStore.create({})

const RootStoreContext = createContext(rootStore)

export default RootStoreContext
