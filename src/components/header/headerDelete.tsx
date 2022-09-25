import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import RootStoreContext from '../../stores/rootStore'
import Icon from 'react-native-vector-icons/Ionicons'
import { JLBText } from '../texts'
import { useTranslation } from 'react-i18next'
import { EventFormNavigationProps } from '../../types/navigation'
import { useNavigation } from '@react-navigation/native'
import { IEvent } from '../../stores/models/event'
import Toast from 'react-native-root-toast'

const HeaderDelete: FC<{ event: IEvent }> = ({ event }) => {
  const { eventStore, toastStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const navigation: EventFormNavigationProps = useNavigation()

  const onDelete = () => {
    const eventTitle = event.title
    event
      .delete()
      .then(() => {
        eventStore.destroy(event)
        toastStore.setToast({
          locKey: 'eventDeleted',
          locArgs: { title: eventTitle },
          toastParams: {
            backgroundColor: '#89f4a9',
            textColor: '#000',
            duration: Toast.durations.LONG,
            opacity: 1,
          },
        })
        navigation.goBack()
      })
      .catch((err) => {
        toastStore.setToast({
          locKey: 'errorReceived',
          locArgs: { message: err.response.data.message },
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
    <TouchableOpacity
      onPress={onDelete}
      style={tailwind('flex-row items-center pr-3')}>
      <Icon name="trash" color="#F4899E" size={24} />
      <JLBText style={tailwind('text-danger font-semibold text-sm')}>
        {t('delete')}
      </JLBText>
    </TouchableOpacity>
  )
}

export default observer(HeaderDelete)
