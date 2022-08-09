import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { SettingsNavigationProps } from '../../types/navigation'
import JLBButton from '../JLBButton'
import { H1, P } from '../texts'

const LoginCard: FC<{}> = ({}) => {
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const navigation: SettingsNavigationProps = useNavigation()

  return (
    <View
      style={tailwind(
        'border-2 border-primary box-card-shadow flex-col items-center rounded-md px-8 py-4 mb-8'
      )}>
      <H1>{t('noUser')}</H1>
      <P style={tailwind('my-10 text-center')}>{t('betterExperience')}</P>
      <JLBButton
        type="solid"
        style="w-full"
        iconName="login"
        onPress={() => navigation.push('Login')}
        color="primary">
        {t('login')}
      </JLBButton>
    </View>
  )
}

export default observer(LoginCard)
