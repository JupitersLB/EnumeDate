import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'

import settings from './settings'
import { SettingsStackScreenNavigationProps } from '../../types/navigation'
import { useTranslation } from 'react-i18next'
import preferences from './preferences'
import about from './about'
import login from './login'

const SettingsStack = createStackNavigator()

const SettingsStackScreen: FC<{
  navigation: SettingsStackScreenNavigationProps
}> = ({ navigation }) => {
  const { t } = useTranslation()

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
          title: t('Settings'),
          headerLeft: () => null,
        }}
      />
      <SettingsStack.Screen
        name="About"
        component={about}
        options={{
          title: t('about'),
        }}
      />
      <SettingsStack.Screen
        name="Preferences"
        component={preferences}
        options={{
          title: t('preferences'),
        }}
      />
      <SettingsStack.Screen
        name="Login"
        component={login}
        options={{
          title: t('login'),
        }}
      />
    </SettingsStack.Navigator>
  )
}

export default observer(SettingsStackScreen)
