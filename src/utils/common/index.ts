import { StaticListProps } from './types'

export const createUrlParams = (data: any): string =>
  !data
    ? ''
    : Object
      .keys(data)
      .map(key => `${key}=${encodeURIComponent(data[key])}`)
      .join('&')

export const getStaticItemById = <T extends any = string | number>(list: Array<StaticListProps<T>>, id: T): StaticListProps<T> =>
  list.find(i => i.id === id) as StaticListProps<T>

export const writeClipboard = async (text: string) => await navigator.clipboard.writeText(text)
