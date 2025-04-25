import { useTableContext } from "../../../context/TableContext"
import Table from ".."
import { MessageTd, TableBodyRow, TableBodyCell } from "./styles"


const TableBody = () => {
  const { colors, columns, data, indexes } = useTableContext()

  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <MessageTd colSpan={columns.length}>No data available</MessageTd>
        </tr>
      ) : (
        <>
          {data.slice(indexes.firstIndex, indexes.lastIndex).map((row, index) => (
            <TableBodyRow key={index} isEven={index % 2 === 0} rowBg={colors.rowBg}>
              {/* <TableBodyCell alignment='left' >
                <input 
                  type="checkbox" 
                  onChange={() => handleSelectRow(row.id)} 
                  checked={allSelected || selectedRows.includes(row.id)} 
                />
              </TableBodyCell> */}

              {columns.map((column) => (
                  <TableBodyCell 
                    key={column.id} 
                    alignment={column.alignment ?? 'left'} 
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

export default Table.Body = TableBody