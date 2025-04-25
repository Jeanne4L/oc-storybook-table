import { ReactNode } from "react"

import Table from ".."
import { ScrollContainer, TableContainer } from "./styles"

export type TableContentProps = {
  children: ReactNode
}

const TableContent: React.FC<TableContentProps> = ({ children }) => {
  return (
    <ScrollContainer>
      <TableContainer>
        {children}
      </TableContainer>
    </ScrollContainer>
  )
}

export default Table.Content = TableContent