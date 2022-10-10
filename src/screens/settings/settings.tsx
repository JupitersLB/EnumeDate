import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { SettingsListItem } from '../../components/settings/settingsListItem'
import { H2, JLBText, Label, P } from '../../components/texts'
import {
  SettingsNavigationProps,
  SettingsRouteProps,
} from '../../types/navigation'
import VersionNumber from 'react-native-version-number'
import LoginCard from '../../components/cards/loginCard'
import RootStoreContext from '../../stores/rootStore'
import { useToast } from '../../hooks/useToast'
import JLBButton from '../../components/JLBButton'

const Settings: FC<{
  navigation: SettingsNavigationProps
  route: SettingsRouteProps
}> = ({ navigation, route }) => {
  const { userStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  useToast()
  const { t } = useTranslation()

  const onPress = () => {
    navigation.navigate('DetachedModal', {
      modalType: 'confirmation',
      modalConent: 'confirmDelete',
    })
  }

  return (
    <SafeAreaView style={tailwind('mx-10 flex-1 justify-between')}>
      <View style={tailwind('mt-10')}>
        {userStore.user?.registeredUser ? (
          <View style={tailwind('my-8 flex-col justify-center items-center')}>
            <H2>{userStore.user.email}</H2>
            <P style={tailwind('mt-2')}>
              <Trans
                i18nKey="days since"
                values={{
                  diff: userStore.user.timeSince,
                  unit: t(userStore.user.settings.unit),
                  start: userStore.user.created,
                }}
                components={{
                  bold: (
                    <JLBText
                      style={tailwind('font-semibold text-primary-dark')}
                    />
                  ),
                }}
              />
            </P>
          </View>
        ) : (
          <LoginCard />
        )}
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
        {userStore.user?.registeredUser && (
          <SettingsListItem
            onPress={() => userStore.logout()}
            title="logout"
            iconName="log-out"
          />
        )}
      </View>

      <View>
        {userStore.user?.registeredUser && (
          <JLBButton
            iconName="trash-can"
            style="mt-4"
            type="solid"
            color="danger"
            onPress={onPress}>
            {t('deleteAccount')}
          </JLBButton>
        )}
        <View style={tailwind('flex-row justify-around my-5')}>
          <Label
            style={tailwind(
              'text-xs'
            )}>{`Version: ${VersionNumber.appVersion}`}</Label>
          <Label
            style={tailwind(
              'text-xs'
            )}>{`Build: ${VersionNumber.buildVersion}`}</Label>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default observer(Settings)
