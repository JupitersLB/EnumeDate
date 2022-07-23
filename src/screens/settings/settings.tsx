import React, { FC } from 'react'
import { SafeAreaView, Text } from 'react-native'
import {
  SettingsNavigationProps,
  SettingsRouteProps,
} from '../../types/navigation'

const Settings: FC<{
  navigation: SettingsNavigationProps
  route: SettingsRouteProps
}> = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>Settings</Text>
    </SafeAreaView>
  )
}

export default Settings
