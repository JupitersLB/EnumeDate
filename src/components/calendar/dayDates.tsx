import React, { FC } from 'react'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'
import { useTailwind } from 'tailwind-rn/dist'
import { tailwindPx } from '../../utilities/arbitraryPxWorkaround'
import { View } from 'react-native'
import { Day } from './day'

export const DayDates: FC<{
  month: number
  year: number
  maxWidth: number | null
  selectedDate: DateTime | null
  setSelectedDate: (date: DateTime) => void
}> = observer(({ month, year, maxWidth, selectedDate, setSelectedDate }) => {
  const tailwind = useTailwind()

  const date = DateTime.fromFormat(`${year} ${month}`, 'y M')
  const daysInMonth = date.daysInMonth
  const firstDay = date.startOf('month').weekday
  const days = [...Array(daysInMonth).keys()].map((k) => k + 1)

  //@ts-ignore
  const maxWidthPixels = tailwindPx[(maxWidth / 7).toFixed(0)] || 'w-[44px]'

  return (
    <View style={tailwind('flex-row flex-wrap w-full pt-4')}>
      {days.map((d) => (
        <Day
          key={`day-${d}`}
          maxWidth={maxWidthPixels}
          isSelected={
            selectedDate?.day === d &&
            selectedDate?.month === month &&
            selectedDate?.year === year
          }
          setSelectedDate={setSelectedDate}
          width={
            {
              1: 'w-1/7',
              2: 'w-2/7',
              3: 'w-3/7',
              4: 'w-4/7',
              5: 'w-5/7',
              6: 'w-6/7',
              7: 'w-7/7',
            }[firstDay]
          }
          datetime={DateTime.fromFormat(`${year} ${d} ${month}`, 'y d M')}
        />
      ))}
    </View>
  )
})
