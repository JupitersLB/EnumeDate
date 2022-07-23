import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

const JLBModal: FC<{
  isVisible: boolean
  style?: string
  children: ReactNode
}> = ({ isVisible, style, children }) => {
  const tailwind = useTailwind()

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle={'pageSheet'}
      style={tailwind(style ?? '')}>
      {children}
    </Modal>
  )
}

export default observer(JLBModal)
