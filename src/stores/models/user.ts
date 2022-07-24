import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import i18n from '../../config/i18n'
import { generateId } from '../../utilities/generateId'

export const User = types
  .model('user', {
    id: types.optional(types.identifier, generateId()),
    token: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    settings: types.model({
      lang: types.string,
      unit: types.string,
    }),
  })
  .actions((self) => ({
    setLanguage(lang: 'en' | 'zh-HK') {
      self.settings.lang = lang
      i18n.changeLanguage(lang)
    },
  }))

export interface IUser extends Instance<typeof User> {}
export interface IUserSnapshotIn extends SnapshotIn<typeof User> {}
