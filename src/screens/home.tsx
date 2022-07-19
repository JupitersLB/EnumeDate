import React, { FC } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../types/navigation'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView>
      <Text>EnumeDate</Text>
      <TouchableOpacity onPress={() => navigation.push('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home
