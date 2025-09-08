
import { ChangeEvent } from "react"

import { useTable } from "../../context/Table"
import { useToolbar } from "../../context/Toolbar"
import SearchIcon from "../icons/SearchIcon"
import { SearchBarContainer } from "./styles"

const SearchBar = () => {
  const { colors, handleInputChange } = useTable()
  const { isInsideToolbar } = useToolbar()

  if (!isInsideToolbar) {
    throw new Error('Table.SearchBar must be inside Table.Toolbar')
  }

  return (
    <SearchBarContainer borderColor={colors.accentColor} bgColor={colors.headerBg}>
      <input 
        type="text" 
        data-testid="search-bar"
        aria-label="Search"
        onChange={
          (event: ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)
        }
      />
      <SearchIcon color={colors.textColor} />
    </SearchBarContainer>
  )
}

export default SearchBar