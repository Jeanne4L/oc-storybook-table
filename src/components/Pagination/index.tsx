import Chevron from "../../components/Chevron"
import { ThemeColors } from "../../stories/Table/types"
import { getPaginationRange } from "./helpers/getPaginationRange"
import { PageButton, PaginationContainer } from "./styles"

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  colors: ThemeColors
  onPageChange: (currentPage: number) => void
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, colors, onPageChange }: PaginationProps) => {
  const { accentColor, textColor } = colors
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pagesRange = getPaginationRange(totalPages, currentPage)

  return (
    <PaginationContainer>
      <Chevron 
        direction="left" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)} 
        color={textColor}
      />

      {pagesRange.map((pageNumber, index) => (
        pageNumber === 'dots' ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
        <PageButton 
          key={pageNumber} 
          currentPage={currentPage === pageNumber}
          accentColor={accentColor}
          textColor={textColor}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      )))}
      <Chevron 
        direction="right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)} 
        color={textColor}
      />
    </PaginationContainer>
  )
}

export default Pagination