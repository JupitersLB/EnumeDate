import React, { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTailwind } from 'tailwind-rn/dist'
import RootStoreContext from '../../stores/rootStore'
import { View } from 'react-native'
import { Label } from '../texts'
import { DateTime } from 'luxon'

export const DayHeaders: FC = observer(({}) => {
  const tailwind = useTailwind()
  const { userStore } = useContext(RootStoreContext)

  return (
    <View style={tailwind('flex-row w-full justify-between pt-4')}>
      {[...Array(7).keys()].map((k) => (
        <Label
          testID="day_header"
          key={`day-${k}`}
          style={tailwind('text-center w-1/7')}>
          {DateTime.fromFormat((k + 1).toString(), 'c')
            .setLocale(userStore?.user?.settings.lang || 'en')
            .toFormat('ccc')}
        </Label>
      ))}
    </View>
  )
})
