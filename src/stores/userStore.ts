import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'
import { SupportedUnits } from '../config/i18n'
import auth from '@react-native-firebase/auth'

import { IUser, User } from './models/user'
import { actionCodeSettings } from '../config/firebase'

const locales = RNLocalize.getLocales()
const deviceLanguage = locales[0].languageCode

export const UserStore = types
  .model('EventStore', {
    anonFirebaseId: types.maybeNull(types.late(() => types.string)),
    user: types.maybe(types.late(() => User)),
  })
  .actions((self) => ({
    setUser(user: IUser) {
      self.user = user
    },
    setAnonFirebaseId(id: string) {
      self.anonFirebaseId = id
    },
  }))
  .actions((self) => ({
    createAnonUser() {
      if (!self.user) {
        self.user = User.create({
          settings: { lang: deviceLanguage, unit: SupportedUnits.DAYS },
        })
      }
    },
    login(email: string) {
      return auth().sendSignInLinkToEmail(email, actionCodeSettings)
    },
  }))

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
