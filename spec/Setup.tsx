import 'react-native'
import React from 'react'
import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import * as ReactNative from 'react-native'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'GB',
      languageTag: 'en-GB',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'FR',
      languageTag: 'fr-FR',
      languageCode: 'fr',
      isRTL: false,
    },
  ],

  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),

  getCalendar: () => 'gregorian', // or "japanese", "buddhist"
  getCountry: () => 'US', // the country code you want
  getCurrencies: () => ['USD', 'EUR'], // can be empty array
  getTemperatureUnit: () => 'celsius', // or "fahrenheit"
  getTimeZone: () => 'Europe/Paris', // the timezone you want
  uses24HourClock: () => true,
  usesMetricSystem: () => true,

  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}))

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('tailwind-rn', () => {
  const tsStyles = require('../tailwind.json')
  const TailwindProvider = ({ children }: { children: JSX.Element }) => children

  const cleanKey = (object: { [key: string]: string }, key: string) => {
    Object.defineProperty(
      object,
      'opacity',
      Object.getOwnPropertyDescriptor(object, key)
    )
    delete object[key]
    return object
  }

  const cleanValue = (object: { [key: string]: string }, key: string) => {
    const matchColor =
      /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)/
    const match = matchColor.exec(object[key])

    if (match !== null) {
      const color = `${match[0]})`

      object[key] = color.replace(/ /g, ',')
    }
    return object
  }

  const cleanObject = (object: { [key: string]: string }, key: string) => {
    const invalid = '--tw-text-opacity'
    if (key === invalid) {
      cleanKey(object, key)
    }

    if (new RegExp(invalid).test(object[key])) {
      cleanValue(object, key)
    }
    return object
  }

  const useTailwind = () => (str: string) => {
    const strs = str.split(' ')
    const styles = strs.map((s) => s && tsStyles[s]?.['style'])
    const styleObject = styles.reduce((r, c) => Object.assign(r, c), {})
    const cleanedStyles = Object.keys(styleObject).map((k) =>
      cleanObject(styleObject, k)
    )
    return cleanedStyles.reduce((r, c) => Object.assign(r, c), {})
  }

  return { TailwindProvider, useTailwind }
})

jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal')
  // @ts-ignore
  return (props) => <Modal {...props} />
})

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('@react-native-firebase/crashlytics', () =>
  jest.fn().mockImplementation(() => ({
    log: jest.fn(),
    recordError: jest.fn(),
  }))
)

jest.mock('@react-native-firebase/dynamic-links', () => {
  return () => {
    return {
      getInitialLink: jest.fn(() => Promise.resolve()),
      onLink: jest.fn(),
    }
  }
})

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: jest.fn((cb) =>
      cb({ name: 'Shaun', getIdToken: () => Promise.resolve('245632514353') })
    ),
    signInAnonymously: jest.fn(),
  })
})

jest.mock('react-native-encrypted-storage', () => {
  return {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve('{ "foo": 1 }')),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  }
})
