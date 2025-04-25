import { useState } from "react"

import TableActions from "./TableActions"
import Pagination from "../../components/Pagination"
import { ColumnsData, EmployeesData, RowActions } from "../types"
import { MainContainer, ScrollContainer, TableContainer} from "./styles"
import TableHead from "./TableHead"
import { SortConfigType } from "./types"
import TableBody from "./TableBody"

type TableProps = {
  columns: ColumnsData
  data: EmployeesData
  entriesSelectOptions: number[]
  headerBg?: string
  rowBg?: string
  accentColor?: string
  textColor?: string
  rowActions?: RowActions
}

const Table = ({ 
  columns, 
  data, 
  entriesSelectOptions,
  textColor = '#000',
  headerBg = 'rgba(118, 159, 175, 0.4)',
  rowBg = 'rgba(118, 159, 175, 0.1)',
  accentColor = '#769FAF'
}: TableProps) => {
  const [filteredData, setFilteredData] = useState<EmployeesData>(data)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    columnIndex: 0,
    direction: 'asc',
  })
  const [allSelected, setAllSelected] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  
  // const definedWidth = columns.reduce(
  //   (acc, current) => current.percentWidth ? acc + current.percentWidth : acc, 
  //   0
  // )
  
  // const remainingColumns = columns.filter(col => !col.percentWidth).length
  
  // const columnWidth = remainingColumns > 0 ? (100 - definedWidth) / remainingColumns : 0

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value))
  }

  const handleInputChange = (inputValue: string) => {
    const correspondingData = data.filter((entrie) =>
      Object.values(entrie).some((value) =>
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

    const sortedData = data.sort((a,b) => {
      if(newSortConfig.direction === 'asc') {
        return Object.values(a)[columnIndex].localeCompare(Object.values(b)[columnIndex])
      } else {
        return Object.values(b)[columnIndex].localeCompare(Object.values(a)[columnIndex])
      }
    })

    setSortConfig(newSortConfig)
    setFilteredData(sortedData)
  }

  const handleSelectAll = () => {
    setAllSelected(!allSelected)
    setSelectedRows([])
  }

  const handleSelectRow = (id: string, selectedRows: string[]) => {
    if(selectedRows.includes(id)) {
      setSelectedRows((prev) => ([
        ...prev.filter((i) => i === id)
      ]))
    } else {
      setSelectedRows((prev) => ([
        ...prev,
        id
      ]))
    }
  }

  // TODO handleDelete
  
  const firstIndex = (currentPage - 1) * itemsPerPage
  const lastIndex = firstIndex + itemsPerPage
  const hasSeveralPages = filteredData.length / itemsPerPage > 1

  const colors = { textColor, accentColor, headerBg, rowBg }
  const visibleRowsIndexes = { firstIndex, lastIndex }
  
  return (
    <MainContainer textColor={textColor}>
      <TableActions 
        entriesSelectOptions={entriesSelectOptions}
        handleSelectOption={handleSelectOption} 
        handleInputChange={handleInputChange}
        colors={colors}
      />
      
      <ScrollContainer>
        <TableContainer>
          <TableHead 
            handleSort={handleSort}
            sortConfig={sortConfig}
            data={filteredData}
            columns={columns}
            colors={colors} 
            allSelected={allSelected} 
            handleSelectAll={handleSelectAll}
          />

          <TableBody 
            data={filteredData}
            columns={columns}
            indexes={visibleRowsIndexes}
            colors={colors} 
            allSelected={allSelected} 
            selectedRows={selectedRows} 
            handleSelectRow={(id) => handleSelectRow(id, selectedRows)}
          />
        </TableContainer>
      </ScrollContainer>
      
      {hasSeveralPages && (
        <Pagination 
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          colors={colors}
        />
      )}
    </MainContainer>
  )
}

export default Table