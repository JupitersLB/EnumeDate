import React, { FC, useContext } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../types/navigation'
import { useTailwind } from 'tailwind-rn'
import RootStoreContext from '../stores/rootStore'
import JLBButton from '../components/JLBButton'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const { userStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()

  return (
    <SafeAreaView>
      <Text style={tailwind('text-blue-600')}>EnumeDate</Text>
      <JLBButton
        type="solid"
        color="primary"
        onPress={() => navigation.push('Settings')}>
        Settings
      </JLBButton>
    </SafeAreaView>
  )
}

export default Home
