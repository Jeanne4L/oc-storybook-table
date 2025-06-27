import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { vi } from "vitest"

import { columns, data } from "../../../App"
import Table from ".."

describe('Pagination', () => {
  test('must be called inside the table', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<Table.Pagination />)
    }).toThrow('Table.Pagination must be inside Table')

    consoleError.mockRestore()
  })

  test('should be hidden if there is only one page', () => {
    render(
      <Table columns={[]} data={[]}>
        <Table.Toolbar>
          <Table.Pagination />
        </Table.Toolbar>
      </Table>
    )

    const pagination = screen.queryByTestId('pagination')
    expect(pagination).not.toBeInTheDocument()
  })

  test('buttons are disabled when there is no previous or next page', () => {
    render(
      <Table columns={columns} data={data} entriesSelectOptions={[2]}>
        <Table.Toolbar>
          <Table.Pagination />
        </Table.Toolbar>
      </Table>
    )

    const previousChevron = screen.getByTestId('previous')

    expect(getComputedStyle(previousChevron).opacity).toBe('0.2')
    // TODO  check next is disabled
  })

  test('use ellipsis if there are too many pages', () => {
    const mockedData = {
      id:"mock",
      firstName: "Jim",
      lastName: "Jane",
      remainingTime: 5,
      date: new Date('1810-08-19').toISOString()
    }
    
    const filledData = [...data, ...new Array(8 - data.length).fill(mockedData)]

    render(
      <Table columns={columns} data={filledData} entriesSelectOptions={[1]}>
        <Table.Toolbar>
          <Table.Pagination />
        </Table.Toolbar>
      </Table>
    )

    const ellipsis = screen.getByTestId('ellipsis')

    expect(ellipsis).toBeInTheDocument()
  })
})