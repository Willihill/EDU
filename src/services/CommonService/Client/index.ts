// import { NotificationManager } from 'react-notifications'

import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

import { AxiosResponse } from 'axios'
import { createUrlParams } from 'utils/common'
import { PaginationListParamsProps } from 'utils/common/types'
import { reduceArray, removeItemByIndexArray } from 'utils/helpers/Array'
import { extractPageFromUrl } from 'utils/helpers/Number'
import { asyncPromise } from 'utils/helpers/Promise'

import { putLogicalExclusionApi } from './api'
import { DataInExclusionProps, LogicalExclusionOptions, LogicalExclusionType } from './types'

const dataInExclusion: DataInExclusionProps[] = []

export const logicalExclusionWithMutateService = async <Y extends FlexGridDataProps, T extends Y[] | Y[][], K extends keyof Y> (options: LogicalExclusionOptions<Y, T, K>) => {
  const { exclusionData, dataKey, logicalExclusionType, removeDataOnInactive, mutate } = options
  try {
    pushExclusionItemService(exclusionData[dataKey], logicalExclusionType)

    await mutate(curData => updateMutateItem(curData, (item: Y) => item[dataKey] === exclusionData[dataKey] ? { ...item, isExcluding: true } : item), false)

    const { err } = await asyncPromise(putLogicalExclusionApi(String(exclusionData[dataKey]), logicalExclusionType))
    if (err) throw new Error(err.response?.data.message)
    // NotificationManager.success('', 'Registro alterado com sucesso', 5000)

    setTimeout(() => {
      const isInactiveData = !!exclusionData.isActive
      if (isInactiveData && removeDataOnInactive) {
        mutate(curData => filterMutateItem(curData, (item: Y) => item[dataKey] !== exclusionData[dataKey]), false)
      } else {
        mutate(curData => updateMutateItem(curData, (item: Y) => item[dataKey] === exclusionData[dataKey] ? { ...item, isExcluding: false, isActive: !exclusionData.isActive } : item), false)
      }
    }, 400)
  } catch (error: any) {
    // NotificationManager.error('', error.message, 5000)
  } finally {
    removeExclusionItemService(exclusionData[dataKey], logicalExclusionType)
  }
}

export const updateMutateItem = <Y, T extends Array<Y | Y[]>> (data: T | undefined, precidateUpdate: (item: Y) => Y): T | undefined => {
  if (data === undefined) return data
  if (data.length === 0) return data

  return data
    .map(item => {
      if (!Array.isArray(item)) return precidateUpdate(item)
      return item.map(subItem => precidateUpdate(subItem))
    }) as T
}

export const filterMutateItem = <Y, T extends Y[] | Y[][]> (data: T | undefined, precidateFilter: (value: Y) => boolean): T | undefined => {
  if (data === undefined) return data
  if (data.length === 0) return data

  const isInfinite = Array.isArray(data[0])
  if (!isInfinite) return (data as Y[]).filter(precidateFilter) as T

  return (data as Y[][])
    .map(item => item.filter(i => precidateFilter(i))) as T
}

export const pushExclusionItemService = (id: any, logicalExclusionType: LogicalExclusionType) =>
  dataInExclusion.push({ id, logicalType: logicalExclusionType })

export const removeExclusionItemService = (id: any, logicalExclusionType: LogicalExclusionType) =>
  removeItemByIndexArray(dataInExclusion, dataInExclusion.findIndex(item => item.id === id && item.logicalType === logicalExclusionType), 1)

export const populateExclusionInfoService = <T extends FlexGridDataProps, K extends keyof T>(data: T[] | undefined, dataKey: K, logicalExclusionType: LogicalExclusionType): T[] =>
  !data
    ? []
    : data
      .map(item => {
        const dataIndex = dataInExclusion.findIndex(i => i.id === item[dataKey] && i.logicalType === logicalExclusionType)
        return dataIndex >= 0 ? { ...item, isExcluding: true } : item
      })

export const populateSwrDataExclusionInfoService = <Y extends FlexGridDataProps, T extends Y[] | Y[][], K extends keyof Y>(data: T | undefined, dataKey: K, logicalExclusionType: LogicalExclusionType): Y[] => {
  if (data === undefined) return []
  if (data.length === 0) return []

  const isInfinite = Array.isArray(data[0])
  if (!isInfinite) return populateExclusionInfoService((data as Y[]), dataKey, logicalExclusionType)

  return reduceArray(
    (data as Y[][]).map(item => populateExclusionInfoService(item, dataKey, logicalExclusionType)),
    (prev, next) => ([...prev, ...next])
  ) as Y[]
}

export const swrInfiniteHookFetcherService = <TFilters, TResult>(
  limitByPage: number,
  filters: TFilters,
  fetcher: (filters: TFilters & PaginationListParamsProps) => Promise<AxiosResponse<TResult[]>>,
  setHasMore: (has: boolean) => void) =>
    async (url: string) => {
      const page = extractPageFromUrl(url)
      const searchFilters: TFilters & PaginationListParamsProps = {
        ...filters,
        page,
        limit: limitByPage
      }

      const { err, resp } = await asyncPromise(fetcher(searchFilters))
      if (!resp) throw new Error(err?.response?.data.message)

      setHasMore(resp.data.length >= limitByPage)
      return resp.data
    }

export const swrInfiniteHookDefineKeyService = (prefix: string, filters: any) =>
  (page: number) => `${prefix}${createUrlParams(filters)}/${++page}`

export const swrHookFetcherService = <TResult>(fetcher: (...args: any) => Promise<AxiosResponse<TResult | TResult[]>>, ...args: any) =>
  async () => {
    console.log('swrHookFetcherService Args:', args, ...args)
    const { err, resp } = await asyncPromise(fetcher(...args))
    if (!resp) throw new Error(err?.response?.data.message)

    return resp.data
  }

export const swrHookDefineKeyService = (prefix: string, filters: any) =>
  `${prefix}${typeof filters === 'object' ? createUrlParams(filters) : String(filters)}`
