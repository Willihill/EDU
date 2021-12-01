import useSwrAdapter from 'hooks/useSwrAdapter'

import { getUniversityAmountApi } from 'services/UniversityService/Client/api'

const PREFIX_KEY = '/University/Amount/'

const useUniversityAmount = () => {
  const { data, ...hookDataProps } = useSwrAdapter(
    null,
    getUniversityAmountApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const { studentsCount, teachersCount, classRoomsCount } = data?.[0] ?? {}

  return {
    ...hookDataProps,
    studentsCount,
    teachersCount,
    classRoomsCount
  }
}

export default useUniversityAmount
