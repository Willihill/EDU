export const validaCpf = (strCPF: string) => {
  let soma = 0
  let Resto
  strCPF = strCPF.replace(/[^\d]+/g, '')
  // Elimina strCNPJs invalidos conhecidos
  if (strCPF.includes('0000000000') ||
        strCPF.includes('1111111111') ||
        strCPF.includes('2222222222') ||
        strCPF.includes('3333333333') ||
        strCPF.includes('44444444444') ||
        strCPF.includes('55555555555') ||
        strCPF.includes('66666666666') ||
        strCPF.includes('77777777777') ||
        strCPF.includes('88888888888') ||
        strCPF.includes('99999999999')) return false

  for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (soma * 10) % 11

  if ((Resto === 10) || (Resto === 11)) Resto = 0
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (soma * 10) % 11

  if ((Resto === 10) || (Resto === 11)) Resto = 0
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false
  return true
}

export const validaCnpj = (strCNPJ: string) => {
  let tamanho = 0
  let soma = 0
  let pos = 0
  let numeros: any
  let digitos = ''
  let resultado: any
  strCNPJ = strCNPJ.replace(/[^\d]+/g, '')

  if (strCNPJ === '' || strCNPJ.length !== 14) return false

  // Elimina strCNPJs invalidos conhecidos
  if (strCNPJ === '00000000000000' ||
        strCNPJ === '11111111111111' ||
        strCNPJ === '22222222222222' ||
        strCNPJ === '33333333333333' ||
        strCNPJ === '44444444444444' ||
        strCNPJ === '55555555555555' ||
        strCNPJ === '66666666666666' ||
        strCNPJ === '77777777777777' ||
        strCNPJ === '88888888888888' ||
        strCNPJ === '99999999999999') return false

  // Valida DVs
  tamanho = strCNPJ.length - 2
  numeros = strCNPJ.substring(0, tamanho)
  digitos = strCNPJ.substring(tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) { pos = 9 }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(0))) { return false }

  tamanho = tamanho + 1
  numeros = strCNPJ.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) { pos = 9 }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== parseInt(digitos.charAt(1))) { return false }

  return true
}

export const validatePersonDocument = (personType: string, value: string | number) =>
  personType === 'F' || personType === 'CPF'
    ? validaCpf(value.toString())
    : validaCnpj(value.toString())
