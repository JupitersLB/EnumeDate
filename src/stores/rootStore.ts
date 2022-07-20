import { createContext } from 'react'
import { applySnapshot, types } from 'mobx-state-tree'
import { IUiStore, UiStore } from './uiStore'
import { EventStore, IEventStore } from './eventStore'
import { IUserStore, UserStore } from './userStore'

export interface IRootStore {
  uiStore: IUiStore
  eventStore: IEventStore
  userStore: IUserStore
}

const RootStore = types
  .model('RootStore', {
    uiStore: types.optional(UiStore, () => UiStore.create({})),
    eventStore: types.optional(EventStore, () => EventStore.create({})),
    userStore: types.optional(UserStore, () => UserStore.create({})),
  })
  .actions((self) => ({
    reset() {
      applySnapshot(self, {})
    },
  }))

export const rootStore = RootStore.create({})

const RootStoreContext = createContext(rootStore)

export default RootStoreContext
