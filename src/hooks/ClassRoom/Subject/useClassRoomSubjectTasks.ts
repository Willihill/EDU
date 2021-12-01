import Router from 'next/router'

import useSwrAdapter from 'hooks/useSwrAdapter'

import { getClassRoomSubjectTasksApi } from 'services/ClassRoomSubjectService/Client/api'
import { ClassRoomSubjectTaskProps } from 'services/ClassRoomSubjectService/types'

const PREFIX_KEY = '/Student/ClassRoom/Subjects/Tasks/'

const useClassRoomSubjectTasks = (classRoomSubjectId: number) => {
  const hookDataProps = useSwrAdapter(
    classRoomSubjectId,
    getClassRoomSubjectTasksApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPressNew = async () => await Router.push(`/classroom/subject/${classRoomSubjectId}/task/new`)
  const onPressEdit = async ({ id }: ClassRoomSubjectTaskProps) => await Router.push(`/classroom/subject/${classRoomSubjectId}/task/${id}`)

  const onPresTask = ({ id, isDone, canViewResult }: ClassRoomSubjectTaskProps) => {
    if (!isDone) Router.push(`/classroom/subject/${classRoomSubjectId}/task/${id}/response`)
    if (isDone && canViewResult) Router.push(`/classroom/subject/${classRoomSubjectId}/task/${id}/resp`)
    if (isDone && !canViewResult) alert('Você já respondeu esse formulário')
  }

  return {
    ...hookDataProps,
    onPressNew,
    onPressEdit,
    onPresTask
  }
}

export default useClassRoomSubjectTasks
