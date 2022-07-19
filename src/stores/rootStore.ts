import { createContext } from 'react'
import { applySnapshot, types } from 'mobx-state-tree'
import { IUiStore, UiStore } from './uiStore'

export interface IRootStore {
  uiStore: IUiStore
}

const RootStore = types
  .model('RootStore', {
    uiStore: types.optional(UiStore, () => UiStore.create({})),
  })
  .actions((self) => ({
    reset() {
      applySnapshot(self, {})
    },
  }))

export const rootStore = RootStore.create({})

const RootStoreContext = createContext(rootStore)

export default RootStoreContext
