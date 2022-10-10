import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import { useTailwind } from 'tailwind-rn/dist'
import RootStoreContext from '../../stores/rootStore'
import JLBButton from '../JLBButton'
import { H1, P } from '../texts'

export const ConfirmationModal: FC<{ title: string; description: string }> =
  observer(({ title, description }) => {
    const { toastStore, userStore, eventStore } = useContext(RootStoreContext)
    const { t } = useTranslation()
    const navigation = useNavigation()
    const tailwind = useTailwind()

    const email = userStore.user.email

    const onConfirm = () => {
      userStore.user
        .delete()
        .then(() => {
          toastStore.setToast({
            locKey: 'accountDeleted',
            locArgs: { email: email },
            toastParams: {
              backgroundColor: '#89f4a9',
              textColor: '#000',
              duration: Toast.durations.LONG,
              opacity: 1,
            },
          })
          userStore.clear()
          eventStore.clear()
          navigation.goBack()
        })
        .catch(() => {
          toastStore.setToast({
            locKey: 'accountDeletionFailed',
            locArgs: { email: email },
            toastParams: {
              backgroundColor: '#F4899E',
              textColor: '#000',
              duration: Toast.durations.LONG,
              opacity: 1,
            },
          })
        })
    }

    const onCancel = () => {
      navigation.goBack()
    }
    return (
      <>
        <H1>{title}</H1>
        <P style={tailwind('my-4 text-lg text-center')}>{description}</P>
        <View style={tailwind('flex-row w-full')}>
          <JLBButton
            style="mr-4 flex-grow"
            type="outline"
            color="secondary"
            onPress={onCancel}>
            {t('cancel')}
          </JLBButton>
          <JLBButton
            type="solid"
            style="flex-grow"
            color="primary"
            onPress={onConfirm}>
            {t('confirm')}
          </JLBButton>
        </View>
      </>
    )
  })
