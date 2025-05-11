import SortIcon from "../../../../components/icons/SortIcon"
import { useContent } from "../../../../context/Content"
import { useTable } from "../../../../context/Table"
import { TableHeaderRow, TableHeaderCell } from "./styles"

const TableHead = () => {
  const { colors, columns, data, sortConfig, rowActions, handleSort } = useTable()
  const { isInsideContent } = useContent()

  if (!isInsideContent) {
    throw new Error('Table.Head must be inside Table.Content')
  }

  const isAscSorting = sortConfig.direction === 'asc'
  const isDescSorting = sortConfig.direction === 'desc'

  const renderActions = (placement: 'beginning' | 'end') =>
    rowActions?.map((action, i) => (
      action.placement === placement && (
        <TableHeaderCell 
          key={`${placement}-${i}`}
          alignment={placement === 'beginning' ? 'left' : 'right'}
        >
          <div>
            {action.scope === 'global' ? action.action() : null}
          </div>
        </TableHeaderCell>
      )
    ))

  return (
    <thead>
      <TableHeaderRow headerBg={colors.headerBg}>
        {renderActions('beginning')}

        {columns.map((column, index) => (
          <TableHeaderCell 
            key={column.id} 
            onClick={() => handleSort(index, sortConfig, data)}
            alignment={column.alignment ?? 'left'} 
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

        {renderActions('end')}
      </TableHeaderRow>
    </thead>
  )
}

export default TableHead