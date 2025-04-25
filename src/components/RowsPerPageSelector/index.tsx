import { useTableContext } from "../../context/TableContext"
import { EntriesSelectContainer } from "./styles"

const RowsPerPageSelector = () => {
  const { colors, entriesSelectOptions: options, handleSelectOption,  } = useTableContext()

  const sortedOptions = options.sort((a,b) => a - b)

  return (
    <EntriesSelectContainer borderColor={colors.accentColor} bgColor={colors.headerBg}>
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
