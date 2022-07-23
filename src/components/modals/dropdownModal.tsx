import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Icon from 'react-native-vector-icons/Ionicons'
import DropdownList from '../dropdown/dropdownList'
import DropdownCalendar from '../dropdown/dropdownCalendar'

const DropdownModal: FC<{
  data?: { label: string; value: string }[]
  placeholder: string
  setSelectedValue: (item: any) => void
  setVisible: (isVisible: boolean) => void
  calendar?: boolean
  selectedValue: { label: string; value: string } | null
}> = ({
  data,
  placeholder,
  setSelectedValue,
  setVisible,
  calendar,
  selectedValue,
}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 items-center')}>
      <View style={tailwind('w-full flex-row justify-end')}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View style={tailwind('w-full p-6 pb-3')}>
            <Icon name="close" size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={tailwind('w-full pb-10')}>
        {calendar ? (
          <DropdownCalendar
            selectedDate={selectedValue}
            setVisible={setVisible}
            setSelectedValue={setSelectedValue}
          />
        ) : (
          data && (
            <DropdownList
              data={data}
              placeholder={placeholder}
              setSelectedValue={setSelectedValue}
              setVisible={setVisible}
            />
          )
        )}
      </View>
    </View>
  )
}

export default observer(DropdownModal)
