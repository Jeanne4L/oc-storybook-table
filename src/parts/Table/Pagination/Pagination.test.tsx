import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'

import Table from ".."

describe('Pagination', () => {
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
})