
import { ChangeEvent } from "react"

import SearchIcon from "../../components/SearchIcon"
import { useTable } from "../../context/Table"
import { useToolbar } from "../../context/Toolbar"
import { SearchBarContainer } from "./styles"

const SearchBar = () => {
  const { colors, handleInputChange } = useTable()
  const { isInsideToolbar } = useToolbar()

  if (!isInsideToolbar) {
    throw new Error('Table.SearchBar must be inside Table.Toolbar')
  }

  return (
    <SearchBarContainer borderColor={colors.accentColor} bgColor={colors.headerBg}>
      <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)} />
      <SearchIcon color={colors.textColor} />
    </SearchBarContainer>
  )
}

export default SearchBar