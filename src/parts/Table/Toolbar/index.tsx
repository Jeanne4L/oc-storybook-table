import { PropsWithChildren } from "react"

import { ToolbarContext } from "../../../context/Toolbar"
import { useTable } from "../../../context/Table"
import { ActionsContainer } from "./styles"

const value = { isInsideToolbar: true }

const Toolbar: React.FC<PropsWithChildren> = ({ children }) => {
  const { isInsideTable } = useTable()

  if(!isInsideTable) {
    throw new Error('Table.Toolbar must be inside Table')
  }

  return (
    <ToolbarContext.Provider value={value}>
      <ActionsContainer>
        {children}
      </ActionsContainer>
    </ToolbarContext.Provider>
  )
}

export default Toolbar