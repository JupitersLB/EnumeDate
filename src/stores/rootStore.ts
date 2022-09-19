import { createContext } from 'react'
import { applySnapshot, types } from 'mobx-state-tree'
import { IUiStore, UiStore } from './uiStore'
import { EventStore, IEventStore } from './eventStore'
import { IUserStore, UserStore } from './userStore'
import { IToastStore, ToastStore } from './toastStore'

export interface IRootStore {
  uiStore: IUiStore
  eventStore: IEventStore
  userStore: IUserStore
  toastStore: IToastStore
}

const RootStore = types
  .model('RootStore', {
    uiStore: types.optional(UiStore, () => UiStore.create({})),
    eventStore: types.optional(EventStore, () => EventStore.create({})),
    userStore: types.optional(UserStore, () => UserStore.create({})),
    toastStore: types.optional(ToastStore, () => ToastStore.create({})),
  })
  .actions((self) => ({
    reset() {
      applySnapshot(self, {})
    },
  }))

export const rootStore = RootStore.create({})

const RootStoreContext = createContext(rootStore)

export default RootStoreContext
