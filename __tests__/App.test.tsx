import 'react-native'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import App from '../App'

describe('Testing App Rendering Correctly', () => {
  test('Page contains the title', async () => {
    render(<App />)

    const title = screen.findByText('EnumeDate')
    expect(title).toBeTruthy()
  })

  test('Page contains the tab navigator', async () => {
    render(<App />)

    const homeTab = screen.findByText('Home')
    const settingsTab = screen.findByText('Settings')

    expect(homeTab).toBeTruthy()
    expect(settingsTab).toBeTruthy()
  })

  test('Home screen can navigate to the Settings screen', async () => {
    render(<App />)
    const settingsTab = await screen.findByText('Settings')

    fireEvent.press(settingsTab)

    const preferencesButton = await screen.findByText('Preferences')
    expect(preferencesButton).toBeTruthy
  })
})
