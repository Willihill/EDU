import { logicalExclusionWithMutateService, populateSwrDataExclusionInfoService, swrHookDefineKeyService, swrHookFetcherService } from 'services/CommonService/Client'
import { SwrAdapterOptionsProps } from 'services/CommonService/Client/types'

import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { SwrHookConfig } from 'utils/common/constants'
import { PaginationListParamsProps } from 'utils/common/types'

const useSwrAdapter = <TData, TFilter>(
  filters: TFilter,
  fetcher: (filters: TFilter & PaginationListParamsProps) => Promise<AxiosResponse<TData[]>>,
  {
    prefixKey,
    logicalExclusion,
    swrConfiguration
  }: SwrAdapterOptionsProps<TData>
) => {
  const {
    data,
    error,
    isValidating,
    revalidate,
    mutate
  } = useSWR(
    swrHookDefineKeyService(prefixKey, filters),
    swrHookFetcherService(fetcher, filters),
    { ...SwrHookConfig, ...swrConfiguration }
  )

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
    : data ?? []

  return {
    data: dataAdapted,
    count: Array.isArray(dataAdapted) ? dataAdapted.length : 0,
    error,
    isValidating,
    revalidate,
    mutate,
    onPressLogicalExclusion
  }
}

export default useSwrAdapter
