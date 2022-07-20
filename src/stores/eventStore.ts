import { types, Instance, SnapshotIn, destroy } from 'mobx-state-tree'
import { Event, IEvent, IEventSnapshotIn } from './models/event'

export const EventStore = types
  .model('EventStore', {
    events: types.array(Event),
  })
  .actions((self) => ({
    pushToEvents(event: IEventSnapshotIn) {
      !self.events.find((e) => e.id === event.id) && self.events.push(event)
    },
    destroy(event: IEvent) {
      destroy(event)
    },
  }))

export interface IEventStore extends Instance<typeof EventStore> {}
export interface IEventStoreSnapshotIn extends SnapshotIn<typeof EventStore> {}
