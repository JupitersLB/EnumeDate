import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTailwind } from 'tailwind-rn/dist'
import { H1 } from '../texts'

export const SettingsListItem: FC<{
  title: string
  iconName: string
  onPress: () => void
}> = observer(({ title, iconName, onPress }) => {
  const { t } = useTranslation()
  const tailwind = useTailwind()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind(
        'flex-row border-b border-secondary items-center py-3 w-full'
      )}>
      <Icon name={iconName} size={32} color="#89D4F4" />
      <H1 style={tailwind('ml-5 capitalize')}>{t(title)}</H1>
    </TouchableOpacity>
  )
})
