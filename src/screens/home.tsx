import React, { FC } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../types/navigation'
import { useTailwind } from 'tailwind-rn'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const tailwind = useTailwind()

  return (
    <SafeAreaView>
      <Text style={tailwind('text-blue-600')}>EnumeDate</Text>
      <TouchableOpacity onPress={() => navigation.push('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home
