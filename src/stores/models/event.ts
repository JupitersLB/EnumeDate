import { DateTime } from 'luxon'
import { types, Instance, SnapshotIn, getRoot } from 'mobx-state-tree'
import { generateId } from '../../utilities/generateId'
import { IRootStore } from '../rootStore'

export const Event = types
  .model('Event', {
    id: types.optional(types.identifier, generateId()),
    name: types.string,
    datetime: types.string,
  })
  .actions((self) => ({
    setDatetime(newDate: string) {
      self.datetime = newDate
    },
  }))
  .views((self) => ({
    get dateLabel() {
      const { userStore } = getRoot<IRootStore>(self)

      return DateTime.fromISO(self.datetime)
        .setLocale(userStore?.user?.settings.lang || 'en')
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
  }))

export interface IEvent extends Instance<typeof Event> {}
export interface IEventSnapshotIn extends SnapshotIn<typeof Event> {}
