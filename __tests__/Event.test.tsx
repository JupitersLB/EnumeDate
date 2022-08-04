import 'react-native'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import App from '../App'
import DropdownCalendar from '../src/components/dropdown/dropdownCalendar'
import { DateTime } from 'luxon'

describe('Testing Add A New Event', () => {
  test('Navigating to add event page', async () => {
    render(<App />)

    const eventButton = await screen.findByTestId('add_new_event_button')
    expect(eventButton).toBeTruthy()

    fireEvent.press(eventButton)

    const formPageHeader = await screen.findByText('Add Event')
    expect(formPageHeader).toBeTruthy()
  })

  test('Filling name input', async () => {
    render(<App />)

    const eventButton = await screen.findByTestId('add_new_event_button')
    expect(eventButton).toBeTruthy()

    fireEvent.press(eventButton)

    const nameInput = await screen.findByPlaceholderText('Enter Name')
    expect(nameInput).toBeTruthy()

    fireEvent.changeText(nameInput, 'Wedding Day')
    expect(nameInput.props.value).toBe('Wedding Day')
  })

  test('Renders calendar', async () => {
    render(<App />)

    const mockSetVisible = jest.fn()
    const mockSetSelectedValue = jest.fn()

    const eventButton = await screen.findByTestId('add_new_event_button')
    expect(eventButton).toBeTruthy()

    fireEvent.press(eventButton)

    const dateDropdown = await screen.findByText('Days')
    expect(dateDropdown).toBeTruthy()

    fireEvent.press(dateDropdown)

    const { queryByText, queryAllByTestId, queryByTestId } = render(
      <DropdownCalendar
        selectedDate={null}
        setVisible={mockSetVisible}
        setSelectedValue={mockSetSelectedValue}
      />
    )

    const dayHeaders = await queryAllByTestId('day_header')
    expect(dayHeaders.length).toBe(7)

    const upMonth = await queryByTestId('up_month')
    expect(upMonth).toBeTruthy()

    const calendarHeader = await queryByTestId('calendar_header_date')
    expect(calendarHeader?.props.children).toBe(
      DateTime.fromFormat(
        `${DateTime.now().year} ${DateTime.now().month}`,
        'y M'
      )
        .setLocale('en')
        .toLocaleString({ month: 'long', year: 'numeric' })
    )

    const days = await queryAllByTestId('calendar_date')
    expect(days.length).toBe(DateTime.now().daysInMonth)
  })
})
