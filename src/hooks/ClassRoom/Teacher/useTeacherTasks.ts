import Router from 'next/router'

import useSwrAdapter from 'hooks/useSwrAdapter'

import { getTeacherTasksApi } from 'services/TeacherService/Client/api'
import { TeacherTaskListProps } from 'services/TeacherService/types'

const PREFIX_KEY = '/Teacher/ClassRoom/Tasks/'

const useTeacherTasks = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getTeacherTasksApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPresTask = async ({ id, classRoomSubject }: TeacherTaskListProps) => await Router.push(`/classroom/subject/${classRoomSubject.id}/task/${id}`)

  return {
    ...hookDataProps,
    onPresTask
  }
}

export default useTeacherTasks
