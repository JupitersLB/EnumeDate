import { types, Instance, SnapshotIn } from 'mobx-state-tree'

export const UiStore = types.model('UiStore', {
  name: 'UiStore',
})

export interface IUiStore extends Instance<typeof UiStore> {}
export interface IUiStoreSnapshotIn extends SnapshotIn<typeof UiStore> {}
