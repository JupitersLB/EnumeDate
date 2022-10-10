import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { ErrorText } from '../../components/texts'
import JLBButton from '../../components/JLBButton'
import JLBInput from '../../components/JLBInput'
import { useForm } from 'react-hook-form'
import RootStoreContext from '../../stores/rootStore'
import Toast from 'react-native-root-toast'
import { LoginNavigationProps } from '../../types/navigation'
import { useToast } from '../../hooks/useToast'

const Login: FC<{
  navigation: LoginNavigationProps
}> = ({ navigation }) => {
  const { userStore, toastStore } = useContext(RootStoreContext)
  const { t } = useTranslation()
  useToast()
  const tailwind = useTailwind()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>()

  const onPress = (data: { email: string }) => {
    userStore.user?.setEmail(data.email)
    userStore
      .login(data.email)
      .then(() => {
        toastStore.setToast({
          locKey: 'emailSent',
          locArgs: { address: data.email },
          toastParams: {
            backgroundColor: '#89f4a9',
            textColor: '#000',
            duration: Toast.durations.LONG,
            opacity: 1,
          },
        })
        navigation.goBack()
      })
      .catch(() => {
        toastStore.setToast({
          locKey: 'loginFailed',
          locArgs: { address: data.email },
          toastParams: {
            backgroundColor: '#F4899E',
            textColor: '#000',
            duration: Toast.durations.LONG,
            opacity: 1,
          },
        })
      })
  }

  return (
    <SafeAreaView style={tailwind('mx-10 flex-1 justify-center')}>
      <JLBInput
        label="email"
        control={control}
        errors={errors}
        placeholder="enter email"
        required
      />
      {errors.email && (
        <ErrorText>{t('Required', { field: t('email') })}</ErrorText>
      )}

      <JLBButton
        style="mt-4"
        type="solid"
        color="primary"
        onPress={handleSubmit(onPress)}>
        {t('login')}
      </JLBButton>
    </SafeAreaView>
  )
}

export default observer(Login)
