import { types, Instance, SnapshotIn, getRoot } from 'mobx-state-tree'
import { IRootStore } from './rootStore'

export const UiStore = types
  .model('UiStore', {
    name: 'UiStore',
  })
  .views((self) => ({
    get addEventDisabled() {
      const { eventStore, userStore } = getRoot<IRootStore>(self)
      return eventStore.events.length > 2 && !userStore.user?.token
    },
  }))

export interface IUiStore extends Instance<typeof UiStore> {}
export interface IUiStoreSnapshotIn extends SnapshotIn<typeof UiStore> {}
