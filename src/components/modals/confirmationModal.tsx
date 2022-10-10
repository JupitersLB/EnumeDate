import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import JLBButton from '../JLBButton'
import { H1, P } from '../texts'

export const ConfirmationModal: FC<{ title: string; description: string }> =
  observer(({ title, description }) => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const tailwind = useTailwind()

    const onConfirm = () => {
      console.log('yes')
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
