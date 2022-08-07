import React, { FC, useContext } from 'react'
import { SafeAreaView, View } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../../types/navigation'
import { useTailwind } from 'tailwind-rn'
import JLBButton from '../../components/JLBButton'
import { ErrorText, P } from '../../components/texts'
import RootStoreContext from '../../stores/rootStore'
import { useTranslation } from 'react-i18next'
import EventList from '../../components/home/eventList'
import { observer } from 'mobx-react-lite'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const { eventStore, uiStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()

  // eventStore.destroy(eventStore.events[0])

  return (
    <SafeAreaView
      testID="home_screen"
      style={tailwind('flex-1 mx-10 justify-between')}>
      <P style={tailwind('text-blue-600')}>EnumeDate</P>
      <View style={tailwind('flex flex-grow my-10')}>
        <EventList key={eventStore.events.length} events={eventStore.events} />
      </View>

      <View style={tailwind('mb-10')}>
        <JLBButton
          disabled={uiStore.addEventDisabled}
          testID="add_new_event_button"
          type="outline"
          color="primary"
          onPress={() => navigation.push('EventForm', {})}>
          {t('Add New Event')}
        </JLBButton>
        {uiStore.addEventDisabled && (
          <ErrorText>{t('Create Account Error')}</ErrorText>
        )}
      </View>
    </SafeAreaView>
  )
}

export default observer(Home)
