import { vi } from "vitest"
import { render } from "@testing-library/react"

import Table from "../.."

describe('TableHead', () => {
  test('must be called inside table content', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <Table columns={[]} data={[]}>
          <Table.Head />
        </Table>
      )
    }).toThrow('Table.Head must be inside Table.Content')

    consoleError.mockRestore()
  })
})