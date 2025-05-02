import { useTable } from "../context/Table"

export const usePagination = () => {
  const { totalItems, itemsPerPage, currentPage, setCurrentPage } = useTable()

  return { totalItems, itemsPerPage, currentPage, setCurrentPage } 
}