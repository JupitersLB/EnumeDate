import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { useEmailLinkEffect } from '../../hooks/useEmailLinkEffect'
import { JLBText } from '../texts'

const EmailLinkHandler: FC<{}> = ({}) => {
  const { loading, error } = useEmailLinkEffect()
  const tailwind = useTailwind()

  // Show an overlay with a loading indicator while the email link is processed
  if (loading || error) {
    return (
      <View style={tailwind('w-full flex-row justify-center items-center')}>
        {error && <JLBText>{error}</JLBText>}
        {loading && <ActivityIndicator />}
      </View>
    )
  }

  // Hide otherwise. Or show some content if you are using this as a separate screen
  return null
}

export default observer(EmailLinkHandler)
