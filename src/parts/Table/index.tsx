import { ReactNode, useState } from "react"

import { TableContext } from "../../context/Table"
import RowsPerPageSelector from "../../components/RowsPerPageSelector"
import SearchBar from "../../components/SearchBar"
import { Column, RowAction } from "../../types"
import { SortConfigType } from "./types"
import Pagination from "./Pagination"
import TableContent from "./TableContent"
import TableHead from "./TableContent/TableHead" 
import TableBody from "./TableContent/TableBody"
import Toolbar from "./Toolbar"
import { MainContainer } from "./styles"

export type TableProps<T extends Record<string | number, any>> = {
  columns: Column<T>[]
  data: T[]
  entriesSelectOptions: number[]
  children: ReactNode
  headerBg?: string
  rowBg?: string
  accentColor?: string
  textColor?: string
  rowActions?: RowAction<T>[]
}

interface CompoundTableComponent<T extends Record<string | number, any>> extends React.FC<TableProps<T>> {
  Pagination: typeof Pagination
  Head: typeof TableHead
  Body: typeof TableBody
  EntriesSelector: typeof RowsPerPageSelector
  SearchBar: typeof SearchBar
  Toolbar: typeof Toolbar
  Content: typeof TableContent
}

const TableComponent = <T extends Record<string, any>>({
  columns, 
  data, 
  entriesSelectOptions,
  textColor = '#000',
  headerBg = 'rgba(118, 159, 175, 0.4)',
  rowBg = 'rgba(118, 159, 175, 0.1)',
  accentColor = '#769FAF',
  rowActions,
  children
}: TableProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    columnIndex: 0,
    direction: 'asc',
  })

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value))
  }

  const handleInputChange = (inputValue: string) => {
    const correspondingData = data.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(inputValue.toLowerCase())
      )
    )
    setFilteredData(correspondingData)
  }

  const handleSort = (columnIndex: number, sortConfig: SortConfigType, data: T[]) => {
    const isSameColumn = sortConfig.columnIndex === columnIndex

    const newSortConfig: SortConfigType = {
      columnIndex,
      direction: isSameColumn && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = String(Object.values(a)[columnIndex])
      const bValue = String(Object.values(b)[columnIndex])
      return newSortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })

    setSortConfig(newSortConfig)
    setFilteredData(sortedData)
  }
  
  const firstIndex = (currentPage - 1) * itemsPerPage
  const lastIndex = firstIndex + itemsPerPage

  const visibleRowsIndexes = { firstIndex, lastIndex }
  const colors = { textColor, headerBg, rowBg, accentColor }

  const contextValue = {
    columns,
    data: filteredData,
    colors,
    rowActions,
    totalItems: filteredData.length,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    entriesSelectOptions,
    handleSelectOption,
    handleInputChange,
    handleSort,
    sortConfig,
    indexes: visibleRowsIndexes,
    isInsideTable: true
  }
  
  return (
    <TableContext.Provider value={contextValue}>
      <MainContainer textColor={textColor}>
        {children}
      </MainContainer>
    </TableContext.Provider>
  )
}

const Table = TableComponent as unknown as CompoundTableComponent<any>
Table.Pagination = Pagination
Table.Head = TableHead
Table.Body = TableBody
Table.EntriesSelector = RowsPerPageSelector
Table.SearchBar = SearchBar
Table.Toolbar = Toolbar
Table.Content = TableContent

export default Table