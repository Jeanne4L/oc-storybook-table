import SortIcon from "../../../components/SortIcon"
import { ColumnsData, EmployeesData } from "../../types"
import { SortConfigType, ThemeColors } from "../types"
import { TableHeaderCell, TableHeaderRow } from "./styles"

type TableHeadProps = {
  sortConfig: SortConfigType
  data: EmployeesData
  columns: ColumnsData
  colors: ThemeColors
  allSelected: boolean
  handleSort: (columnIndex: number, sortConfig: SortConfigType, data: EmployeesData) => void
  handleSelectAll: () => void
}

const TableHead = ({ sortConfig, data, columns, colors, allSelected, handleSort, handleSelectAll }: TableHeadProps) => {
  const { headerBg, textColor: iconColor} = colors

  const isAscSorting = sortConfig.direction === 'asc'
  const isDescSorting = sortConfig.direction === 'desc'

  return (
    <thead>
      <TableHeaderRow headerBg={headerBg}>
        <TableHeaderCell>
          <input 
            type="checkbox" 
            onChange={handleSelectAll} 
            checked={allSelected} 
          />
        </TableHeaderCell>

        {columns.map((column, index) => (
          <TableHeaderCell 
            key={column.id} 
            // alignment={column.alignment ?? 'left'} 
            onClick={() => handleSort(index, sortConfig, data)}
            // columnWidth={columnWidth}
          >
            <div>
              {column.name}
              <SortIcon 
                bottomActive={sortConfig.columnIndex === index && isDescSorting} 
                topActive={sortConfig.columnIndex === index && isAscSorting} 
                disabled={sortConfig.columnIndex !== index}
                color={iconColor}
              />
            </div>
          </TableHeaderCell>
        ))}
      </TableHeaderRow>
    </thead>
  )
}

export default TableHead