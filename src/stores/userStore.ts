import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'
import { SupportedUnits } from '../config/i18n'
import auth from '@react-native-firebase/auth'

import { IUser, User } from './models/user'
import { actionCodeSettings } from '../config/firebase'
import { callApi } from '../utilities/api'
import { LoginResponse, Transformers } from '../utilities/transformers'

const locales = RNLocalize.getLocales()
const deviceLanguage = locales[0].languageCode

export const UserStore = types
  .model('UserStore', {
    firebaseToken: types.maybe(types.late(() => types.string)),
    anonFirebaseToken: types.maybe(types.late(() => types.string)),
    apiToken: types.maybeNull(
      types.late(() => types.model({ id: types.string, value: types.string }))
    ),
    user: types.maybe(types.late(() => User)),
  })
  .actions((self) => ({
    setUser(user: IUser) {
      self.user = user
    },
    setAnonFirebaseToken(token: string) {
      self.anonFirebaseToken = token
    },
    setFirebaseToken(token: string) {
      self.firebaseToken = token
    },
    setApiToken(token: { id: string; value: string }) {
      self.apiToken = token
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
    createUser() {
      return callApi(
        '/users',
        'POST',
        {},
        self.firebaseToken || self.anonFirebaseToken
      )
    },
    login(email: string) {
      return auth().sendSignInLinkToEmail(email, actionCodeSettings)
    },
    logout() {
      auth().signOut()
      self.setUser(undefined)
    },
    fetchApiToken() {
      return callApi<LoginResponse>(
        '/users/login',
        'POST',
        {},
        self.firebaseToken || self.anonFirebaseToken
      ).then(({ data }) => {
        const { user, token } = Transformers.userLogin(data)
        self.setUser(user)
        self.setApiToken(token)
        return data
      })
    },
  }))

export const userStore = UserStore.create({})

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
