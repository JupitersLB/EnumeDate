import persist from 'mst-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { rootStore } from '../stores/rootStore'

export const uiStorePersist = () => {
  persist('uiStore', rootStore.uiStore, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['name'],
  })
}

export const userStorePersist = () => {
  persist('userStore', rootStore.userStore, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['firebaseToken', 'apiToken'],
  })
}
