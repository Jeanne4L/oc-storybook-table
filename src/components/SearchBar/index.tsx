
import { ChangeEvent } from "react"

import SearchIcon from "../../components/SearchIcon"
import { useTableContext } from "../../context/TableContext"
import { SearchBarContainer } from "./styles"

const SearchBar = () => {
  const { colors, handleInputChange } = useTableContext()

  return (
    <SearchBarContainer borderColor={colors.accentColor} bgColor={colors.headerBg}>
      <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)} />
      <SearchIcon color={colors.textColor} />
    </SearchBarContainer>
  )
}

export default SearchBar