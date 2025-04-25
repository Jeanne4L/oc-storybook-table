import Chevron from "../../../components/Chevron"
import { useTableContext } from "../../../context/TableContext"
import Table from ".."
import { getPaginationRange } from "./helpers/getPaginationRange"
import { PageButton, PaginationContainer } from "./styles"

const Pagination = () => {
  const { colors, data, totalItems, itemsPerPage, currentPage, setCurrentPage } = useTableContext()
  
  const hasSeveralPages = data.length / itemsPerPage > 1

  if(!hasSeveralPages) {
    return
  }
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pagesRange = getPaginationRange(totalPages, currentPage)

  return (
    <PaginationContainer>
      <Chevron 
        direction="left" 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)} 
        color={colors.textColor}
      />

      {pagesRange.map((pageNumber, index) => (
        pageNumber === 'dots' ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
        <PageButton 
          key={pageNumber} 
          currentPage={currentPage === pageNumber}
          accentColor={colors.accentColor}
          textColor={colors.textColor}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      )))}
      <Chevron 
        direction="right"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)} 
        color={colors.textColor}
      />
    </PaginationContainer>
  )
}

export default Table.Pagination = Pagination