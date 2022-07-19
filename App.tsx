import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwind-rn'

import utilities from './tailwind.json'
import Home from './src/screens/home'
import Settings from './src/screens/settings'
import RootStoreContext, { rootStore } from './src/stores/rootStore'

const Stack = createNativeStackNavigator()

const App: FC<{}> = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </RootStoreContext.Provider>
  )
}

export default App
