import 'react-native'
import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import DropdownCalendar from '../src/components/dropdown/dropdownCalendar'
import { DateTime } from 'luxon'

describe('Testing that the calendar renders properly', () => {
  const mockSetVisible = jest.fn()
  const mockSetSelectedValue = jest.fn()

  let component: ReturnType<typeof render>

  beforeEach(() => {
    component = render(
      <DropdownCalendar
        selectedDate={null}
        setVisible={mockSetVisible}
        setSelectedValue={mockSetSelectedValue}
      />
    )
    return component
  })

  test('Renders monther and year', async () => {
    const { queryByTestId } = component

    const calendarHeader = await queryByTestId('calendar_header_date')
    expect(calendarHeader?.props.children).toBe(
      DateTime.fromFormat(
        `${DateTime.now().year} ${DateTime.now().month}`,
        'y M'
      )
        .setLocale('en')
        .toLocaleString({ month: 'long', year: 'numeric' })
    )
  })

  test('Renders days of the week header', async () => {
    const { queryAllByTestId } = component

    const dayHeaders = await queryAllByTestId('day_header')
    expect(dayHeaders.length).toBe(7)
  })

  test('Renders the dates of the month', async () => {
    const { queryAllByTestId } = component

    const days = await queryAllByTestId('calendar_date')
    expect(days.length).toBe(DateTime.now().daysInMonth)
  })

  test('Up arrow moves the month up one', async () => {
    const { queryByTestId } = component

    const calendarHeader = await queryByTestId('calendar_header_date')
    expect(calendarHeader?.props.children).toBe(
      DateTime.fromFormat(
        `${DateTime.now().year} ${DateTime.now().month}`,
        'y M'
      )
        .setLocale('en')
        .toLocaleString({ month: 'long', year: 'numeric' })
    )

    const upMonth = await queryByTestId('up_month')
    expect(upMonth).toBeTruthy()

    if (upMonth) {
      fireEvent.press(upMonth)
      expect(calendarHeader?.props.children).toBe(
        DateTime.fromFormat(
          `${DateTime.now().year} ${DateTime.now().month + 1}`,
          'y M'
        )
          .setLocale('en')
          .toLocaleString({ month: 'long', year: 'numeric' })
      )
    }
  })

  test('Down arrow moves the month down one', async () => {
    const { queryByTestId } = component

    const calendarHeader = await queryByTestId('calendar_header_date')
    expect(calendarHeader?.props.children).toBe(
      DateTime.fromFormat(
        `${DateTime.now().year} ${DateTime.now().month}`,
        'y M'
      )
        .setLocale('en')
        .toLocaleString({ month: 'long', year: 'numeric' })
    )

    const downMonth = await queryByTestId('down_month')
    expect(downMonth).toBeTruthy()

    if (downMonth) {
      fireEvent.press(downMonth)
      expect(calendarHeader?.props.children).toBe(
        DateTime.fromFormat(
          `${DateTime.now().year} ${DateTime.now().month - 1}`,
          'y M'
        )
          .setLocale('en')
          .toLocaleString({ month: 'long', year: 'numeric' })
      )
    }
  })

  test('Up arrow 12 times increase the year', async () => {
    const { queryByTestId } = component

    const calendarHeader = await queryByTestId('calendar_header_date')
    expect(calendarHeader?.props.children).toBe(
      DateTime.fromFormat(
        `${DateTime.now().year} ${DateTime.now().month}`,
        'y M'
      )
        .setLocale('en')
        .toLocaleString({ month: 'long', year: 'numeric' })
    )

    const upMonth = await queryByTestId('up_month')
    expect(upMonth).toBeTruthy()

    if (upMonth) {
      for (let i = 0; i < 12; i++) {
        fireEvent.press(upMonth)
      }

      expect(calendarHeader?.props.children).toBe(
        DateTime.fromFormat(
          `${DateTime.now().year + 1} ${DateTime.now().month}`,
          'y M'
        )
          .setLocale('en')
          .toLocaleString({ month: 'long', year: 'numeric' })
      )
    }
  })

  test('Todays date should be highlighted', async () => {
    const { queryByTestId } = component

    const today = await queryByTestId(`calendar_day_${DateTime.now().day}`)
    expect(today).toBeTruthy()
    expect(today?.props.style.backgroundColor).toBe(
      'rgb(244 169 137 / var(--tw-bg-opacity))'
    )
  })

  test('Can select a date', async () => {
    const { queryByTestId, queryByText } = component

    const dateTime = DateTime.fromFormat(
      `${DateTime.now().year} ${1} ${DateTime.now().month}`,
      'y d M'
    )
    const selectedDate = await queryByText(
      dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    )

    expect(selectedDate).toBeFalsy

    const firstDate = await queryByTestId(`calendar_day_${1}`)
    expect(firstDate).toBeTruthy()

    firstDate && fireEvent.press(firstDate)

    expect(selectedDate).toBeTruthy
    expect(firstDate?.props.style.backgroundColor).toBe(
      'rgb(137 212 244 / var(--tw-bg-opacity))'
    )
  })
})
