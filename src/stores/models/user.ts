import { types, Instance, SnapshotIn } from 'mobx-state-tree'
import { generateId } from '../../utilities/generateId'

export const User = types.model('user', {
  id: types.optional(types.identifier, generateId()),
  token: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  settings: types.model({
    lang: types.string,
    unit: types.string,
  }),
})

export interface IUser extends Instance<typeof User> {}
export interface IUserSnapshotIn extends SnapshotIn<typeof User> {}
