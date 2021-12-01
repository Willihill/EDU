export const sumArray = (array: number[]): number => {
  if (array.length === 0) return 0
  return array.reduce((curr, next) => curr + next)
}

export const minValueByKeyArray = <T, K extends keyof T>(array: T[], key: K): T[K] | number => {
  if (!array.length) return 0
  const minVal = array
    .reduce((prev, next) => prev[key] < next[key] ? prev : next)

  return minVal[key]
}

export const minValueArray = (array: number[]): number =>
  !array.length
    ? 0
    : array
      .reduce((prev, next) => prev < next ? prev : next)

export const maxValueByKeyArray = <T, K extends keyof T>(array: T[], key: K): T[K] | number => {
  if (!array.length) return 0
  const minVal = array
    .reduce((prev, next) => prev[key] > next[key] ? prev : next)

  return minVal[key]
}

export const maxValueArray = (array: number[]): number =>
  !array.length
    ? 0
    : array
      .reduce((prev, next) => prev > next ? prev : next)

export const removeItemByIndexArray = <T>(data: T[], index: number, removeCount: number = 1): T[] =>
  index < 0
    ? data
    : data.splice(index, removeCount)

export const mapArray = <T, U>(array: T[] | undefined, predicate: (value: T, index: number, array: T[]) => U): U[] =>
  !array
    ? []
    : array
      .map(predicate)

export const reduceArray = <T>(array: T[] | undefined, predicate: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T | T[] =>
  !array || array.length === 0
    ? []
    : array
      .reduce(predicate)

export const filterArray = <T>(array: T[] | undefined, predicate: (value: T, index: number, array: T[]) => unknown): T[] =>
  !array
    ? []
    : array
      .filter(predicate)

export const appendArray = <T>(array: T[] | undefined, item: T): T[] =>
  !array
    ? []
    : [...array, item]

export const updateItemByIndexArray = <T>(array: T[] | undefined, indexItem: number, predicateUpdate: (item: T) => T): T[] => {
  if (!array) return []

  return array
    .map((item: T, idx: number) => {
      if (idx === indexItem) return predicateUpdate(item)
      return item
    })
}

export const updateItemByFindArray = <T>(array: T[] | undefined, findItem: (item: T) => boolean, predicateUpdate: (item: T) => T): T[] => {
  if (!array) return []

  return array
    .map(item => {
      if (findItem(item)) return predicateUpdate(item)
      return item
    })
}

export const createRowsArray = <T>(array: T[], columns: number, emptyValue?: T): T[][] => {
  const result: T[][] = []
  const rowsCount = Math.ceil(array.length / columns)
  const amountItens = rowsCount * columns
  const missingCount = amountItens - array.length

  Array
    .from(Array(rowsCount).keys())
    .forEach(row => {
      const start = row * columns
      const end = start + columns

      result.push(array.slice(start, end))
    })

  if (missingCount && emptyValue !== undefined) {
    Array
      .from(Array(missingCount).keys())
      .forEach(() => {
        result[rowsCount - 1].push(emptyValue)
      })
  }

  return result
}
