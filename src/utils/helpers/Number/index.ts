export const parseNumeric = (value?: string | number): number => {
  const data = Number(value)
  return data.toString() !== 'NaN' ? data : 0
}

export const extractPageFromUrl = (url: string) => {
  const urlSplit = url.split('/')
  return parseInt(urlSplit[urlSplit.length - 1])
}

export const roundDecimal = (value: string | number, decimal: number = 2): number => {
  const data = Number(value)
  return Number(data.toFixed(decimal))
}

export const roundBetween = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)
