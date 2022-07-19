import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type StackParamList = {
  Home: undefined
  Settings: undefined
}

export type HomeNavigationProps = StackNavigationProp<StackParamList, 'Home'>
export type HomeRouteProps = RouteProp<StackParamList, 'Home'>

export type SettingsNavigationProps = StackNavigationProp<
  StackParamList,
  'Settings'
>
export type SettingsRouteProps = RouteProp<StackParamList, 'Settings'>
