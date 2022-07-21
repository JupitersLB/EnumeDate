import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type StackParamList = {
  Main: undefined
  Home: undefined
  Settings: undefined
  HomeStackScreen: undefined
  SettingsStackScreen: undefined
}

export type HomeNavigationProps = StackNavigationProp<StackParamList, 'Home'>
export type HomeRouteProps = RouteProp<StackParamList, 'Home'>

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
