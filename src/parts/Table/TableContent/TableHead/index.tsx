import SortIcon from "../../../../components/SortIcon"
import { useContent } from "../../../../context/Content"
import { useTable } from "../../../../context/Table"
import { TableHeaderRow, TableHeaderCell } from "./styles"

const TableHead = () => {
  const { colors, columns, data, sortConfig, handleSort } = useTable()
  const { isInsideContent } = useContent()

  if (!isInsideContent) {
    throw new Error('Table.Head must be inside Table.Content')
  }

  const isAscSorting = sortConfig.direction === 'asc'
  const isDescSorting = sortConfig.direction === 'desc'

  return (
    <thead>
      <TableHeaderRow headerBg={colors.headerBg}>
        {/* <TableHeaderCell>
          <input 
            type="checkbox" 
            onChange={handleSelectAll} 
            checked={allSelected} 
          />
        </TableHeaderCell> */}

        {columns.map((column, index) => (
          <TableHeaderCell 
            key={column.id} 
            onClick={() => handleSort(index, sortConfig, data)}
          >
            <div>
              {column.name}
              <SortIcon 
                bottomActive={sortConfig.columnIndex === index && isDescSorting} 
                topActive={sortConfig.columnIndex === index && isAscSorting} 
                disabled={sortConfig.columnIndex !== index}
                color={colors.textColor}
              />
            </div>
          </TableHeaderCell>
        ))}
      </TableHeaderRow>
    </thead>
  )
}

export default TableHead