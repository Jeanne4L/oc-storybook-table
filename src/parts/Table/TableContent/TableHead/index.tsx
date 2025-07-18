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
          data-testid="sort-button"
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
      <TableHeaderRow headerBg={colors.headerBg} data-testid="table-header">
        {renderActions('beginning')}

        {columns.map((column) => (
          <TableHeaderCell 
            key={column.id} 
            data-testid="sort-button"
            onClick={() => handleSort(column.id, sortConfig, data)}
            alignment={column.alignment ?? 'left'} 
          >
            <div>
              {column.name}
              <SortIcon 
                bottomActive={sortConfig.columnId === column.id && isDescSorting} 
                topActive={sortConfig.columnId === column.id && isAscSorting} 
                disabled={sortConfig.columnId !== column.id}
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