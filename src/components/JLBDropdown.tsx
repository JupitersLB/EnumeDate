import { observer } from 'mobx-react-lite'
import React, { createRef, FC, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { useTailwind } from 'tailwind-rn/dist'
import { JLBText, Label } from './texts'
import Icon from 'react-native-vector-icons/Ionicons'
import JLBModal from './JLBModal'
import DropdownModal from './modals/dropdownModal'
import { useTranslation } from 'react-i18next'

const JLBDropdown: FC<{
  label: string
  placeholder: string
  control: any
  setValue: any
  defaultValue?: { label: string; value: string }
  data?: { label: string; value: string }[]
  calendar?: boolean
  required?: boolean
}> = ({
  control,
  label,
  placeholder,
  setValue,
  calendar,
  data,
  required,
  defaultValue,
}) => {
  const [isVisible, setVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState<{
    label: string
    value: string
  } | null>(null)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const textViewRef = createRef<View>()

  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setValue(label, selectedValue)
  }, [selectedValue])

  const onClear = () => {
    setValue(label, null), setSelectedValue(null)
  }

  return (
    <>
      <View style={tailwind('flex-col justify-start')}>
        <Label style={tailwind('mt-5 mb-2')}>{t(label)}</Label>
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
            render={({ field: { value } }) => (
              <TouchableOpacity
                style={tailwind('flex-row items-center w-full')}
                onPress={() => setVisible(true)}>
                <JLBText
                  style={tailwind(
                    `text-lg py-2 flex-grow ${
                      value ? '' : 'text-gray'
                    } leading-6`
                  )}>
                  {t(value?.label || placeholder)}
                </JLBText>
                {value ? (
                  <TouchableOpacity onPress={onClear}>
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
            rules={{ required: required }}
            defaultValue=""
          />
        </View>
      </View>
      <JLBModal isVisible={isVisible}>
        <DropdownModal
          data={data}
          placeholder="search list"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setVisible={setVisible}
          calendar={calendar}
        />
      </JLBModal>
    </>
  )
}

export default observer(JLBDropdown)
