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
    pushToEvents(eventResponse: IEventSnapshotIn) {
      const event = self.events.find((e) => e.id === eventResponse.id)
      if (!event) {
        self.events.push(eventResponse)
      } else {
        event.update(eventResponse)
      }
      return eventResponse
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
    fetchEvents() {
      return callApi<EventResponse[]>(`/events`, 'GET').then((response) => {
        return response.data.map((d) =>
          self.pushToEvents(Transformers.event(d))
        )
      })
    },
    fetchEvent(id: string) {
      return callApi<EventResponse>(`/events/${id}`, 'GET').then((response) => {
        return self.pushToEvents(Transformers.event(response.data))
      })
    },
  }))
  .views((self) => {
    return {
      hasEvent(id?: string) {
        if (!id || !self.events.find((e) => e.id === id)) return false
        return true
      },
    }
  })

export const eventStore = EventStore.create({
  events: [],
})

export interface IEventStore extends Instance<typeof EventStore> {}
export interface IEventStoreSnapshotIn extends SnapshotIn<typeof EventStore> {}
