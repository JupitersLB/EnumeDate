import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'

import settings from './settings'
import {
  SettingsStackScreenNavigationProps,
  SettingsStackScreenRouteProps,
} from '../../types/navigation'

const SettingsStack = createStackNavigator()

const SettingsStackScreen: FC<{
  navigation: SettingsStackScreenNavigationProps
  route: SettingsStackScreenRouteProps
}> = ({ navigation, route }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <SettingsStack.Screen
        name="Settings"
        component={settings}
        options={{
          title: 'Settings',
          headerLeft: () => null,
        }}
      />
    </SettingsStack.Navigator>
  )
}

export default observer(SettingsStackScreen)
