import { describe, test } from "vitest"
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { columns, data } from "../../App"
import Table from "."

type RenderTableType = {
  rowActions?: any[] 
  withoutData?: boolean
}
const renderTable = ({ rowActions, withoutData }: RenderTableType) => {
  const entriesSelectOptions = [3, 5]

  return (
    <Table columns={columns} data={withoutData ? [] : data} entriesSelectOptions={entriesSelectOptions} rowActions={rowActions}>
      <Table.Toolbar>
        <Table.EntriesSelector />
        <Table.SearchBar />
      </Table.Toolbar>
      <Table.Content>
        <Table.Head />
        <Table.Body />
      </Table.Content>
      <Table.Pagination />
    </Table>
  )
}

const beginningGlobalActions: any[] = [
  {
    scope: 'global',
    placement: 'beginning',
    action: () => <span onClick={() => console.log('all data deleted')}>🗑️</span>
  }
]

const endRowActions: any[] = [
  {
    scope: 'row',
    placement: 'end',
    action: (row: any) => <span onClick={() => console.log(`row ${row.index} validated`)}>✅</span>
  }
]

describe('Table', () => {
  test('display a message if there is no data', () => {
    render(renderTable({ withoutData: true }))

    const message = screen.getByTestId('empty-message')

    expect(message).toBeInTheDocument()
  })

  test('contains 3 rows', () => {
    render(renderTable({}))

    const rows = screen.getAllByTestId('table-row')

    expect(rows.length).toEqual(3)
  })

  test('changing the number of entries updates the table', ()=> {
    render(renderTable({}))

    const selector = screen.getByTestId('entries-selector')

    fireEvent.change(selector, {target: {value: 5}})

    const rows = screen.getAllByTestId('table-row')

    expect(rows.length).toEqual(5)
  })

  test('searching filters not corresponding data', () => {
    render(renderTable({}))

    const searchBar = screen.getByTestId('search-bar')

    fireEvent.change(searchBar, {target: {value: 'jane'}})

    const rows = screen.getAllByTestId('table-row')

    expect(rows.length).toEqual(1)
  })

  test('changing page updates the table', () => {
    render(renderTable({}))

    const firstPageRows = screen.getAllByTestId('table-row').map((row) => row.textContent)
    const pageNumbers = screen.getAllByTestId('pagination-item')

    fireEvent.click(pageNumbers[1])

    const secondPageRows = screen.getAllByTestId('table-row').map((row) => row.textContent)
    
    expect(secondPageRows).not.toEqual(firstPageRows)
  })

  test('sorting reorganized the rows', () => {
    render(renderTable({}))
        
    const getColumnValues = (index: number) => {
      const rows = screen.getAllByTestId('table-row').map(row =>
        Array.from(row.querySelectorAll('td')).map(cell => cell.textContent)
      )
      
      return rows.map((row) => row[index])
    }

    expect(getColumnValues(0)).toEqual(['John', 'Jane', 'Tahiti'])
    
    const sortButtons = screen.getAllByTestId('sort-button')

    // SORT BY NAME
    fireEvent.click(sortButtons[0])
    expect(getColumnValues(0)).toEqual(['Charlie', 'Henry', 'Jane'])

    fireEvent.click(sortButtons[0])
    expect(getColumnValues(0)).toEqual(['Tahiti', 'John', 'Jane'])

    // SORT BY NUMBER
    fireEvent.click(sortButtons[2])
    expect(getColumnValues(2)).toEqual(['8', '12', '500'])

    fireEvent.click(sortButtons[2])
    expect(getColumnValues(2)).toEqual(['3829', '568', '500'])

    // SORT BY DATE
    const getStringDate = (date: string) => {
      return new Date(date).toISOString()
    }

    fireEvent.click(sortButtons[3])
    const ascExpected = [getStringDate('952-08-13'), getStringDate('1993-08-19'), getStringDate('1997-10-12')]
    expect(getColumnValues(3)).toEqual(ascExpected)

    fireEvent.click(sortButtons[3])
    const descExpected = [getStringDate('2025-08-13'), getStringDate('2000-03-18'), getStringDate('1997-10-12')]
    expect(getColumnValues(3)).toEqual(descExpected)
  })

  test.each([
    [
      'beginning', 
      'first', 
      beginningGlobalActions, 
      ['🗑️', 'John', 'Smith', '500', new Date('2000-03-18').toISOString()]
    ],
    [
      'end', 
      'last', 
      endRowActions, 
      ['John', 'Smith', '500', new Date('2000-03-18').toISOString(), '✅']
    ]
  ])('"%s" actions are placed %s', (type, placement, rowActions, expected) => {
    render(renderTable({ rowActions }))

    const [firstRow] = screen.getAllByTestId('table-row')
    const content = Array.from(firstRow.querySelectorAll('td')).map(cell => cell.textContent)

    expect(content).toEqual(expected)
  })
})