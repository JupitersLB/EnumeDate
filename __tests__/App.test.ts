import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react-native'

import App from '../App'

describe('Testing App Rendering Correctly', () => {
  test('page contains the title', async () => {
    render(App())

    await waitFor(() => {
      const title = screen.findByText('EnumeDate')
      expect(title).toBeTruthy()
    })
  })
})
