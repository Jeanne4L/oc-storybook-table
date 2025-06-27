import { render } from "@testing-library/react"
import { vi } from "vitest"

import Table from "../../parts/Table"

describe('search bar', () => {
  test('must be called inside the toolbar', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <Table columns={[]} data={[]}>
          <Table.SearchBar />
        </Table>
      )
    }).toThrow('Table.SearchBar must be inside Table.Toolbar')

    consoleError.mockRestore()
  })
})