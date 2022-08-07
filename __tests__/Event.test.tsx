import 'react-native'
import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'

import App from '../App'
import { DateTime } from 'luxon'

describe('Testing Add A New Event', () => {
  let app: ReturnType<typeof render>

  beforeEach(async () => {
    app = render(<App />)

    const eventButton = await screen.findByTestId('add_new_event_button')
    expect(eventButton).toBeTruthy()

    fireEvent.press(eventButton)

    return app
  })

  test('Navigating to add event page', async () => {
    render(<App />)

    const eventButton = await screen.findByTestId('add_new_event_button')
    expect(eventButton).toBeTruthy()

    fireEvent.press(eventButton)

    const formPageHeader = await screen.findByText('Add Event')
    expect(formPageHeader).toBeTruthy()
  })

  test('Filling name input', async () => {
    const nameInput = await screen.findByPlaceholderText('Enter Name')
    expect(nameInput).toBeTruthy()

    fireEvent.changeText(nameInput, 'Wedding Day')
    expect(nameInput.props.value).toBe('Wedding Day')
  })

  test('Filling date input', async () => {
    const calendarDropdown = await screen.findByTestId('calendar_dropdown')
    expect(calendarDropdown).toBeTruthy

    // open calendar
    fireEvent.press(calendarDropdown)

    // select first calendar date
    const firstDate = await screen.findByTestId(`calendar_day_${1}`)
    firstDate && fireEvent.press(firstDate)

    const dateTime = DateTime.fromFormat(
      `${DateTime.now().year} ${1} ${DateTime.now().month}`,
      'y d M'
    )
    const selectedDate = await screen.findByText(
      dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    )

    // check selected date is being displayed
    expect(selectedDate).toBeTruthy

    // confirm date and close modal
    const confButton = await screen.findByText('Confirm')
    expect(confButton).toBeTruthy

    confButton && fireEvent.press(confButton)

    expect(confButton).toBeFalsy
    expect(selectedDate).toBeTruthy
  })

  test('Filling unit input', async () => {
    const unitDropdown = await screen.findByTestId('unit_dropdown')
    expect(unitDropdown).toBeTruthy()

    const dropdownValue = unitDropdown?.props.children[0][0]?.props.children
    expect(dropdownValue).toBe('Days')

    fireEvent.press(unitDropdown)

    const monthUnit = await screen.findByText('Months')
    expect(monthUnit).toBeTruthy

    // modal closes after press
    fireEvent.press(monthUnit)

    // confirm new unit value
    const updatedDropdown = await screen.findByTestId('unit_dropdown')
    const updatedValue = updatedDropdown.props.children[0][0]?.props.children
    expect(updatedValue).toBe('Months')
  })

  test('Create an event', async () => {
    // add name
    const nameInput = await screen.findByPlaceholderText('Enter Name')
    fireEvent.changeText(nameInput, 'Wedding Day')

    // add date
    const calendarDropdown = await screen.findByTestId('calendar_dropdown')
    expect(calendarDropdown).toBeTruthy

    fireEvent.press(calendarDropdown)

    const firstDate = await screen.findByTestId(`calendar_day_${1}`)
    firstDate && fireEvent.press(firstDate)
    const confButton = await screen.findByText('Confirm')
    confButton && fireEvent.press(confButton)

    const dateTime = DateTime.fromFormat(
      `${DateTime.now().year} ${1} ${DateTime.now().month}`,
      'y d M'
    )
    const selectedDate = await screen.findByText(
      dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    )

    // confirm inputs
    const unitDropdown = await screen.findByTestId('unit_dropdown')
    const dropdownValue = unitDropdown?.props.children[0][0]?.props.children

    expect(nameInput.props.value).toBe('Wedding Day')
    expect(selectedDate).toBeTruthy
    expect(dropdownValue).toBe('Days')

    const saveButton = await screen.findByTestId('save_button')
    expect(saveButton).toBeTruthy

    // save form
    fireEvent.press(saveButton)

    // check home page
    const title = screen.findByText('EnumeDate')
    expect(title).toBeTruthy()

    // wait for updates in child components and check event is displayed
    await waitFor(() => {
      const savedEventTitle = screen.findByTestId('event_card_title')
      expect(savedEventTitle).toBeTruthy
      const savedEventDate = screen.findByText(
        `0 Days since ${dateTime.toLocaleString(DateTime.DATE_SHORT)}`
      )
      expect(savedEventDate).toBeTruthy
    })
  })
})
