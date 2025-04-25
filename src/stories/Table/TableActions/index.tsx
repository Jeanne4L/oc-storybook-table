import { ChangeEvent } from "react"

import RowsPerPageSelector from "../../../components/RowsPerPageSelector"
import SearchBar from "../../../components/SearchBar"
import { ThemeColors } from "../types"
import { ActionsContainer } from "./styles"

type TableActionsProps = {
  colors: ThemeColors
  entriesSelectOptions: number[]
  handleSelectOption: (event: ChangeEvent<HTMLSelectElement>) => void
  handleInputChange: (value: string) => void
}

const TableActions = ({ colors, entriesSelectOptions, handleSelectOption, handleInputChange }: TableActionsProps) => {
  return (
      <ActionsContainer>
        <RowsPerPageSelector options={entriesSelectOptions} handleSelectOption={handleSelectOption} colors={colors} />
        <SearchBar handleInputChange={handleInputChange} colors={colors} />
      </ActionsContainer>
  )
}

export default TableActions