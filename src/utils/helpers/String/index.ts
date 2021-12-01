import VMasker from 'vanilla-masker'

export const currencyMaskInput = (value: number | null = 0, options?: any): string => {
  if (value === null) return ''
  const prefix = value < 0 ? '-' : ''
  return value ? prefix + VMasker.toMoney(Math.round(value), options) : '0'
}

export const currencyPending = (value: number | null = 0, options?: any): string => {
  if (value === null) return ''
  return value > 0 ? VMasker.toMoney(Math.round(value * 100), options) : '0'
}

export const currencyInputPeding = (value: number | null = 0, options?: any): string => {
  if (value === null) return ''
  return value > 0 ? VMasker.toMoney(Math.round(value), options) : '0'
}

export const currencyInput = (value: number | null = 0, options?: any): string => {
  if (value === null) return ''
  const prefix = value < 0 ? '-' : ''
  return value ? prefix + VMasker.toMoney(Math.round(value), options) : '0'
}

export const currencyUnFormat = (value: string): number => {
  return parseInt(value.replace(/\D/g, ''))
}

export const currencySaveFormat = (value: number = 0): string => {
  return VMasker.toMoney(value).replace(/\./g, '').replace(',', '.')
}

export const currencySaveString = (value: string = '0'): number => {
  const checkRegex = value.includes('-')
  if (checkRegex) return Number(`-${value.replace(',', '').replace('-', '')}`)
  return Number(value.replace(',', ''))
}

export const currencyShowFormat = (value: string | number) => `R$ ${currencyInput(Number(value) * 100)}`

export const percentageFormat = (value: string | number) => `${currencyInput(Number(value) * 100)} %`

export const cepToApi = (text: string) => {
  return text.replace('-', '')
}

export const capitalize = (text: string) => {
  if (typeof text !== 'string') return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const cpfMask = (value: string | null) => {
  if (value === null) return ''
  return VMasker.toPattern(value, '999.999.999-99')
}

export const cpfRemoveCaracter = (text: string): string => {
  return text.replace(/[^\w\s]/gi, '')
}

export const cnpjMask = (value: string) => {
  return VMasker.toPattern(value, '99.999.999/9999-99')
}

export const cepMask = (value: string) => {
  return value && VMasker.toPattern(value, '99999-999')
}

export const phoneMask = (value: string) => {
  return VMasker.toPattern(value, '(99) 99999-9999')
}

export const onlyNumber = (value: string) => {
  return VMasker.toNumber(value)
}

export const maskCpfCnpj = (tipo: string, value: string) => {
  return (tipo === 'F' || tipo === 'CPF') ? cpfMask(value) : cnpjMask(value)
}

export const zeroFillCpfCnpj = (tipo: string, value: string) => {
  return zeroFill(value, tipo === 'F' || tipo === 'CPF' ? 11 : 14)
}

export const zeroFill = (number: string, width: number) => {
  width -= number.toString().length
  if (width > 0) {
    return new Array(width + (number.includes('.') ? 2 : 1)).join('0') + number
  }
  return number + ''
}

export const itemPadFormat = (item: string = '', quant: number = 1, size: number = 32) => {
  const result = `${quant} X ${item.slice(0, (size - quant.toString().length))}`
  return result
}

export const removeAcento = (str: string) => {
  const comAcento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ'
  const semAcento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr'
  let novastr = ''
  for (let i = 0; i < str.length; i++) {
    let troca = false
    for (let a = 0; a < comAcento.length; a++) {
      if (str.substr(i, 1) === comAcento.substr(a, 1)) {
        novastr += semAcento.substr(a, 1)
        troca = true
        break
      }
    }
    if (!troca) {
      novastr += str.substr(i, 1)
    }
  }
  return novastr
}

export const removeMatching = (originalArray: any[], regex: RegExp) => {
  let j = 0
  while (j < originalArray.length) {
    if (regex.test(originalArray[j])) { originalArray.splice(j, 1) } else { j++ }
  }
  return originalArray
}

export const maskCustomField = (value?: string, pattern?: string) => {
  return value && VMasker.toPattern(value, pattern)
}

export const padDay = (value: string | number): string => {
  return value.toString().padStart(2, '0')
}

export const cnpjToReducer = (value: string) => onlyNumber(cnpjMask(value))

export const cpfToReducer = (value: string) => onlyNumber(cpfMask(value))

export const getObjectKeyByValue = (object: Record<string, any>, value: string) => Object.keys(object).find(key => object[key] === value)

export const isValidJson = (data: string): boolean => {
  try {
    JSON.parse(data)

    return true
  } catch (error: any) {
    return false
  }
}

export const hourMask = (value: string) => !value
  ? ''
  : VMasker.toPattern(value, '99:99')

export const removeHourMask = (value: string) => !value
  ? ''
  : value.replace(':', '')
