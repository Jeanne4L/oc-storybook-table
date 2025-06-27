import { render } from "@testing-library/react"
import { vi } from "vitest"

import Table from ".."

describe('TableContent', () => {
  test('must be called inside the table', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
     render(
        <Table.Content />
      ) 
    }).toThrow('Table.Content must be inside Table')

    consoleError.mockRestore()
  })
})