import 'react-native'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import App from '../App'

describe('Testing App Can Change Language', () => {
  test('Home screen can navigate to the Settings screen', async () => {
    render(<App />)
    const settingsTab = await screen.findByText('Settings')
    fireEvent.press(settingsTab)

    const languageButton = await screen.findByText('Change language')
    expect(languageButton).toBeTruthy()
  })

  test('Settings screen can open language dropdown', async () => {
    render(<App />)
    const settingsTab = await screen.findByText('Settings')
    fireEvent.press(settingsTab)

    const languageDropdown = await screen.findByText('Select a Language')
    expect(languageDropdown).toBeTruthy()

    fireEvent.press(languageDropdown)

    const chineseChoice = await screen.findByText('🇭🇰 繁體中文')
    expect(chineseChoice).toBeTruthy()

    fireEvent.press(chineseChoice)

    const languageButton = await screen.findByText('Change language')
    expect(languageButton).toBeTruthy()

    fireEvent.press(languageButton)

    const languageButtonChinese = await screen.findByText('更改語言')
    expect(languageButtonChinese).toBeTruthy()
  })
})
