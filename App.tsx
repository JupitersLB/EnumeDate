import React, { FC, useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwind-rn'
import auth from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import utilities from './tailwind.json'
import RootStoreContext, { rootStore } from './src/stores/rootStore'
import {
  eventStorePersist,
  uiStorePersist,
  userStorePersist,
} from './src/config/mstPersist'
import main from './src/screens/main'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { observer } from 'mobx-react-lite'
import { tailwindExtensions } from './src/config/tailwindExtensions'

const Stack = createNativeStackNavigator()

uiStorePersist()
eventStorePersist()
userStorePersist()

const App: FC<{}> = () => {
  const { userStore } = useContext(RootStoreContext)
  const [initializing, setInitializing] = useState(true) // show loading placeholder screen of somesort

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      userState?.getIdToken().then((id) => userStore.setAnonFirebaseId(id))
      if (initializing) setInitializing(false)
      // set up when handing users better
      // crashlytics().log('User signed in.')
      // await Promise.all([
      //   crashlytics().setUserId(user.uid),
      //   crashlytics().setAttribute('credits', String(user.credits)),
      //   crashlytics().setAttributes({
      //     role: 'admin',
      //     followers: '13',
      //     email: user.email,
      //     username: user.username,
      //   }),
      // ])
    })
    if (!userStore.anonFirebaseId) {
      auth()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously')
        })
        .catch((error) => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.')
          }

          console.error(error)
        })
    }
    return subscriber // unsubscribe on unmount
  }, [])

  console.log('id: ', userStore.anonFirebaseId)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootStoreContext.Provider value={rootStore}>
        <TailwindProvider utilities={{ ...utilities, ...tailwindExtensions }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Main">
              <Stack.Screen name="Main" component={main} />
            </Stack.Navigator>
          </NavigationContainer>
        </TailwindProvider>
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  )
}

export default observer(App)
