import { types, Instance } from 'mobx-state-tree'
import { IToastSnapshotIn, JLBToast } from './models/toast'

export const ToastStore = types
  .model('ToastStore', {
    toast: types.maybeNull(JLBToast),
  })
  .views((self) => ({
    get hasToast() {
      return self.toast != null
    },
  }))
  .actions((self) => ({
    setToast(toast: IToastSnapshotIn) {
      self.toast = JLBToast.create(toast)
    },
    removeToast() {
      self.toast = null
    },
  }))
  .actions((self) => ({
    show() {
      if (self.hasToast) {
        self.toast?.show()
        self.removeToast()
      }
    },
  }))

export interface IToastStore extends Instance<typeof ToastStore> {}
