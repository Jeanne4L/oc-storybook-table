import { PropsWithChildren } from "react"

import { ContentContext } from "../../../context/Content"
import { useTable } from "../../../context/Table"
import { ScrollContainer, TableContainer } from "./styles"

const value = { isInsideContent: true }

const TableContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { isInsideTable, colors } = useTable()

  if(!isInsideTable) {
    throw new Error('Table.Content must be inside Table')
  }

  return (
    <ContentContext.Provider value={value}>
      <ScrollContainer>
        <TableContainer borderColor={colors.borderColor}>
          {children}
        </TableContainer>
      </ScrollContainer>
    </ContentContext.Provider>
  )
}

export default TableContent