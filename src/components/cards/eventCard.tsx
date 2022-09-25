import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTailwind } from 'tailwind-rn/dist'
import { IEvent } from '../../stores/models/event'
import { HomeNavigationProps } from '../../types/navigation'
import { JLBText } from '../texts'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder'

export const EventCard: FC<{
  event: IEvent
  drag: () => void
  isActive: boolean
}> = observer(({ event, drag, isActive }) => {
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const navigation: HomeNavigationProps = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.push('EventForm', { id: event.id })}
      disabled={isActive}
      style={tailwind(
        `border-b border-secondary mx-2 py-4 ${
          isActive ? 'bg-primary-light' : ''
        }`
      )}>
      <View style={tailwind('flex-row justify-between items-center')}>
        <JLBText
          testID="event_card_title"
          style={tailwind('text-2xl capitalize font-semibold')}>
          {event?.title}
        </JLBText>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <Icon name="dots-vertical" size={32} color="#f4a989" />
        </TouchableOpacity>
      </View>
      <JLBText style={tailwind('text-xl')}>
        <Trans
          i18nKey="days since"
          values={{
            diff: event.timeSince,
            unit: t(event.eventUnit),
            start: event.dateShort,
          }}
          components={{
            bold: (
              <JLBText style={tailwind('font-semibold text-primary-dark')} />
            ),
          }}
        />
      </JLBText>
    </TouchableOpacity>
  )
})

export const EventCardPlaceholder: FC = () => {
  const tailwind = useTailwind()
  return (
    <Placeholder Animation={Fade}>
      <PlaceholderLine height={2} style={tailwind('mb-4')} />
      <View style={tailwind('flex flex-row justify-between pr-6')}>
        <PlaceholderLine width={40} height={20} />
        <View>
          <PlaceholderMedia isRound size={6} />
          <PlaceholderMedia isRound size={6} style={tailwind('my-1')} />
          <PlaceholderMedia isRound size={6} />
        </View>
      </View>
      <PlaceholderLine width={80} />
      <PlaceholderLine height={2} style={tailwind('mt-2')} />
    </Placeholder>
  )
}
