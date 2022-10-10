import { DateTime } from 'luxon'
import { types, Instance, SnapshotIn, getRoot } from 'mobx-state-tree'
import i18n, {
  LangList,
  SupportedLangs,
  SupportedUnits,
  UnitList,
} from '../../config/i18n'
import { callApi } from '../../utilities/api'
import { generateId } from '../../utilities/generateId'
import { IRootStore } from '../rootStore'

export const User = types
  .model('user', {
    id: types.optional(types.string, generateId()),
    email: types.maybeNull(types.string),
    registeredUser: types.maybeNull(types.boolean),
    createdAt: types.maybeNull(types.string),
    settings: types.model({
      lang: types.frozen<SupportedLangs>(),
      unit: types.frozen<SupportedUnits>(),
    }),
  })
  .actions((self) => ({
    delete() {
      return callApi('/users/delete_account', 'POST')
    },
    setLanguage(lang: SupportedLangs) {
      self.settings.lang = lang
      i18n.changeLanguage(lang)
    },
    setUnit(unit: SupportedUnits) {
      self.settings.unit = unit
    },
    setEmail(email: string) {
      self.email = email
    },
    clear() {
      self.id = generateId()
      self.email = null
      self.registeredUser = false
      self.createdAt = null
      self.settings = { lang: 'en', unit: 'days' }
    },
  }))
  .views((self) => ({
    get defaultLangOption() {
      const langFromList =
        LangList.find((o) => o.value === self.settings.lang) ||
        LangList.find((o) => o.value === SupportedLangs.EN)
      return langFromList
    },
    get defaultUnitOption() {
      UnitList.find((o) => o.value === self.settings.unit)
      return UnitList.find((o) => o.value === self.settings.unit)
    },
    get created(): string {
      const { userStore } = getRoot<IRootStore>(self)

      return DateTime.fromISO(self.createdAt)
        .setLocale(userStore.user?.settings.lang || SupportedLangs.EN)
        .toLocaleString(DateTime.DATE_SHORT)
    },
    get timeSince() {
      return Math.floor(
        Math.abs(
          DateTime.fromISO(self.createdAt)
            .diffNow([self.settings.unit])
            .toObject()[self.settings.unit]
        )
      )
    },
  }))

export interface IUser extends Instance<typeof User> {}
export interface IUserSnapshotIn extends SnapshotIn<typeof User> {}
