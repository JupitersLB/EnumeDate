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

const HeaderDelete: FC<{ event: IEvent }> = ({ event }) => {
  const { eventStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const navigation: EventFormNavigationProps = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        eventStore.destroy(event)
        navigation.goBack()
      }}
      style={tailwind('flex-row items-center pr-3')}>
      <Icon name="trash" color="#F4899E" size={24} />
      <JLBText style={tailwind('text-danger font-semibold text-sm')}>
        {t('delete')}
      </JLBText>
    </TouchableOpacity>
  )
}

export default observer(HeaderDelete)
