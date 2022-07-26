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
import EmailLinkHandler from '../../components/home/emailLinkHandler'
import { useQuery } from 'react-query'
import { useToast } from '../../hooks/useToast'
import { EventCardPlaceholder } from '../../components/cards/eventCard'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const { eventStore, uiStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  useToast()

  const { isLoading } = useQuery(`events`, () => eventStore.fetchEvents())

  return (
    <SafeAreaView
      testID="home_screen"
      style={tailwind('flex-1 mx-8 justify-between')}>
      <EmailLinkHandler />
      <P style={tailwind('text-blue-600')}>EnumeDate</P>

      <View style={tailwind('h-2/3 my-10')}>
        {isLoading ? (
          <>
            {[...Array(3)].map((_e, i) => (
              <EventCardPlaceholder key={`placeholder-${i}`} />
            ))}
          </>
        ) : (
          <EventList
            key={eventStore.events.length}
            events={eventStore.events}
          />
        )}
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
