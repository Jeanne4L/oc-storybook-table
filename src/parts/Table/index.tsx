import { ReactNode, useState } from "react"

import { TableContext } from "../../context/Table"
import RowsPerPageSelector from "../../components/RowsPerPageSelector"
import SearchBar from "../../components/SearchBar"
import { ColumnsData, EmployeesData, RowActions } from "../types"
import { SortConfigType } from "./types"
import Pagination from "./Pagination"
import TableContent from "./TableContent"
import TableHead from "./TableContent/TableHead" 
import TableBody from "./TableContent/TableBody"
import Toolbar from "./Toolbar"
import { MainContainer } from "./styles"

export type TableProps = {
  columns: ColumnsData
  data: EmployeesData
  entriesSelectOptions: number[]
  children: ReactNode
  headerBg?: string
  rowBg?: string
  accentColor?: string
  textColor?: string
  rowActions?: RowActions
}

interface CompoundTableComponent extends React.FC<TableProps> {
  Pagination: typeof Pagination
  Head: typeof TableHead
  Body: typeof TableBody
  EntriesSelector: typeof RowsPerPageSelector
  SearchBar: typeof SearchBar
  Toolbar: typeof Toolbar
  Content: typeof TableContent
}

const Table: CompoundTableComponent = ({ 
  columns, 
  data, 
  entriesSelectOptions,
  textColor = '#000',
  headerBg = 'rgba(118, 159, 175, 0.4)',
  rowBg = 'rgba(118, 159, 175, 0.1)',
  accentColor = '#769FAF',
  rowActions,
  children
}) => {
  const [filteredData, setFilteredData] = useState<EmployeesData>(data)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    columnIndex: 0,
    direction: 'asc',
  })
  // const [allSelected, setAllSelected] = useState<boolean>(false)
  // const [selectedRows, setSelectedRows] = useState<string[]>([])

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

  const handleSort = (columnIndex: number, sortConfig: SortConfigType, data: EmployeesData) => {
    const isSameColumn = sortConfig.columnIndex === columnIndex

    const newSortConfig: SortConfigType = {
      columnIndex,
      direction: isSameColumn && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }

    // const sortedData = [...data].sort((a,b) => {
    //   if(newSortConfig.direction === 'asc') {
    //     return Object.values(a)[columnIndex].localeCompare(Object.values(b)[columnIndex])
    //   } else {
    //     return Object.values(b)[columnIndex].localeCompare(Object.values(a)[columnIndex])
    //   }
    // })

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

  // const handleSelectAll = () => {
  //   setAllSelected(!allSelected)
  //   setSelectedRows([])
  // }

  // const handleSelectRow = (id: string, selectedRows: string[]) => {
  //   if(selectedRows.includes(id)) {
  //     setSelectedRows((prev) => ([
  //       ...prev.filter((i) => i === id)
  //     ]))
  //   } else {
  //     setSelectedRows((prev) => ([
  //       ...prev,
  //       id
  //     ]))
  //   }
  // }
  
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

Table.Pagination = Pagination
Table.Head = TableHead
Table.Body = TableBody
Table.EntriesSelector = RowsPerPageSelector
Table.SearchBar = SearchBar
Table.Toolbar = Toolbar
Table.Content = TableContent

export default Table