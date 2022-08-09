import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { SettingsListItem } from '../../components/settings/settingsListItem'
import { Label } from '../../components/texts'
import {
  SettingsNavigationProps,
  SettingsRouteProps,
} from '../../types/navigation'
import VersionNumber from 'react-native-version-number'
import LoginCard from '../../components/cards/loginCard'

const Settings: FC<{
  navigation: SettingsNavigationProps
  route: SettingsRouteProps
}> = ({ navigation, route }) => {
  const tailwind = useTailwind()
  const { t } = useTranslation()

  return (
    <SafeAreaView style={tailwind('mx-10 flex-1 justify-between')}>
      <View style={tailwind('mt-10')}>
        <LoginCard />
        <SettingsListItem
          onPress={() => navigation.push('Preferences')}
          title="preferences"
          iconName="options"
        />
        <SettingsListItem
          onPress={() => navigation.push('About')}
          title="about"
          iconName="information-circle"
        />
      </View>
      <View style={tailwind('flex-row justify-around mb-5')}>
        <Label
          style={tailwind(
            'text-xs'
          )}>{`Version: ${VersionNumber.appVersion}`}</Label>
        <Label
          style={tailwind(
            'text-xs'
          )}>{`Build: ${VersionNumber.buildVersion}`}</Label>
      </View>
    </SafeAreaView>
  )
}

export default observer(Settings)
