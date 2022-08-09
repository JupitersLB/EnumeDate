import React, { useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links'
import RootStoreContext from '../stores/rootStore'

export const useEmailLinkEffect = () => {
  const { userStore } = useContext(RootStoreContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleDynamicLink = async (
      link: FirebaseDynamicLinksTypes.DynamicLink
    ) => {
      // Check and handle if the link is a email login link
      if (auth().isSignInWithEmailLink(link.url)) {
        setLoading(true)
        const email = userStore.user?.email
        email &&
          auth()
            .signInWithEmailLink(email, link.url)
            .then((r) => console.log('sign in response: ', r))
            .catch((e) => setError(e))
            .finally(() => setLoading(false))
      }
    }

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)

    /* When the app is not running and is launched by a magic link the `onLink`
        method won't fire, we can handle the app being launched by a magic link like this */
    dynamicLinks()
      .getInitialLink()
      .then((link) => link && handleDynamicLink(link))

    // When the component is unmounted, remove the listener
    return () => unsubscribe()
  }, [])

  return { error, loading }
}
