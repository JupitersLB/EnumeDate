import { observer } from 'mobx-react-lite'
import React, { createRef, FC } from 'react'
import { View, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { useTailwind } from 'tailwind-rn/dist'
import { ErrorText, Label } from './texts'
import { useTranslation } from 'react-i18next'

const JLBInput: FC<{
  label: string
  placeholder: string
  control: any
  errors: any
  required?: boolean
}> = ({ control, errors, label, placeholder, required }) => {
  const { t } = useTranslation()
  const tailwind = useTailwind()
  const textViewRef = createRef<View>()

  return (
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
          render={({ field: { onChange, value } }) => (
            <View style={tailwind('flex-row items-center')}>
              <TextInput
                style={tailwind('text-lg py-2 w-full leading-6')}
                onChangeText={(val) => onChange(val)}
                value={value}
                multiline
                blurOnSubmit={true}
                onBlur={() => {
                  if (textViewRef.current)
                    textViewRef.current.setNativeProps({
                      style: { borderWidth: 1, borderColr: '#89D4F4' },
                    })
                }}
                onFocus={() => {
                  if (textViewRef.current)
                    textViewRef.current.setNativeProps({
                      style: { borderWidth: 2, borderColor: '#15A2DF' },
                    })
                }}
                autoCorrect
                placeholder={placeholder}
                placeholderTextColor={'#868383'}
              />
            </View>
          )}
          name={label}
          rules={{ maxLength: 300, required: required }}
          defaultValue=""
        />
      </View>
      {errors[label]?.maxLength && <ErrorText> {t('Too Long')}</ErrorText>}
    </View>
  )
}

export default observer(JLBInput)
