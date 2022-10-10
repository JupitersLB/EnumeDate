import React, { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { H2 } from './texts'

const JLBButton: FC<{
  type: 'solid' | 'outline'
  style?: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'danger'
  onPress?: () => void
  testID?: string
  iconName?: string
  children: ReactNode
}> = ({
  type,
  style,
  onPress,
  disabled,
  color,
  children,
  testID,
  iconName,
}) => {
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

  const iconColor = clsx({
    '#fff': type === 'solid',
    '#f4a989': type === 'outline' && color === 'primary',
    '#89D4F4': type === 'outline' && color === 'secondary',
    '#F4899E': type === 'outline' && color === 'danger',
  })

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={tailwind(
        `flex-row items-center justify-center rounded-xl ${textColor} ${opacity} px-5 py-4 ${bgColor} ${
          style ? style : ''
        }`
      )}>
      {iconName && (
        <Icon
          style={tailwind('mr-4')}
          name={iconName}
          size={32}
          color={iconColor}
        />
      )}
      <H2 style={tailwind(textColor)}>{children}</H2>
    </TouchableOpacity>
  )
}

export default observer(JLBButton)
