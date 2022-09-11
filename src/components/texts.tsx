import React, { FC } from 'react'
import { Text, TextProps } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

export const JLBText: FC<TextProps> = ({
  style,
  children,
  testID,
  ...others
}) => {
  return (
    <Text testID={testID} style={{ ...(style as any) }} {...others}>
      {children}
    </Text>
  )
}

export const H1: FC<TextProps> = ({ style, children, testID, ...others }) => {
  const tailwind = useTailwind()

  return (
    <Text
      testID={testID}
      style={{ ...(style as any), ...tailwind('text-xl font-semibold') }}
      {...others}>
      {children}
    </Text>
  )
}

export const H2: FC<TextProps> = ({ style, children, testID, ...others }) => {
  const tailwind = useTailwind()

  return (
    <Text
      testID={testID}
      style={{ ...(style as any), ...tailwind('font-semibold text-lg') }}
      {...others}>
      {children}
    </Text>
  )
}

export const P: React.FC<TextProps> = ({ style, children, ...others }) => {
  const tailwind = useTailwind()
  return (
    <JLBText
      style={{ ...tailwind(`font-normal text-sm`), ...(style as any) }}
      {...others}>
      {children}
    </JLBText>
  )
}

export const Label: FC<TextProps> = ({
  style,
  children,
  testID,
  ...others
}) => {
  const tailwind = useTailwind()

  return (
    <JLBText
      testID={testID}
      style={{
        ...tailwind(`text-gray-600 text-base capitalize`),
        ...(style as any),
      }}
      {...others}>
      {children}
    </JLBText>
  )
}

export const ErrorText: FC<TextProps> = ({ style, children, ...others }) => {
  const tailwind = useTailwind()

  return (
    <JLBText
      style={{ ...tailwind(`pl-2 pt-1 text-danger`), ...(style as any) }}
      {...others}>
      {children}
    </JLBText>
  )
}
