import React, { FC, useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwind-rn'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import utilities from './tailwind.json'
import RootStoreContext, { rootStore } from './src/stores/rootStore'
import { uiStorePersist, userStorePersist } from './src/config/mstPersist'
import main from './src/screens/main'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { observer } from 'mobx-react-lite'
import { tailwindExtensions } from './src/config/tailwindExtensions'
import { useToast } from './src/hooks/useToast'
import { QueryClient, QueryClientProvider } from 'react-query'
import JLBDetachedModal from './src/screens/modals/JLBDetachedModal'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

uiStorePersist()
userStorePersist()

const queryClient = new QueryClient()

const App: FC<{}> = () => {
  const { userStore } = useContext(RootStoreContext)
  const [initializing, setInitializing] = useState(true) // show loading placeholder screen of somesort
  useToast()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      handleUser(user)
      if (initializing) setInitializing(false)
    })
    if (!userStore.firebaseToken) {
      auth().signInAnonymously()
    }
    return subscriber // unsubscribe on unmount
  }, [])

  const setupCrashlytics = () => {
    crashlytics().log('User signed in.')
    if (userStore.user) {
      crashlytics().setUserId(userStore.user.id)
    }
  }

  const fetchApiToken = () => {
    userStore
      .fetchApiToken()
      .catch((error) => {
        if (error.response.status === 404)
          userStore.createUser().then(() => userStore.fetchApiToken())
      })
      .finally(() => setupCrashlytics())
  }

  const handleUser = (user: FirebaseAuthTypes.User | null) => {
    user?.getIdToken().then((id) => {
      userStore.setFirebaseToken(id)
      fetchApiToken()
    })
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootStoreContext.Provider value={rootStore}>
        <QueryClientProvider client={queryClient}>
          <TailwindProvider utilities={{ ...utilities, ...tailwindExtensions }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Main">
                <Stack.Group>
                  <Stack.Screen name="Main" component={main} />
                </Stack.Group>
                <Stack.Screen
                  options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: true,
                  }}
                  name="DetachedModal"
                  component={JLBDetachedModal}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </TailwindProvider>
        </QueryClientProvider>
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  )
}

export default observer(App)
