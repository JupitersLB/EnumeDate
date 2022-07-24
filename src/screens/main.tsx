import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { observer } from 'mobx-react-lite'
import { MainNavigationProps, MainRouteProps } from '../types/navigation'
import HomeStackScreen from './home/homeStack'
import SettingsStackScreen from './settings/settingsStack'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

const Main: FC<{
  navigation: MainNavigationProps
  route: MainRouteProps
}> = () => {
  const { t } = useTranslation()
  const iOS = Platform.OS === 'ios'
  const iconSize = iOS ? 36 : 30

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 16,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('Home'),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={iconSize}
              color={focused ? '#15A2DF' : '#B8E5F8'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: t('Settings'),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              size={iconSize}
              color={focused ? '#15A2DF' : '#B8E5F8'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default observer(Main)
