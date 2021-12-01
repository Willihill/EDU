import useSwrAdapter from 'hooks/useSwrAdapter'

import { getTeacherMonthClassesApi } from 'services/TeacherService/Client/api'

const PREFIX_KEY = '/Teacher/ClassRoom/Month/Classes/'

const useTeacherMonthClasses = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getTeacherMonthClassesApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  return {
    ...hookDataProps
  }
}

export default useTeacherMonthClasses
