import { ClassRoomPushSubjectProps } from 'services/ClassRoomService/types'

import { SwrHookResponseProps } from 'utils/common/types'

import { useAdminClassRoomPush } from './index'

const useAdminClassRoomPushSubjects = (filter?: string): SwrHookResponseProps<ClassRoomPushSubjectProps> => {
  const {
    subjects
  } = useAdminClassRoomPush()

  return {
    data: subjects.filter(i => !filter || i.courseSubject.name.includes(filter)),
    isValidating: false,
    revalidate: async () => false
  }
}

export default useAdminClassRoomPushSubjects
