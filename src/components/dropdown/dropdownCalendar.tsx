import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Icon from 'react-native-vector-icons/Ionicons'

import { JLBText } from '../texts'
import { DateTime } from 'luxon'
import RootStoreContext from '../../stores/rootStore'
import JLBButton from '../JLBButton'
import { useTranslation } from 'react-i18next'
import { DayHeaders } from '../calendar/dayHeaders'
import { DayDates } from '../calendar/dayDates'

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
