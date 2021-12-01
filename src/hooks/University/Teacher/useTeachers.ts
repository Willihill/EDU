import useSwrAdapter from 'hooks/useSwrAdapter'

import { getUniversityTeachersApi } from 'services/UniversityService/Client/api'
import { UniversityTeacherListFilters } from 'services/UniversityService/types'

const PREFIX_KEY = '/Admin/Teachers/'

const useTeachers = (filters?: UniversityTeacherListFilters) => {
  const hookDataProps = useSwrAdapter(
    filters,
    getUniversityTeachersApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  return {
    ...hookDataProps
  }
}

export default useTeachers
