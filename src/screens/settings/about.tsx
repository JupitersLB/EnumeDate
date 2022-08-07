import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { H1, JLBText } from '../../components/texts'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const About: FC<{}> = ({}) => {
  const { t } = useTranslation()
  const tailwind = useTailwind()

  const handleSocialLink = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open URI: " + url)
      }
    })
  }

  return (
    <SafeAreaView style={tailwind('mx-10 mt-10 flex-1 justify-between')}>
      <View>
        <H1>{t('motivation')}</H1>
        <JLBText style={tailwind('mt-4')}>{t('motivationBodyText')}</JLBText>

        <H1 style={tailwind('mt-10')}>{t('development')}</H1>
        <JLBText style={tailwind('mt-4')}>{t('developmentBodyText')}</JLBText>
      </View>

      <View style={tailwind('flex-row w-full justify-center mb-4')}>
        <TouchableOpacity
          onPress={() =>
            handleSocialLink('https://github.com/JupitersLB/EnumeDate')
          }
          style={tailwind('mr-8')}>
          <Icon name={'logo-github'} size={32} color="#f4a989" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleSocialLink('https://www.linkedin.com/in/jupiters-liam-baker/')
          }>
          <Icon name={'logo-linkedin'} size={32} color="#f4a989" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default observer(About)
