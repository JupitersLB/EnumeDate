import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import { generateId } from '../../utilities/generateId'

export const Event = types.model('Event', {
  id: types.optional(types.identifier, generateId()),
  name: types.string,
  datetime: types.string,
})

export interface IEvent extends Instance<typeof Event> {}
export interface IEventSnapshotIn extends SnapshotIn<typeof Event> {}
