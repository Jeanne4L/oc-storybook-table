import Chevron from "../../../components/icons/Chevron"
import { useTable } from "../../../context/Table"
import { getPaginationRange } from "./helpers/getPaginationRange"
import { PageButton, PaginationContainer } from "./styles"

const Pagination = () => {
  const { colors, data, totalItems, itemsPerPage, currentPage, isInsideTable, setCurrentPage } = useTable()

  if(!isInsideTable) {
    throw new Error('Table.Pagination must be inside Table')
  }
  
  const hasSeveralPages = data.length / itemsPerPage > 1

  if(!hasSeveralPages) {
    return
  }
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pagesRange = getPaginationRange(totalPages, currentPage)

  return (
    <PaginationContainer data-testid="pagination">
      <Chevron 
        direction="left" 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)} 
        color={colors.textColor}
        dataTestId="previous"
      />

      {pagesRange.map((pageNumber, index) => (
        pageNumber === 'dots' ? (
          <span key={`dots-${index}`} data-testid='ellipsis'>...</span>
        ) : (
        <PageButton 
          key={pageNumber} 
          currentPage={currentPage === pageNumber}
          accentColor={colors.accentColor}
          textColor={colors.textColor}
          onClick={() => setCurrentPage(pageNumber)}
          data-testid="pagination-item"
        >
          {pageNumber}
        </PageButton>
      )))}
      <Chevron 
        direction="right"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)} 
        color={colors.textColor}
        dataTestId="next"
      />
    </PaginationContainer>
  )
}

export default Pagination