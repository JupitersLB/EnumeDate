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
import { useTranslation } from 'react-i18next'
import { useToast } from '../../hooks/useToast'
import Toast from 'react-native-root-toast'
import { useQuery } from 'react-query'

interface FormData {
  title: string
  unit: { label: SupportedUnits; value: SupportedUnits }
  date: { label: string; value: string }
}

const EventForm: FC<{
  navigation: EventFormNavigationProps
  route: EventFormRouteProps
}> = ({ navigation, route }) => {
  const { eventStore, toastStore } = useContext(RootStoreContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>()
  const { userStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  useToast()

  const id = route?.params?.id

  const { isLoading } = useQuery(
    `event.${id}.${userStore.user.id}`,
    () => eventStore.fetchEvent(id),
    { enabled: eventStore.hasEvent(id) }
  )

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
        setValue('title', eventStore.selectedEvent?.title)
        setValue('date', {
          label: eventStore.selectedEvent?.dateLabel,
          value: eventStore.selectedEvent?.startDate,
        })
      }
    }
  }, [id])

  const onSubmit = (data: FormData) => {
    eventStore.selectedEvent ? updateEvent(data) : addEvent(data)
  }

  const addEvent = (data: FormData) => {
    eventStore
      .create({
        title: data.title,
        start_date: data.date.value,
        unit: data.unit.value,
      })
      .then((event) => {
        navigation.goBack()
        toastStore.setToast({
          locKey: 'eventCreated',
          locArgs: { title: event.title },
          toastParams: {
            backgroundColor: '#89f4a9',
            textColor: '#000',
            duration: Toast.durations.LONG,
            opacity: 1,
          },
        })
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

  const updateEvent = (data: FormData) => {
    eventStore.selectedEvent
      ?.update({
        title: data.title,
        start_date: data.date.value,
        unit: data.unit.value,
      })
      .then((event) => {
        navigation.goBack()
        toastStore.setToast({
          locKey: 'eventUpdated',
          locArgs: { title: event.title },
          toastParams: {
            backgroundColor: '#89f4a9',
            textColor: '#000',
            duration: Toast.durations.LONG,
            opacity: 1,
          },
        })
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

  const defaultDate = eventStore.selectedEvent
    ? {
        label: eventStore.selectedEvent.dateLabel,
        value: eventStore.selectedEvent.startDate,
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
          label="title"
          control={control}
          errors={errors}
          placeholder="enter name"
          required
        />
        {errors.title && (
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
        disabled={!watch('title') || watch('title').length < 1}
        onPress={handleSubmit(onSubmit)}>
        {t('Save')}
      </JLBButton>
    </SafeAreaView>
  )
}

export default observer(EventForm)
