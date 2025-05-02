import { ChangeEvent, createContext, useContext } from "react"

import { ColumnsData, EmployeesData, RowActions } from "../parts/types"
import { SortConfigType, ThemeColors } from "../parts/Table/types"

type Pagination = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
}

type Toolbar = {
  entriesSelectOptions: number[]
  handleSelectOption: (event: ChangeEvent<HTMLSelectElement>) => void
  handleInputChange: (value: string) => void
}

type TableContextType = Pagination & Toolbar & {
  columns: ColumnsData
  data: EmployeesData
  colors: ThemeColors
  rowActions?: RowActions
  sortConfig: SortConfigType
  indexes: {
    firstIndex: number 
    lastIndex: number
  }
  isInsideTable: boolean
  handleSort: (columnIndex: number, sortConfig: SortConfigType, data: EmployeesData) => void
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
  isInsideTable: false,
  setCurrentPage: () => {},
  handleSelectOption: () => {},
  handleInputChange: () => {},
  handleSort: () => {},
})

export const useTable = () => useContext(TableContext)