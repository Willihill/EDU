import useSwrAdapter from 'hooks/useSwrAdapter'

import { getClassRoomSubjectClassesApi } from 'services/ClassRoomSubjectService/Client/api'

const PREFIX_KEY = '/Student/ClassRoom/Subjects/Classes/'

const useClassRoomSubjectClasses = (classRoomSubjectId: number) => {
  const hookDataProps = useSwrAdapter(
    classRoomSubjectId,
    getClassRoomSubjectClassesApi,
    {
      prefixKey: PREFIX_KEY
    }
  )
  return {
    ...hookDataProps
  }
}

export default useClassRoomSubjectClasses
