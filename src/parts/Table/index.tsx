import { ReactNode, useEffect, useState } from "react"

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
  entriesSelectOptions?: number[]
  children: ReactNode
  headerBg?: string
  rowBg?: string
  accentColor?: string
  textColor?: string
  borderColor?: string
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
  entriesSelectOptions = [data.length],
  textColor = '#000',
  headerBg = '#DAE0E7',
  rowBg = '#F3F5F7',
  accentColor = '#4E80B2',
  borderColor = '#C1CBD7',
  rowActions,
  children
}: TableProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [itemsPerPage, setItemsPerPage] = useState<number>(entriesSelectOptions[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    columnId: null,
    direction: 'desc',
  })

  useEffect(() => {
    setFilteredData(data)
  }, [data])
  
  const handleSelectOption = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleInputChange = (inputValue: string) => {
    const correspondingData = data.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(inputValue.toLowerCase())
      )
    )
    setFilteredData(correspondingData)
  }

  const handleSort = (columnId: string, sortConfig: SortConfigType, data: T[]) => {
    const isSameColumn = sortConfig.columnId === columnId

    const newSortConfig: SortConfigType = {
      columnId,
      direction: isSameColumn && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[columnId]
      const bValue = b[columnId]

      const aNum = Number(aValue)
      const bNum = Number(bValue)

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return newSortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum
      }

      const aStr = String(aValue)
      const bStr = String(bValue)

      const aDate = Date.parse(aStr)
      const bDate = Date.parse(bStr)

      if (!isNaN(aDate) && !isNaN(bDate)) {
        return newSortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate
      }

      return newSortConfig.direction === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr)
    })

    setSortConfig(newSortConfig)
    setFilteredData(sortedData)
  }
  
  const firstIndex = (currentPage - 1) * itemsPerPage
  const lastIndex = firstIndex + itemsPerPage

  const visibleRowsIndexes = { firstIndex, lastIndex }
  const colors = { textColor, headerBg, rowBg, accentColor, borderColor }

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