import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Icon from 'react-native-vector-icons/Ionicons'

import { JLBText, Label } from '../texts'
import { DateTime } from 'luxon'
import RootStoreContext from '../../stores/rootStore'
import JLBButton from '../JLBButton'
import { tailwindPx } from '../../utilities/arbitraryPxWorkaround'
import { useTranslation } from 'react-i18next'

const Day: FC<{
  datetime: DateTime
  width: string
  maxWidth: string
  isSelected: boolean
  setSelectedDate: (date: DateTime) => void
}> = ({ datetime, width, maxWidth, isSelected, setSelectedDate }) => {
  const tailwind = useTailwind()

  const isToday = datetime.equals(DateTime.now().startOf('month'))

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
        <Label style={tailwind('text-center')}>{datetime.day}</Label>
      </View>
    </TouchableOpacity>
  )
}

const DayHeaders: FC = ({}) => {
  const tailwind = useTailwind()
  const { userStore } = useContext(RootStoreContext)

  return (
    <View style={tailwind('flex-row w-full justify-between pt-4')}>
      {[...Array(7).keys()].map((k) => (
        <Label key={`day-${k}`} style={tailwind('text-center w-1/7')}>
          {DateTime.fromFormat((k + 1).toString(), 'c')
            .setLocale(userStore?.user?.settings.lang || 'en')
            .toFormat('ccc')}
        </Label>
      ))}
    </View>
  )
}

const DayDates: FC<{
  month: number
  year: number
  maxWidth: number | null
  selectedDate: DateTime | null
  setSelectedDate: (date: DateTime) => void
}> = ({ month, year, maxWidth, selectedDate, setSelectedDate }) => {
  const tailwind = useTailwind()
  const { userStore } = useContext(RootStoreContext)

  const date = DateTime.fromFormat(`${year} ${month}`, 'y M')
  const daysInMonth = date.daysInMonth
  const firstDay = date.startOf('month').weekday
  const days = [...Array(daysInMonth).keys()].map((k) => k + 1)

  const maxWidthPixels = maxWidth && tailwindPx[(maxWidth / 7).toFixed(0)]

  return (
    <View style={tailwind('flex-row flex-wrap w-full pt-4')}>
      {days.map(
        (d) =>
          maxWidthPixels && (
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
              datetime={DateTime.fromFormat(
                `${year} ${d} ${month}`,
                'y d M'
              ).setLocale(userStore?.user?.settings.lang || 'en')}
            />
          )
      )}
    </View>
  )
}

const DropdownCalendar: FC<{
  selectedDate: { label: string; value: string } | null
  setVisible: (isVisible: boolean) => void
  setSelectedValue: (value: { label: string; value: string }) => void
}> = ({ setVisible, setSelectedValue, selectedDate }) => {
  const { userStore } = useContext(RootStoreContext)
  const { t } = useTranslation()
  const [date, setDate] = useState<DateTime | null>(null)
  const [month, setMonth] = useState(DateTime.now().month)
  const [year, setYear] = useState(DateTime.now().year)

  useEffect(() => {
    if (selectedDate?.value) {
      const datetime = DateTime.fromISO(selectedDate.value)
      setDate(datetime)
      setMonth(datetime.month)
      setYear(datetime.year)
    }
  }, [])

  const [dayWidth, setDayWidth] = useState<number | null>(null)
  const tailwind = useTailwind()

  const onUpMonth = () => {
    let newMonth = month + 1
    if (newMonth > 12) {
      newMonth = 1
      setYear(year + 1)
    }
    setMonth(newMonth)
  }

  const onDownMonth = () => {
    let newMonth = month - 1
    if (newMonth < 1) {
      newMonth = 12
      setYear(year - 1)
    }
    setMonth(newMonth)
  }

  const onConfirm = () => {
    date &&
      setSelectedValue({
        label: date
          ?.setLocale(userStore?.user?.settings.lang || 'en')
          .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        value: date.toISO(),
      })
    setVisible(false)
  }

  return (
    <View style={tailwind('flex justify-between px-10')}>
      <View style={tailwind('flex-row w-full items-center pt-8')}>
        <TouchableOpacity onPress={onDownMonth}>
          <Icon name="chevron-back" size={32} />
        </TouchableOpacity>
        <JLBText style={tailwind('flex flex-grow text-center text-2xl')}>
          {DateTime.fromFormat(`${year} ${month}`, 'y M')
            .setLocale(userStore?.user?.settings.lang || 'en')
            .toLocaleString({ month: 'long', year: 'numeric' })}
        </JLBText>
        <TouchableOpacity onPress={onUpMonth}>
          <Icon name="chevron-forward" size={32} />
        </TouchableOpacity>
      </View>

      <View onLayout={(event) => setDayWidth(event.nativeEvent.layout.width)}>
        <DayHeaders />
        <DayDates
          selectedDate={date}
          setSelectedDate={setDate}
          month={month}
          year={year}
          maxWidth={dayWidth}
        />
      </View>

      <View style={tailwind('flex-row justify-center my-8')}>
        <JLBText style={tailwind('pr-4 text-lg')}>{t('Date of Event')}</JLBText>
        <JLBText style={tailwind('text-lg')}>
          {date
            ?.setLocale(userStore?.user?.settings.lang || 'en')
            .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </JLBText>
      </View>
      <JLBButton
        disabled={!date}
        type="solid"
        color="primary"
        onPress={onConfirm}>
        {t('Confirm')}
      </JLBButton>
    </View>
  )
}

export default observer(DropdownCalendar)
