import { render } from "@testing-library/react"
import { vi } from "vitest"

import Table from "../.."

describe('TableBody', () => {
  test('must be called inside the table', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <Table columns={[]} data={[]}>
          <Table.Body />
        </Table>
      )
    }).toThrow('Table.Body must be inside Table.Content')

    consoleError.mockRestore()
  })
})