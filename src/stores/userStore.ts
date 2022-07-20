import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'

import { IUser, User } from './models/user'

const locales = RNLocalize.getLocales()
const deviceLanguage = locales[0].languageCode

export const UserStore = types
  .model('EventStore', {
    user: types.maybe(types.late(() => User)),
  })
  .actions((self) => ({
    setUser(user: IUser) {
      self.user = user
    },
  }))
  .actions((self) => ({
    createAnonUser() {
      if (!self.user) {
        self.user = User.create({
          settings: { lang: deviceLanguage, unit: 'default' },
        })
      }
    },
  }))

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
