import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import i18n, {
  LangList,
  SupportedLangs,
  SupportedUnits,
  UnitList,
} from '../../config/i18n'
import { generateId } from '../../utilities/generateId'

export const User = types
  .model('user', {
    id: types.optional(types.identifier, generateId()),
    token: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    settings: types.model({
      lang: types.frozen<SupportedLangs>(),
      unit: types.frozen<SupportedUnits>(),
    }),
  })
  .actions((self) => ({
    setLanguage(lang: SupportedLangs) {
      self.settings.lang = lang
      i18n.changeLanguage(lang)
    },
    setUnit(unit: SupportedUnits) {
      self.settings.unit = unit
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
  }))

export interface IUser extends Instance<typeof User> {}
export interface IUserSnapshotIn extends SnapshotIn<typeof User> {}
