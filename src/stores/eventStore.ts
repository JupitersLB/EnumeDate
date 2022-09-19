import { types, Instance, SnapshotIn, destroy } from 'mobx-state-tree'
import { SupportedUnits } from '../config/i18n'
import { callApi } from '../utilities/api'
import { EventResponse, Transformers } from '../utilities/transformers'
import { Event, IEvent, IEventSnapshotIn } from './models/event'

export const EventStore = types
  .model('EventStore', {
    events: types.array(Event),
    selectedEvent: types.safeReference(Event),
  })
  .actions((self) => ({
    pushToEvents(event: IEventSnapshotIn) {
      !self.events.find((e) => e.id === event.id) && self.events.push(event)
      return event
    },

    destroy(event: IEvent) {
      destroy(event)
    },
    setSelectedEvent(eventId: string | null) {
      //@ts-ignore
      self.selectedEvent = eventId || undefined
    },
  }))
  .actions((self) => ({
    create(event: {
      title: string
      start_date: string
      unit?: SupportedUnits
    }) {
      return callApi<EventResponse>(`/events`, 'POST', event).then(({ data }) =>
        self.pushToEvents(Transformers.event(data))
      )
    },
    fetch() {
      return callApi<EventResponse[]>(`/events`, 'GET').then(({ data }) =>
        data.map((d) => self.pushToEvents(Transformers.event(d)))
      )
    },
  }))

export const eventStore = EventStore.create({
  events: [],
})

export interface IEventStore extends Instance<typeof EventStore> {}
export interface IEventStoreSnapshotIn extends SnapshotIn<typeof EventStore> {}
