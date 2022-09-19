import EncryptedStorage from 'react-native-encrypted-storage'

export const saveConfig = (key: string, value: string) =>
  EncryptedStorage.setItem(key, JSON.stringify(value))

export const readConfig = async (key: string) => {
  let result = await EncryptedStorage.getItem(key)
  if (result) {
    return result
  }
  return null
}

export const deleteConfig = (key: string) => EncryptedStorage.removeItem(key)

export const clearAll = () => EncryptedStorage.clear()
