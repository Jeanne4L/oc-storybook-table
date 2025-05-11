import { useContent } from "../../../../context/Content"
import { useTable } from "../../../../context/Table"
import { MessageTd, TableBodyRow, TableBodyCell } from "./styles"

const TableBody = <T extends Record<string, any>>() => {
  const { colors, columns, data, indexes, rowActions } = useTable<T>()
  const { isInsideContent } = useContent()

  if (!isInsideContent) {
    throw new Error('Table.Body must be inside Table.Content')
  }

  const renderActions = (placement: 'beginning' | 'end', row: T) =>
    rowActions?.map((action, i) => (
      action.placement === placement && (
        <TableBodyCell 
          key={`${placement}-${i}`} 
          alignment={placement === 'beginning' ? 'left' : 'right'}
          isClickable
        >
          {action.action(row)}
        </TableBodyCell>
      )
    ))

  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <MessageTd colSpan={columns.length}>No data available</MessageTd>
        </tr>
      ) : (
        <>
          {data.slice(indexes.firstIndex, indexes.lastIndex).map((row, index) => (
            <TableBodyRow key={`table-row-${index}`} isEven={index % 2 === 0} rowBg={colors.rowBg}>
              {renderActions('beginning', row)}

              {columns.map((column) => (
                <TableBodyCell 
                  key={column.id} 
                  alignment={column.alignment ?? 'left'} 
                >
                  {row[column.id]}
                </TableBodyCell>
              ))}

              {renderActions('end', row)}
            </TableBodyRow>
          ))}
        </>
      )}
    </tbody>
  )
}

export default TableBody