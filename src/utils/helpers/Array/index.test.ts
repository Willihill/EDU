import { sumArray } from './index'

test('sumArray [] expected result 0', () => {
  expect(sumArray([])).toEqual(0)
})

test('sumArray [1] expected result 1', () => {
  expect(sumArray([1])).toEqual(1)
})

test('sumArray [1, 1, 1, 1] expected result 4', () => {
  expect(sumArray([1, 1, 1, 1])).toEqual(4)
})
