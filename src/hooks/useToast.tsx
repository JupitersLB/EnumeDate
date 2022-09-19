import { useEffect, useContext } from 'react'
import RootStoreContext from '../stores/rootStore'

export const useToast = () => {
  const { toastStore } = useContext(RootStoreContext)

  useEffect(() => {
    toastStore.show()
  }, [toastStore.hasToast])
}
