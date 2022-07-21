import React, { FC, useContext } from 'react'
import { SafeAreaView, View } from 'react-native'
import { HomeNavigationProps, HomeRouteProps } from '../types/navigation'
import { useTailwind } from 'tailwind-rn'
import RootStoreContext from '../stores/rootStore'
import JLBButton from '../components/JLBButton'
import { P } from '../components/texts'
import JLBInput from '../components/JLBInput'
import { useForm } from 'react-hook-form'

const Home: FC<{ navigation: HomeNavigationProps; route: HomeRouteProps }> = ({
  navigation,
  route,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>()
  const { userStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()

  const onSubmit = (data: { name: string }) => {
    console.log('form input: ', data.name)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 mx-10 justify-between')}>
      <P style={tailwind('text-blue-600')}>EnumeDate</P>
      <View>
        <JLBInput
          label="name"
          control={control}
          errors={errors}
          placeholder="enter name"
        />

        <JLBButton
          type="solid"
          color="primary"
          style={'mt-6'}
          onPress={handleSubmit(onSubmit)}>
          Submit
        </JLBButton>
      </View>

      <JLBButton
        type="solid"
        color="primary"
        onPress={() => navigation.push('Settings')}>
        Settings
      </JLBButton>
    </SafeAreaView>
  )
}

export default Home
