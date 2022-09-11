import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import JLBButton from '../../components/JLBButton'
import JLBDropdown from '../../components/JLBDropdown'
import {
  LangList,
  SupportedLangs,
  SupportedUnits,
  UnitList,
} from '../../config/i18n'
import RootStoreContext from '../../stores/rootStore'
import { PreferencesScreenNavigationProps } from '../../types/navigation'

const Preferences: FC<{ navigation: PreferencesScreenNavigationProps }> = ({
  navigation,
}) => {
  const { userStore } = useContext(RootStoreContext)
  const { control, handleSubmit, setValue } = useForm<{
    language: { label: string; value: SupportedLangs }
    unit: { label: string; value: SupportedUnits }
  }>()
  const tailwind = useTailwind()
  const { t } = useTranslation()

  const onSubmit = (data: {
    language: { label: string; value: SupportedLangs }
    unit: { label: string; value: SupportedUnits }
  }) => {
    userStore.user?.setLanguage(data.language.value)
    userStore.user?.setUnit(data.unit.value)
  }

  return (
    <SafeAreaView style={tailwind('mx-10 flex-1 justify-between')}>
      <View style={tailwind('py-8')}>
        <JLBDropdown
          label="language"
          testID="language_dropdown"
          control={control}
          defaultValue={userStore.user?.defaultLangOption}
          placeholder="select a language"
          setValue={setValue}
          data={LangList}
        />

        <JLBDropdown
          label="unit"
          testID="unit_dropdown"
          defaultValue={userStore.user?.defaultUnitOption}
          control={control}
          placeholder="select a unit"
          setValue={setValue}
          data={UnitList}
        />
      </View>

      <JLBButton
        style="mb-8"
        type="solid"
        color="primary"
        onPress={handleSubmit(onSubmit)}>
        {t('Save')}
      </JLBButton>
    </SafeAreaView>
  )
}

export default observer(Preferences)
