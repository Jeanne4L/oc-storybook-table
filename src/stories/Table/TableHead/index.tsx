import SortIcon from "../../../components/SortIcon"
import { useTableContext } from "../../../context/TableContext"
import Table from ".."
import { TableHeaderCell, TableHeaderRow } from "./styles"

const TableHead = () => {
    const { colors, columns, data, sortConfig, handleSort } = useTableContext()

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

export default Table.Head = TableHead