export const getPaginationRange = (
  totalPages: number,
  currentPage: number
): (number | 'dots')[] => {
  const totalVisible = 7

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const range: (number | 'dots')[] = []

  const left = Math.max(currentPage - 2, 2)

  if (currentPage <= 4) {
    range.push(1, 2, 3, 4, 5, 'dots', totalPages)
  } else if (currentPage >= totalPages - 3) {
    range.push(1, 'dots', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  } else {
    range.push(1, 'dots', left, currentPage - 1, currentPage, currentPage + 1, 'dots', totalPages)
    if (range.length > 7) {
      range.splice(1, range.length - 2 - 4, 'dots')
    }
  }

  return range
}