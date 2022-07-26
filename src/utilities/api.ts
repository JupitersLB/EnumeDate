import axios, { AxiosPromise } from 'axios'
import Config from 'react-native-config'
import VersionNumber from 'react-native-version-number'
import { Platform } from 'react-native'
import { readConfig } from '../config/secureStorage'

export function callApi<T>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: {},
  token?: string
): AxiosPromise<T> {
  let baseUrl = Config.API_HOST
  return readConfig('token').then((storedToken) => {
    const config: any = {
      Authorization: `Bearer ${token || storedToken}`,
      Accept: 'application/json',
    }
    if (Platform.OS === 'ios') {
      config['X-ENUMEDATE-IOS-VERSION'] = VersionNumber.appVersion
      config['X-ENUMEDATE-IOS-BUILD'] = VersionNumber.buildVersion
    } else if (Platform.OS === 'android') {
      config['X-ENUMEDATE-ANDROID-VERSION'] = VersionNumber.appVersion
      config['X-ENUMEDATE-ANDROID-BUILD'] = VersionNumber.buildVersion
    }
    return axios.request<T>({
      method: method,
      url: `${baseUrl}${path}`,
      data: data || undefined,
      headers: config,
    })
  })
}
