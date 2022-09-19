import { SupportedLangs, SupportedUnits } from '../config/i18n'

export type UserResponse = {
  id: string
  email: string | null
  name: string | null
  lang: SupportedLangs // defaults to en
  time_unit: SupportedUnits // defaults to days
  registered_user: boolean
  created_at: string
}

export interface LoginResponse extends UserResponse {
  token: {
    id: string
    value: string
  }
}

export interface EventResponse {
  id: string
  title: string
  start_date: string
  unit: SupportedUnits // defaults to days
}

export const Transformers = {
  userLogin: (data: LoginResponse) => {
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      registeredUser: data.registered_user,
      createdAt: data.created_at,
      settings: {
        lang: data.lang,
        unit: data.time_unit,
      },
    }
    const token = {
      id: data.token.id,
      value: data.token.value,
    }
    return { user, token }
  },
  event: (data: EventResponse) => ({
    id: data.id,
    title: data.title,
    startDate: data.start_date,
    unit: data.unit,
  }),
}
