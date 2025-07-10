import { ChangeEvent, createContext, useContext } from "react"

import { SortConfigType, ThemeColors } from "../parts/Table/types"
import { Column, RowAction } from "../types"

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

export type TableContextType<T extends Record<string | number, any>> = 
  Pagination & Toolbar & {
  columns: Column<T>[]
  data: T[]
  colors: ThemeColors
  rowActions?: RowAction<T>[]
  sortConfig: SortConfigType
  indexes: {
    firstIndex: number 
    lastIndex: number
  }
  isInsideTable: boolean
  handleSort: (columnIndex: number, sortConfig: SortConfigType, data: T[]) => void
}

export const TableContext = createContext<TableContextType<any>>({
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
  handleSort: () => {}
})

export const useTable = <T extends Record<string | number, any>>() => useContext(TableContext) as TableContextType<T>