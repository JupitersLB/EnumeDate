import { observer } from 'mobx-react-lite'
import React, { createRef, FC, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { useTailwind } from 'tailwind-rn/dist'
import { JLBText, Label } from './texts'
import Icon from 'react-native-vector-icons/Ionicons'
import JLBModal from './JLBModal'
import DropdownModal from './modals/dropdownModal'

const JLBDropdown: FC<{
  label: string
  placeholder: string
  control: any
  setValue: any
}> = ({ control, label, placeholder, setValue }) => {
  const [isVisible, setVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const tailwind = useTailwind()
  const textViewRef = createRef<View>()

  useEffect(() => {
    setValue(label, selectedValue)
  }, [selectedValue])

  return (
    <>
      <View style={tailwind('flex-col justify-start')}>
        <Label style={tailwind('mt-5 mb-2')}>{label}</Label>
        <View
          ref={textViewRef}
          style={{
            borderWidth: 1,
            ...tailwind(
              'bg-primary-light opacity-50 border-primary text-center p-2 rounded-md'
            ),
          }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={tailwind('flex-row items-center w-full')}
                onPress={() => setVisible(true)}>
                <JLBText
                  style={tailwind(
                    `text-lg py-2 flex-grow ${
                      value ? '' : 'text-gray'
                    } leading-6`
                  )}>
                  {value?.label || placeholder}
                </JLBText>
                {value ? (
                  <TouchableOpacity onPress={() => setValue(label, null)}>
                    <Icon
                      name="close-circle-outline"
                      size={32}
                      color="#f4a989"
                    />
                  </TouchableOpacity>
                ) : (
                  <Icon name="chevron-down" size={32} color="#f4a989" />
                )}
              </TouchableOpacity>
            )}
            name={label}
            rules={{ maxLength: 300 }}
            defaultValue=""
          />
        </View>
      </View>
      <JLBModal isVisible={isVisible}>
        <DropdownModal
          data={[
            { label: 'English', value: 'en' },
            { label: 'Japanese', value: 'ja' },
          ]}
          placeholder="search list"
          setSelectedValue={setSelectedValue}
          setVisible={setVisible}
        />
      </JLBModal>
    </>
  )
}

export default observer(JLBDropdown)
