import { useState } from 'react'

import { ClassRoomSubjectDataProps } from 'services/ClassRoomSubjectService/types'

const useClassRoomSubject = () => {
  const [classRoomSubjectData, setClassRoomSubjectData] = useState<ClassRoomSubjectDataProps>({
    id: 0,
    name: '',
    teacherName: ''
  })

  return {
    ...classRoomSubjectData,
    setClassRoomSubjectData
  }
}

export default useClassRoomSubject
