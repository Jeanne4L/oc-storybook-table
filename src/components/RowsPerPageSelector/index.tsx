import { ChangeEvent } from "react"

import { EntriesSelectContainer } from "./styles"
import { ThemeColors } from "../../stories/Table/types"

type RowsPerPageSelectorProps = {
  options: number[]
  colors: ThemeColors
  handleSelectOption: (event: ChangeEvent<HTMLSelectElement>) => void
}

const RowsPerPageSelector = ({ options, colors, handleSelectOption }: RowsPerPageSelectorProps) => {
  const { accentColor: borderColor, headerBg: bgColor } = colors

  const sortedOptions = options.sort((a,b) => a - b)

  return (
    <EntriesSelectContainer borderColor={borderColor} bgColor={bgColor}>
      <span>Show</span>
      <select name="entries" id="entries" onChange={(event) => handleSelectOption(event)}>
        {sortedOptions.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <span>entries</span>
    </EntriesSelectContainer>
  )
}

export default RowsPerPageSelector
