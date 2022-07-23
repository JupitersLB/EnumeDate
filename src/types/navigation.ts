import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type StackParamList = {
  Main: undefined
  Settings: undefined
  HomeStackScreen: undefined
  SettingsStackScreen: undefined
}

export type HomeParamList = {
  Home: undefined
  EventForm: { id?: string }
}

export type HomeNavigationProps = StackNavigationProp<HomeParamList, 'Home'>
export type HomeRouteProps = RouteProp<HomeParamList, 'Home'>

export type EventFormNavigationProps = StackNavigationProp<
  HomeParamList,
  'EventForm'
>
export type EventFormRouteProps = RouteProp<HomeParamList, 'EventForm'>

export type SettingsNavigationProps = StackNavigationProp<
  StackParamList,
  'Settings'
>
export type SettingsRouteProps = RouteProp<StackParamList, 'Settings'>

export type MainNavigationProps = StackNavigationProp<StackParamList, 'Main'>
export type MainRouteProps = RouteProp<StackParamList, 'Main'>

export type HomeStackScreenNavigationProps = StackNavigationProp<
  StackParamList,
  'HomeStackScreen'
>
export type HomeStackScreenRouteProps = RouteProp<
  StackParamList,
  'HomeStackScreen'
>

export type SettingsStackScreenNavigationProps = StackNavigationProp<
  StackParamList,
  'SettingsStackScreen'
>
export type SettingsStackScreenRouteProps = RouteProp<
  StackParamList,
  'SettingsStackScreen'
>
