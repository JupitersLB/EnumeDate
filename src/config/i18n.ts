import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18next'
import enTrans from '../public/static/locales/en/common.json'
import hkTrans from '../public/static/locales/zh-HK/common.json'

export enum SupportedUnits {
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export enum SupportedLangs {
  EN = 'en',
  ZHHK = 'zh-hk',
}

export const LangList = [
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇭🇰 繁體中文', value: 'zh-HK' },
]

export const UnitList = [
  { label: 'minutes', value: 'minutes' },
  { label: 'hours', value: 'hours' },
  { label: 'days', value: 'days' },
  { label: 'weeks', value: 'weeks' },
  { label: 'months', value: 'months' },
  { label: 'years', value: 'years' },
]

const bundledResources = {
  en: {
    common: enTrans,
  },
  'zh-HK': {
    common: hkTrans,
  },
}

const config = {
  debug: true,
  fallbackLng: ['en', 'zh-HK'],
  lng: RNLocalize.getLocales()[0].languageTag,
  ns: ['common'],
  interpolation: {
    escapeValue: false, // not needed for react
  },
  resources: bundledResources,
}

i18n.use(initReactI18next).init(config)

export default i18n
