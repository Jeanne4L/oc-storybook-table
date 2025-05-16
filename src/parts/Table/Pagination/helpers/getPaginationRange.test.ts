import { getPaginationRange } from "./getPaginationRange"

describe('helpers', () => {
  test('return pagination range at start', () => {
    expect(getPaginationRange(10, 1)).toEqual([1, 2, 3, 4, 5, 'dots', 10])
  })

  test('return pagination range at end', () => {
    expect(getPaginationRange(10, 10)).toEqual([1, 'dots', 6, 7, 8, 9, 10])
  })

  test('return pagination range in middle', () => {
    expect(getPaginationRange(15, 8)).toEqual([1, 'dots', 7, 8, 9, 'dots', 15])
  })
})