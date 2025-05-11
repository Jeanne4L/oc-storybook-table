import { render, screen } from "@testing-library/react"

import RowsPerPageSelector from "../../../components/RowsPerPageSelector"
import { TableContextType, TableContext } from "../../../context/Table"
import Table from ".."


describe('Pagination', () => {
  // test('should be hidden if there is only one page', () => {
  //   const mockContext = {
  //     totalItems: 4,
  //     itemsPerPage: 5,
  //     currentPage: 0
  //   } as unknown as TableContextType<any>
    
  //   render(
  //       <Table columns={[]} data={[]}>
  //         <Table.Toolbar>
  //           <RowsPerPageSelector />
  //         </Table.Toolbar>
  //       </Table>
  //   )

  //   expect(screen.getByTestId('pagination').)
  // })
})