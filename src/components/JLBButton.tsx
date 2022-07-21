import React, { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { Text, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

const JLBButton: FC<{
  type: 'solid' | 'outline'
  style?: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'danger'
  onPress?: () => void
  children: ReactNode
}> = ({ type, style, onPress, disabled, color, children }) => {
  const tailwind = useTailwind()

  const bgColor = clsx({
    'bg-primary': type === 'solid' && color === 'primary' && !disabled,
    'bg-transparent border-2 border-primary':
      type === 'outline' && color === 'primary' && !disabled,
    'bg-primary-light': type === 'solid' && color === 'primary' && disabled,
    'bg-transparent border-2 border-primary-light':
      type === 'outline' && color === 'primary' && disabled,

    'bg-secondary': type === 'solid' && color === 'secondary' && disabled,
    'bg-transparent border-2 border-secondary':
      type === 'outline' && color === 'secondary' && disabled,
    'bg-secondary-light':
      type === 'solid' && color === 'secondary' && !disabled,
    'bg-transparent border-2 border-secondary-light':
      type === 'outline' && color === 'secondary' && !disabled,

    'bg-danger': type === 'solid' && color === 'danger',
    'bg-transparent border-2 border-danger':
      type === 'outline' && color === 'danger',
  })

  const textColor = clsx({
    'text-white': type === 'solid',
    'text-primary': type === 'outline' && color === 'primary',
    'text-secondary': type === 'outline' && color === 'secondary',
    'text-danger': type === 'outline' && color === 'danger',
  })

  const opacity = clsx({
    'opacity-50': disabled,
    'opacity-100': !disabled,
  })

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tailwind(
        `flex items-center rounded-xl ${opacity} px-5 py-4 ${bgColor} ${
          style ? style : ''
        }`
      )}>
      <Text style={tailwind(`font-semibold text-lg ${textColor}`)}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default observer(JLBButton)
