import { DateTime } from 'luxon'
import { types, Instance, SnapshotIn, getRoot } from 'mobx-state-tree'
import { SupportedLangs, SupportedUnits } from '../../config/i18n'
import { generateId } from '../../utilities/generateId'
import { IRootStore } from '../rootStore'

export const Event = types
  .model('Event', {
    id: types.optional(types.identifier, generateId()),
    title: types.string,
    startDate: types.string,
    unit: types.maybeNull(types.frozen<SupportedUnits>()),
  })
  .actions((self) => ({
    setDatetime(newDate: string) {
      self.startDate = newDate
    },
    update(event: IEventSnapshotIn) {
      self.title = event.title
      self.startDate = event.startDate
      self.unit = event.unit
      return self
    },
  }))
  .views((self) => ({
    get eventUnit() {
      const { userStore } = getRoot<IRootStore>(self)

      return self.unit || userStore.user?.settings.unit || SupportedUnits.DAYS
    },
    get dateLabel() {
      const { userStore } = getRoot<IRootStore>(self)

      return DateTime.fromISO(self.startDate)
        .setLocale(userStore?.user?.settings.lang || SupportedLangs.EN)
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    get dateShort() {
      const { userStore } = getRoot<IRootStore>(self)

      return DateTime.fromISO(self.startDate)
        .setLocale(userStore?.user?.settings.lang || SupportedLangs.EN)
        .toLocaleString(DateTime.DATE_SHORT)
    },
    get timeSince() {
      return Math.floor(
        Math.abs(
          DateTime.fromISO(self.startDate).diffNow([this.eventUnit]).toObject()[
            this.eventUnit
          ]
        )
      )
    },
  }))

export interface IEvent extends Instance<typeof Event> {}
export interface IEventSnapshotIn extends SnapshotIn<typeof Event> {}
