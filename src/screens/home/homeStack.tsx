import React, { FC, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'

import home from './home'
import {
  HomeStackScreenNavigationProps,
  HomeStackScreenRouteProps,
} from '../../types/navigation'
import eventForm from './eventForm'

const HomeStack = createStackNavigator()

const HomeStackScreen: FC<{
  navigation: HomeStackScreenNavigationProps
  route: HomeStackScreenRouteProps
}> = ({ navigation, route }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={home}
        options={{
          title: 'Home',
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="EventForm"
        component={eventForm}
        options={{
          title: 'Add Event',
        }}
      />
    </HomeStack.Navigator>
  )
}

export default observer(HomeStackScreen)
