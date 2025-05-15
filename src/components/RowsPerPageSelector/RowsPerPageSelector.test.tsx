import { beforeEach, describe, expect, test } from "vitest"
import { render, screen, within } from "@testing-library/react"
import '@testing-library/jest-dom'

import { TableContextType } from "../../context/Table"
import Table from "../../parts/Table"

const mockContext = {
  entriesSelectOptions: [10, 25, 50]
} as unknown as TableContextType<any>

describe('select', () => {
  beforeEach(() => {
    render(
      <Table columns={[]} data={[]} entriesSelectOptions={mockContext.entriesSelectOptions}>
        <Table.Toolbar>
          <Table.EntriesSelector />
        </Table.Toolbar>
      </Table>
    )
  })

  test('should return the correct options', () => {
    const select = screen.getByRole('combobox')
    const options = within(select).getAllByRole('option')

    expect(options.length).toBe(3)

    mockContext.entriesSelectOptions.forEach((value, index) => {
      expect(options[index]).toHaveValue(String(value))
    })
  })
})