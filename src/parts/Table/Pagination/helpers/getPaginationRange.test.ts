import { getPaginationRange } from "./getPaginationRange"

describe('helpers', () => {
  test('return pagination range at start', () => {
    const itemsNumber = 10
    const currentPage = 1

    const result = getPaginationRange(itemsNumber, currentPage)

    expect(result).toEqual([1, 2, 3, 4, 5, 'dots', 10])
  })

  test('return pagination range at end', () => {
    const itemsNumber = 10
    const currentPage = 10

    const result = getPaginationRange(itemsNumber, currentPage)

    expect(result).toEqual([1, 'dots', 6, 7, 8, 9, 10])
  })

  test('return pagination range in middle', () => {
    const itemsNumber = 15
    const currentPage = 8

    const result = getPaginationRange(itemsNumber, currentPage)

    expect(result).toEqual([1, 'dots', 7, 8, 9, 'dots', 15])
  })
})