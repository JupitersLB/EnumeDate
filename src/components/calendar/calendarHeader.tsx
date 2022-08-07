import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTailwind } from 'tailwind-rn/dist'
import RootStoreContext from '../../stores/rootStore'
import { JLBText } from '../texts'

export const CalendarHeader: FC<{
  onUpMonth: () => void
  onDownMonth: () => void
  month: number
  year: number
}> = observer(({ onDownMonth, onUpMonth, month, year }) => {
  const { userStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-row w-full items-center pt-8')}>
      <TouchableOpacity testID="down_month" onPress={onDownMonth}>
        <Icon name="chevron-back" size={32} />
      </TouchableOpacity>
      <JLBText
        testID="calendar_header_date"
        style={tailwind('flex flex-grow text-center text-2xl')}>
        {DateTime.fromFormat(`${year} ${month}`, 'y M')
          .setLocale(userStore?.user?.settings.lang || 'en')
          .toLocaleString({ month: 'long', year: 'numeric' })}
      </JLBText>
      <TouchableOpacity testID="up_month" onPress={onUpMonth}>
        <Icon name="chevron-forward" size={32} />
      </TouchableOpacity>
    </View>
  )
})
