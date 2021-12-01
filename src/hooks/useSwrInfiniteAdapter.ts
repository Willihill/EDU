import { useState } from 'react'

import { logicalExclusionWithMutateService, populateSwrDataExclusionInfoService, swrInfiniteHookDefineKeyService, swrInfiniteHookFetcherService } from 'services/CommonService/Client'
import { SwrAdapterOptionsProps } from 'services/CommonService/Client/types'

import { AxiosResponse } from 'axios'
import { useSWRInfinite } from 'swr'
import { SwrInfiniteHookConfig } from 'utils/common/constants'
import { PaginationListParamsProps } from 'utils/common/types'
import { reduceArray } from 'utils/helpers/Array'

const LIMIT_DEFAULT_PAGE = 50

const useSwrInfiniteAdapter = <TData, TFilter>(
  filters: TFilter,
  fetcher: (filters: TFilter & PaginationListParamsProps) => Promise<AxiosResponse<TData[]>>,
  {
    prefixKey,
    limitByPage = LIMIT_DEFAULT_PAGE,
    logicalExclusion,
    swrInfiniteConfiguration
  }: SwrAdapterOptionsProps<TData>
) => {
  const [hasMore, setHasMore] = useState(false)

  const {
    data,
    error,
    isValidating,
    size,
    setSize,
    revalidate,
    mutate
  } = useSWRInfinite(
    swrInfiniteHookDefineKeyService(prefixKey, filters),
    swrInfiniteHookFetcherService(limitByPage, filters, fetcher, setHasMore),
    { ...SwrInfiniteHookConfig, ...swrInfiniteConfiguration }
  )

  const loadMore = async () => await setSize(size + 1)

  const executeLogicalExclusion = async (exclusionData: TData) => {
    if (!logicalExclusion) throw new Error('Exlusion Logical no configured in this hook!')

    await logicalExclusionWithMutateService({
      exclusionData,
      dataKey: logicalExclusion.exclusionKey,
      logicalExclusionType: logicalExclusion.exclusionType,
      removeDataOnInactive: logicalExclusion.removeDataOnInactive,
      mutate
    })
  }

  const onPressLogicalExclusion = (customer: TData) => async () => await executeLogicalExclusion(customer)

  const dataAdapted: TData[] = logicalExclusion
    ? populateSwrDataExclusionInfoService(data, logicalExclusion.exclusionKey, logicalExclusion.exclusionType)
    : !data
        ? []
        : reduceArray(data, (prev, next) => ([...prev, ...next]))

  return {
    data: dataAdapted,
    count: dataAdapted.length,
    error,
    isValidating,
    hasMore,
    page: size,
    loadMore,
    revalidate,
    mutate,
    onPressLogicalExclusion
  }
}

export default useSwrInfiniteAdapter
