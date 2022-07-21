import React, { FC } from 'react'
import { Text, TextProps } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

export const JLBText: FC<TextProps> = ({ style, children, ...others }) => {
  return (
    <Text style={{ ...(style as any) }} {...others}>
      {children}
    </Text>
  )
}

export const P: React.FC<TextProps> = ({ style, children, ...others }) => {
  const tailwind = useTailwind()
  return (
    <JLBText
      style={{ ...tailwind(`font-regular text-sm`), ...(style as any) }}
      {...others}>
      {children}
    </JLBText>
  )
}
