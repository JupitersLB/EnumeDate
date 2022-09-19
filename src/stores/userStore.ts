import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import * as RNLocalize from 'react-native-localize'
import { SupportedUnits } from '../config/i18n'
import auth from '@react-native-firebase/auth'

import { IUserSnapshotIn, User } from './models/user'
import { actionCodeSettings } from '../config/firebase'
import { callApi } from '../utilities/api'
import { LoginResponse, Transformers } from '../utilities/transformers'
import { clearAll, saveConfig } from '../config/secureStorage'

const locales = RNLocalize.getLocales()
const deviceLanguage = locales[0].languageCode

export const UserStore = types
  .model('UserStore', {
    firebaseToken: types.maybe(types.string),
    anonFirebaseToken: types.maybe(types.string),
    apiToken: types.maybe(
      types.model({ id: types.string, value: types.string })
    ),
    user: types.optional(User, () =>
      User.create({
        settings: { lang: deviceLanguage, unit: SupportedUnits.DAYS },
      })
    ),
  })
  .actions((self) => ({
    setUser(user: IUserSnapshotIn) {
      self.user = user
    },
    setAnonFirebaseToken(token: string) {
      self.anonFirebaseToken = token
    },
    setFirebaseToken(token: string) {
      self.firebaseToken = token
    },
    setApiToken(token: { id: string; value: string } | undefined) {
      self.apiToken = token
    },
  }))
  .actions((self) => ({
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
      self.setApiToken(undefined)
      self.setFirebaseToken('')
      clearAll()
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
        saveConfig('token', token.value)
        return data
      })
    },
  }))

export const userStore = UserStore.create({})

export interface IUserStore extends Instance<typeof UserStore> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
