import React, { FC, useContext, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../../types/navigation'
import { useTailwind } from 'tailwind-rn'
import JLBButton from '../../components/JLBButton'
import { ErrorText, JLBText, P } from '../../components/texts'
import RootStoreContext from '../../stores/rootStore'
import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const { eventStore, uiStore } = useContext(RootStoreContext)
  const isFocused = useIsFocused()
  const tailwind = useTailwind()
  const { t } = useTranslation()

  useEffect(() => {}, [isFocused])

  return (
    <SafeAreaView style={tailwind('flex-1 mx-10 justify-between')}>
      <P style={tailwind('text-blue-600')}>EnumeDate</P>
      <View>
        {eventStore.events.map((e) => (
          <JLBText key={`event-${e.id}`}>{e.name}</JLBText>
        ))}
      </View>

      <View style={tailwind('mb-10')}>
        <JLBButton
          // disabled={uiStore.addEventDisabled}
          type="solid"
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

export default Home
