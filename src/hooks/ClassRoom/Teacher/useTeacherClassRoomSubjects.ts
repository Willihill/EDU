import useSwrAdapter from 'hooks/useSwrAdapter'

import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'
import { getTeacherClassRoomSubjectsApi } from 'services/TeacherService/Client/api'
import { TeacherClassRoomSubjectListProps } from 'services/TeacherService/types'

const PREFIX_KEY = '/Teacher/ClassRoom/Subjects/'

const useTeacherClassRoomSubjects = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getTeacherClassRoomSubjectsApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressEdit = async ({ id }: TeacherClassRoomSubjectListProps) => await NavigationService.navigateToRoute(NavigationRoutes.ClassRoomSubjectPushEdit, id)

  return {
    ...hookDataProps,
    onPressEdit
  }
}

export default useTeacherClassRoomSubjects
