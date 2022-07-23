import { observer } from 'mobx-react-lite'
import React, { createRef, FC, useState } from 'react'
import { FlatList, TextInput, View, TouchableOpacity } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Icon from 'react-native-vector-icons/Ionicons'
import { JLBText } from '../texts'

const DropdownModal: FC<{
  data: { label: string; value: string }[]
  placeholder: string
  setSelectedValue: (item: any) => void
  setVisible: (isVisible: boolean) => void
}> = ({ data, placeholder, setSelectedValue, setVisible }) => {
  const [filteredData, setFilteredData] = useState<any[] | null>(null)
  const textInputRef = createRef<TextInput>()
  const tailwind = useTailwind()

  const onSearch = (search: string) => {
    if (search === '') return setFilteredData(null)
    setFilteredData(
      data.filter((d) => d.label.toLowerCase().includes(search.toLowerCase()))
    )
  }

  const onListItem = (item: any) => {
    setSelectedValue(item)
    setVisible(false)
  }

  const onClear = () => {
    setFilteredData(null)
    textInputRef.current?.clear()
  }

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
        <FlatList
          style={tailwind('h-2/3')}
          contentContainerStyle={tailwind('pb-10 px-10')}
          ListHeaderComponent={
            <View
              style={{
                borderWidth: 1,
                ...tailwind(
                  'bg-primary-light mb-4 flex-row items-center opacity-50 border-primary text-center p-2 rounded-md'
                ),
              }}>
              <TextInput
                style={tailwind('text-lg py-2 flex-grow leading-6')}
                ref={textInputRef}
                onChangeText={onSearch}
                multiline
                blurOnSubmit={true}
                autoCorrect
                placeholder={placeholder}
                placeholderTextColor={'#868383'}
              />
              <TouchableOpacity onPress={onClear}>
                <Icon name="close-circle-outline" size={32} color="#f4a989" />
              </TouchableOpacity>
            </View>
          }
          data={filteredData || data}
          keyExtractor={(data) => data.value}
          renderItem={(data) => (
            <TouchableOpacity
              style={tailwind('py-3')}
              onPress={() => onListItem(data.item)}>
              <JLBText style={tailwind('text-xl')}>{data.item.label}</JLBText>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View
              style={tailwind(
                'h-full my-14 flex-row items-center justify-center'
              )}>
              <Icon name="sad-outline" size={64} color="#f4a989" />
            </View>
          }
        />
      </View>
    </View>
  )
}

export default observer(DropdownModal)
