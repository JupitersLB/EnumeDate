import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwind-rn'

import utilities from './tailwind.json'
import RootStoreContext, { rootStore } from './src/stores/rootStore'
import {
  eventStorePersist,
  uiStorePersist,
  userStorePersist,
} from './src/config/mstPersist'
import main from './src/screens/main'

const Stack = createNativeStackNavigator()

uiStorePersist()
eventStorePersist()
userStorePersist()

const App: FC<{}> = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Main">
            <Stack.Screen name="Main" component={main} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </RootStoreContext.Provider>
  )
}

export default App
