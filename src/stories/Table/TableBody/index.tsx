import { ColumnsData, EmployeesData } from "../../types"
import { ThemeColors } from "../types"
import { MessageTd, TableBodyRow, TableBodyCell } from "./styles"

type TableBodyProps = {
  data: EmployeesData
  columns: ColumnsData
  indexes: {
    firstIndex: number 
    lastIndex: number
  }
  colors: ThemeColors
  allSelected: boolean
  selectedRows: string[]
  handleSelectRow: (id: string) => void
}

const TableBody = ({ data, columns, indexes, colors, allSelected, selectedRows, handleSelectRow }: TableBodyProps) => {
  const { rowBg } = colors
  const { firstIndex, lastIndex } = indexes

  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <MessageTd colSpan={columns.length}>No data available</MessageTd>
        </tr>
      ) : (
        <>
          {data.slice(firstIndex, lastIndex).map((row, index) => (
            <TableBodyRow key={index} isEven={index % 2 === 0} rowBg={rowBg}>
              <TableBodyCell alignment='left' >
              <input 
                type="checkbox" 
                onChange={() => handleSelectRow(row.id)} 
                checked={allSelected || selectedRows.includes(row.id)} 
              />
              </TableBodyCell>

              {columns.map((column) => (
                  <TableBodyCell 
                    key={column.id} 
                    alignment={column.alignment ?? 'left'} 
                    // columnWidth={columnWidth}
                  >
                    {row[column.id]}
                  </TableBodyCell>
                ))}
            </TableBodyRow>
          ))}
        </>
      )}
    </tbody>
  )
}

export default TableBody