import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import JLBButton from '../../components/JLBButton'
import JLBDropdown from '../../components/JLBDropdown'
import { LangList } from '../../config/i18n'
import RootStoreContext from '../../stores/rootStore'
import {
  SettingsNavigationProps,
  SettingsRouteProps,
} from '../../types/navigation'

const Settings: FC<{
  navigation: SettingsNavigationProps
  route: SettingsRouteProps
}> = ({ navigation, route }) => {
  const { userStore } = useContext(RootStoreContext)
  const { control, handleSubmit, setValue } = useForm<{
    language: { label: string; value: 'en' | 'zh-HK' }
  }>()
  const tailwind = useTailwind()
  const { t } = useTranslation()

  const onSubmit = (data: {
    language: { label: string; value: 'en' | 'zh-HK' }
  }) => {
    userStore.user?.setLanguage(data.language.value)
  }

  return (
    <SafeAreaView style={tailwind('mx-10')}>
      <View style={tailwind('py-8')}>
        <JLBDropdown
          label="language"
          control={control}
          placeholder="select a language"
          setValue={setValue}
          data={LangList}
        />
      </View>

      <JLBButton type="solid" color="primary" onPress={handleSubmit(onSubmit)}>
        {t('Change language')}
      </JLBButton>
    </SafeAreaView>
  )
}

export default Settings
