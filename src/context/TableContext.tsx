import { ChangeEvent, createContext, useContext } from "react"

import { ColumnsData, EmployeesData, RowActions } from "../stories/types"
import { SortConfigType, ThemeColors } from "../stories/Table/types"

type TableContextType = {
  columns: ColumnsData
  data: EmployeesData
  colors: ThemeColors
  rowActions?: RowActions
  totalItems: number
  itemsPerPage: number
  currentPage: number
  sortConfig: SortConfigType
  indexes: {
    firstIndex: number 
    lastIndex: number
  }
  entriesSelectOptions: number[]
  setCurrentPage: (currentPage: number) => void
  handleSort: (columnIndex: number, sortConfig: SortConfigType, data: EmployeesData) => void
  handleSelectOption: (event: ChangeEvent<HTMLSelectElement>) => void
  handleInputChange: (value: string) => void
}

export const TableContext = createContext<TableContextType>({
  columns: [],
  data: [],
  colors: {
    textColor: '',
    accentColor: '',
    headerBg: '',
    rowBg: ''
  },
  rowActions: undefined,
  totalItems: 0,
  itemsPerPage: 0,
  currentPage: 0,
  sortConfig: {
    columnIndex: 0, 
    direction: 'asc'
  },
  indexes: {
    firstIndex: 0, 
    lastIndex: 0
  },
  entriesSelectOptions: [],
  setCurrentPage: () => {},
  handleSelectOption: () => {},
  handleInputChange: () => {},
  handleSort: () => {},
})

export const useTableContext = () => useContext(TableContext)