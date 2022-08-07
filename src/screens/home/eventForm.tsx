import { t } from 'i18next'
import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import JLBButton from '../../components/JLBButton'
import JLBDropdown from '../../components/JLBDropdown'
import JLBInput from '../../components/JLBInput'
import { ErrorText } from '../../components/texts'
import { SupportedUnits, UnitList } from '../../config/i18n'
import RootStoreContext from '../../stores/rootStore'
import {
  EventFormNavigationProps,
  EventFormRouteProps,
} from '../../types/navigation'
import HeaderDelete from '../../components/header/headerDelete'

interface FormData {
  name: string
  unit: { label: SupportedUnits; value: SupportedUnits }
  date: { label: string; value: string }
}

const EventForm: FC<{
  navigation: EventFormNavigationProps
  route: EventFormRouteProps
}> = ({ navigation, route }) => {
  const { eventStore } = useContext(RootStoreContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>()
  const tailwind = useTailwind()

  const id = route?.params?.id

  useEffect(() => {
    eventStore.setSelectedEvent(null)
    setValue('unit', { label: SupportedUnits.DAYS, value: SupportedUnits.DAYS })
    if (id) {
      eventStore.setSelectedEvent(id)
      if (eventStore.selectedEvent) {
        navigation.setOptions({
          title: t('Edit Event'),
          // @ts-ignore
          headerRight: () => <HeaderDelete event={eventStore.selectedEvent} />,
        })
        setValue('name', eventStore.selectedEvent?.name)
        setValue('date', {
          label: eventStore.selectedEvent?.dateLabel,
          value: eventStore.selectedEvent?.datetime,
        })
      }
    }
  }, [id])

  const onSubmit = (data: FormData) => {
    eventStore.selectedEvent ? updateEvent(data) : addEvent(data)
    navigation.goBack()
  }

  const addEvent = (data: FormData) => {
    eventStore.pushToEvents({
      name: data.name,
      datetime: data.date.value,
      unit: data.unit.value,
    })
  }

  const updateEvent = (data: FormData) => {
    eventStore.selectedEvent?.update({
      name: data.name,
      datetime: data.date.value,
      unit: data.unit.value,
    })
  }

  const defaultDate = eventStore.selectedEvent
    ? {
        label: eventStore.selectedEvent.dateLabel,
        value: eventStore.selectedEvent.datetime,
      }
    : null

  const defaultUnit = eventStore.selectedEvent
    ? {
        label: eventStore.selectedEvent?.eventUnit,
        value: eventStore.selectedEvent?.eventUnit,
      }
    : {
        label: SupportedUnits.DAYS,
        value: SupportedUnits.DAYS,
      }

  return (
    <SafeAreaView style={tailwind('flex-1 mx-10 justify-between')}>
      <View>
        <JLBInput
          label="name"
          control={control}
          errors={errors}
          placeholder="enter name"
          required
        />
        {errors.name && (
          <ErrorText>{t('Required', { field: t('name') })}</ErrorText>
        )}

        <JLBDropdown
          label="date"
          testID="calendar_dropdown"
          control={control}
          defaultValue={defaultDate}
          placeholder="select a date"
          setValue={setValue}
          calendar
          required
        />
        {errors.date && (
          <ErrorText>{t('Required', { field: t('date') })}</ErrorText>
        )}

        <JLBDropdown
          label="unit"
          testID="unit_dropdown"
          control={control}
          placeholder="select a unit"
          defaultValue={defaultUnit}
          setValue={setValue}
          data={UnitList}
        />
      </View>

      <JLBButton
        type="solid"
        testID="save_button"
        color="primary"
        style={'mt-6 mb-12'}
        onPress={handleSubmit(onSubmit)}>
        {t('Save')}
      </JLBButton>
    </SafeAreaView>
  )
}

export default observer(EventForm)
