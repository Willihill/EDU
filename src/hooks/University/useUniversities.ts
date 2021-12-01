
import { getUniversitiesApi } from 'services/UniversityService/Client/api'
import { UniversityProps } from 'services/UniversityService/types'

import useSWR from 'swr'
import { SwrInfiniteHookConfig } from 'utils/common/constants'
import { asyncPromise } from 'utils/helpers/Promise'

const useUniversities = () => {
  const fetcher = async (): Promise<UniversityProps[]> => {
    const { err, resp } = await asyncPromise(getUniversitiesApi())

    if (!resp) throw new Error(err?.response?.data.message)
    return resp.data
  }

  const {
    data,
    error,
    isValidating
  } = useSWR('/Universities/', fetcher, SwrInfiniteHookConfig)

  const universities = data ?? []

  return {
    data: universities,
    count: universities.length,
    error,
    isValidating
  }
}

export default useUniversities
