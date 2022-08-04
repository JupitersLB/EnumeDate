import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { DateTime } from 'luxon'
import { useTailwind } from 'tailwind-rn/dist'
import { TouchableOpacity, View } from 'react-native'
import { Label } from '../texts'

export const Day: FC<{
  datetime: DateTime
  width: string
  maxWidth: string
  isSelected: boolean
  setSelectedDate: (date: DateTime) => void
}> = observer(({ datetime, width, maxWidth, isSelected, setSelectedDate }) => {
  const tailwind = useTailwind()

  const isToday = datetime.equals(DateTime.now().startOf('day'))

  const dayWidth = datetime.day === 1 ? maxWidth : 'w-full'

  return (
    <TouchableOpacity
      onPress={() => setSelectedDate(datetime)}
      style={tailwind(
        `flex-row ${
          datetime.day === 1 ? `${width} justify-end` : 'w-1/7 justify-center'
        }`
      )}>
      <View
        style={tailwind(
          `py-1 rounded-full ${dayWidth} ${
            isToday && !isSelected ? `bg-secondary` : ''
          } ${isSelected ? 'bg-primary' : ''}`
        )}>
        <Label testID="calendar_date" style={tailwind('text-center')}>
          {datetime.day}
        </Label>
      </View>
    </TouchableOpacity>
  )
})
