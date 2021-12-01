import useSwrAdapter from 'hooks/useSwrAdapter'

import { getStudentMonthClassesApi } from 'services/StudentService/Client/api'

const PREFIX_KEY = '/Student/ClassRoom/Month/Classes/'

const useStudentMonthClasses = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getStudentMonthClassesApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  return {
    ...hookDataProps
  }
}

export default useStudentMonthClasses
