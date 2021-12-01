import { SWRConfiguration, SWRInfiniteConfiguration } from 'swr/dist/types'

import { CommonDataProps } from './types'

export const MonthList = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
  'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export const WeekDayList = [
  'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'
]

export const SwrHookConfig: SWRConfiguration | {} = {
  // errorRetryInterval: 15000,
  refreshInterval: 0,
  errorRetryCount: 3,
  revalidateOnFocus: false
  // revalidateOnMount: false
}

export const SwrInfiniteHookConfig: SWRInfiniteConfiguration | {} = {
  ...SwrHookConfig,
  revalidateAll: true
}

export const CommonDataEmpty: CommonDataProps = {
  id: 0,
  name: ''
}
