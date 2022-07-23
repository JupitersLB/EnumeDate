import React, { FC, useContext, useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../../types/navigation'
import { useTailwind } from 'tailwind-rn'
import JLBButton from '../../components/JLBButton'
import { ErrorText, JLBText, P } from '../../components/texts'
import RootStoreContext from '../../stores/rootStore'
import { useIsFocused } from '@react-navigation/native'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const { eventStore, uiStore } = useContext(RootStoreContext)
  const isFocused = useIsFocused()
  const tailwind = useTailwind()

  useEffect(() => {}, [isFocused])

  return (
    <SafeAreaView style={tailwind('flex-1 mx-10 justify-between')}>
      <P style={tailwind('text-blue-600')}>EnumeDate</P>
      {/* <JLBDropdown
        label="language"
        control={control}
        placeholder="select a language"
        setValue={setValue}
        data={[
          { label: 'English', value: 'en' },
          { label: 'Japanese', value: 'ja' },
        ]}
      /> */}
      {eventStore.events.map((e) => (
        <JLBText key={`event-${e.id}`}>{e.name}</JLBText>
      ))}
      <View style={tailwind('mb-10')}>
        <JLBButton
          disabled={uiStore.addEventDisabled}
          type="solid"
          color="primary"
          onPress={() => navigation.push('EventForm', {})}>
          Add New Event
        </JLBButton>
        {uiStore.addEventDisabled && (
          <ErrorText>Create an account to add more events</ErrorText>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Home
