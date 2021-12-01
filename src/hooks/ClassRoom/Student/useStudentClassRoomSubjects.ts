import useSwrAdapter from 'hooks/useSwrAdapter'

import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'
import { getStudentClassRoomSubjectsApi } from 'services/StudentService/Client/api'
import { StudentClassRoomSubjectListProps } from 'services/StudentService/types'

const PREFIX_KEY = '/Student/ClassRoom/Subjects/'

const useStudentClassRoomSubjects = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getStudentClassRoomSubjectsApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressEdit = async ({ id }: StudentClassRoomSubjectListProps) => await NavigationService.navigateToRoute(NavigationRoutes.ClassRoomSubjectPushEdit, id)

  return {
    ...hookDataProps,
    onPressEdit
  }
}

export default useStudentClassRoomSubjects
