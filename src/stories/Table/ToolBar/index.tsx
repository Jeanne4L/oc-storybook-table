import RowsPerPageSelector from "../../../components/RowsPerPageSelector"
import SearchBar from "../../../components/SearchBar"
import Table from ".."
import { ActionsContainer } from "./styles"

const ToolBar = () => {
  return (
    <ActionsContainer>
      <RowsPerPageSelector />
      <SearchBar />
    </ActionsContainer>
  )
}

export default Table.ToolBar = ToolBar