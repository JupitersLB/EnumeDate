import React, { useContext, FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Text, TouchableOpacity, View } from 'react-native'
import RootStoreContext from '../../stores/rootStore'
import { useTailwind } from 'tailwind-rn/dist'
import {
  DetachedModalNavigationProps,
  DetachedModalRouteProps,
} from '../../types/navigation'
import { ConfirmationModal } from '../../components/modals/confirmationModal'
import { useTranslation } from 'react-i18next'

const JLBDetachedModal: FC<{
  navigation: DetachedModalNavigationProps
  route: DetachedModalRouteProps
}> = ({ navigation, route }) => {
  const { uiStore } = useContext(RootStoreContext)
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const modalType = route.params.modalType
  const modalContent = route.params.modalConent

  const ModalContent = {
    confirmation: (
      <ConfirmationModal
        title={t(`${modalContent}.title`)}
        description={t(`${modalContent}.description`)}
      />
    ),
  }[modalType]

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.goBack()}
      style={tailwind('flex-1 px-8 h-full w-full items-center justify-center')}>
      <View
        style={tailwind(
          'bg-white w-full flex items-center justify-center py-6 px-4 rounded-xl'
        )}>
        {ModalContent}
      </View>
    </TouchableOpacity>
  )
}

export default observer(JLBDetachedModal)
