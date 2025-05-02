import { PropsWithChildren } from "react"

import { ContentContext } from "../../../context/Content"
import { useTable } from "../../../context/Table"
import { ScrollContainer, TableContainer } from "./styles"

const TableContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { isInsideTable } = useTable()

  if(!isInsideTable) {
    throw new Error('Table.Content must be inside Table')
  }

  return (
    <ContentContext.Provider value={{isInsideContent: true}}>
      <ScrollContainer>
        <TableContainer>
          {children}
        </TableContainer>
      </ScrollContainer>
    </ContentContext.Provider>
  )
}

export default TableContent