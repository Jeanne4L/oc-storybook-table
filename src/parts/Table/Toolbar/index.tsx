import { PropsWithChildren } from "react"

import { ToolbarContext } from "../../../context/Toolbar"
import { ActionsContainer } from "./styles"
import { useTable } from "../../../context/Table"

const Toolbar: React.FC<PropsWithChildren> = ({ children }) => {
  const { isInsideTable } = useTable()

  if(!isInsideTable) {
    throw new Error('Table.Toolbar must be inside Table')
  }
  
  return (
    <ToolbarContext.Provider value={{ isInsideToolbar: true }}>
      <ActionsContainer>
        {children}
      </ActionsContainer>
    </ToolbarContext.Provider>
  )
}

export default Toolbar