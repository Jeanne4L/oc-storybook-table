import { render } from "@testing-library/react"
import { vi } from "vitest"

import Table from ".."

describe('Toolbar', () => {
  test('must be called inside table', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <Table.Toolbar />
      )
    }).toThrow('Table.Toolbar must be inside Table')

    consoleError.mockRestore()
  })
})