import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import Toast, { ToastOptions } from 'react-native-root-toast'
import i18n from '../../config/i18n'

export const JLBToast = types
  .model('LFToast', {
    toastParams: types.maybe(types.frozen<ToastOptions>()),
    locKey: types.optional(types.string, ''),
    locArgs: types.optional(types.frozen<Object>(), {}),
  })
  .actions((self) => ({
    show() {
      Toast.show(i18n.t(self.locKey, self.locArgs), {
        ...self.toastParams,
        duration: self.toastParams?.duration || Toast.durations.SHORT,
        position: self.toastParams?.position || Toast.positions.CENTER,
      })
    },
  }))

export interface IToast extends Instance<typeof JLBToast> {}
export interface IToastSnapshotIn extends SnapshotIn<typeof JLBToast> {}
