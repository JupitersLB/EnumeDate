import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import DropdownList from '../src/components/dropdown/dropdownList'
import { UnitList } from '../src/config/i18n'

describe('Testing that the dropdown list renders correctly', () => {
  const mockSetVisible = jest.fn()
  const mockSetSelectedValue = jest.fn()

  let component: ReturnType<typeof render>

  beforeEach(() => {
    component = render(
      <DropdownList
        placeholder="Select a unit"
        data={UnitList}
        selectedValue={null}
        setVisible={mockSetVisible}
        setSelectedValue={mockSetSelectedValue}
      />
    )
    return component
  })

  test('Renders search input', async () => {
    const { queryByPlaceholderText } = component

    const searchInput = await queryByPlaceholderText('Select a Unit')
    expect(searchInput).toBeTruthy
  })

  test('Renders list of units', async () => {
    const { queryAllByTestId, queryByText } = component

    const allOptions = queryAllByTestId('dropdown_list_item')
    expect(allOptions.length).toEqual(UnitList.length)

    expect(queryByText('Minutes')).toBeTruthy
    expect(queryByText('Hours')).toBeTruthy
    expect(queryByText('Days')).toBeTruthy
    expect(queryByText('Weeks')).toBeTruthy
    expect(queryByText('Months')).toBeTruthy
    expect(queryByText('Years')).toBeTruthy
  })
})
