import { ReactNode, useState } from "react"

import { TableContext } from "../../context/TableContext"
import { ColumnsData, EmployeesData, RowActions } from "../types"
import { SortConfigType } from "./types"
import Pagination from "./Pagination"
import Head from "./TableHead"
import Body from "./TableBody"
import ToolBar from "./ToolBar"
import Content, { TableContentProps } from "./TableContent"
import { MainContainer } from "./styles"

type TableProps = {
  columns: ColumnsData
  data: EmployeesData
  entriesSelectOptions: number[]
  children: ReactNode
  colors?: {
    headerBg: string
    rowBg: string
    accentColor: string
    textColor: string
  }
  rowActions?: RowActions
}

interface CompoundTableComponent extends React.FC<TableProps> {
  Pagination: React.FC
  Head: React.FC
  Body: React.FC
  ToolBar: React.FC
  Content: React.FC<TableContentProps>
}

const Table: CompoundTableComponent = ({ 
  columns, 
  data, 
  entriesSelectOptions,
  colors = {
    textColor: '#000',
    headerBg: 'rgba(118, 159, 175, 0.4)',
    rowBg: 'rgba(118, 159, 175, 0.1)',
    accentColor: '#769FAF',
  },
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
  const { textColor } = colors

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
  }
  
  return (
    <TableContext.Provider value={contextValue}>
      <MainContainer textColor={textColor}>
        {/* <Table.Toolbar />
        
        <Table.Content>
          <Table.Head />
          <Table.Body />
        </Table.Content>
        
        <Table.Pagination />
       */}
        {children}
      </MainContainer>
    </TableContext.Provider>
  )
}

Table.Pagination = Pagination
Table.Head = Head
Table.Body = Body
Table.ToolBar = ToolBar
Table.Content = Content

export default Table