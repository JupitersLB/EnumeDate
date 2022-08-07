import 'react-native'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import App from '../App'

describe('Testing App Can Change Language', () => {
  let app: ReturnType<typeof render>

  beforeEach(async () => {
    app = render(<App />)

    const settingsTab = await screen.findByText('Settings')
    fireEvent.press(settingsTab)

    return app
  })

  test('Home screen can navigate to the Settings screen', async () => {
    const preferencesButton = await screen.findByText('Preferences')
    expect(preferencesButton).toBeTruthy
  })

  test('Settings screen can navigate to the preferences screen', async () => {
    const preferencesButton = await screen.findByText('Preferences')
    expect(preferencesButton).toBeTruthy

    fireEvent.press(preferencesButton)

    const languageDropdown = await screen.findByTestId('language_dropdown')
    expect(languageDropdown).toBeTruthy()
  })

  test('Settings screen can open language dropdown', async () => {
    const preferencesButton = await screen.findByText('Preferences')
    expect(preferencesButton).toBeTruthy

    fireEvent.press(preferencesButton)

    const languageDropdown = await screen.findByTestId('language_dropdown')
    expect(languageDropdown).toBeTruthy()

    fireEvent.press(languageDropdown)

    const chineseChoice = await screen.findByText('🇭🇰 繁體中文')
    expect(chineseChoice).toBeTruthy()

    fireEvent.press(chineseChoice)

    const languageButton = await screen.findByText('Save')
    expect(languageButton).toBeTruthy()

    fireEvent.press(languageButton)

    const languageButtonChinese = await screen.findByText('語言')
    expect(languageButtonChinese).toBeTruthy()
  })
})
