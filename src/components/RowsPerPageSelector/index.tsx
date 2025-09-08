import { useTable } from "../../context/Table"
import { useToolbar } from "../../context/Toolbar"
import { EntriesSelectContainer } from "./styles"

const RowsPerPageSelector = () => {
  const { colors, entriesSelectOptions: options, handleSelectOption } = useTable()
  const { isInsideToolbar } = useToolbar()

  if (!isInsideToolbar) {
    throw new Error('Table.EntriesSelector must be inside Table.Toolbar')
  }

  const sortedOptions = options.sort((a,b) => a - b)

  return (
    <EntriesSelectContainer borderColor={colors.accentColor} bgColor={colors.headerBg}>
      <span>Show</span>
      <select 
        name="entries" 
        id="entries" 
        data-testid="entries-selector"
        onChange={(event) => handleSelectOption(Number(event.target.value))}
      >
        {sortedOptions.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <label htmlFor="entries">entries</label>
    </EntriesSelectContainer>
  )
}

export default RowsPerPageSelector
