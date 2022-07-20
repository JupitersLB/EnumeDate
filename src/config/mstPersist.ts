import persist from 'mst-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { rootStore } from '../stores/RootStore'

export const uiStorePersist = () => {
  persist('uiStore', rootStore.uiStore, {
    storage: AsyncStorage,
    jsonify: true,
    whitelist: ['name'],
  })
}
