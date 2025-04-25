
import { ChangeEvent } from "react"

import SearchIcon from "../../components/SearchIcon"
import { ThemeColors } from "../../stories/Table/types"
import { SearchBarContainer } from "./styles"

type SearchBarProps = {
  colors: ThemeColors
  handleInputChange: (value: string) => void
}

const SearchBar = ({ colors, handleInputChange }: SearchBarProps) => {
  const { accentColor: borderColor, headerBg: bgColor, textColor: iconColor } = colors

  return (
    <SearchBarContainer borderColor={borderColor} bgColor={bgColor}>
      <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value)} />
      <SearchIcon color={iconColor} />
    </SearchBarContainer>
  )
}

export default SearchBar