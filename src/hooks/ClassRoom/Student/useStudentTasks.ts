import Router from 'next/router'

import useSwrAdapter from 'hooks/useSwrAdapter'

import { getStudentTasksApi } from 'services/StudentService/Client/api'
import { StudentTaskListProps } from 'services/StudentService/types'

const PREFIX_KEY = '/Student/ClassRoom/Tasks/'

const useStudentTasks = () => {
  const hookDataProps = useSwrAdapter(
    null,
    getStudentTasksApi,
    {
      prefixKey: PREFIX_KEY
    }
  )

  const onPresTask = ({ id, isDone, canViewResult, classRoomSubject }: StudentTaskListProps) => {
    if (!isDone) Router.push(`/classroom/subject/${classRoomSubject.id}/task/${id}/response`)
    if (isDone && canViewResult) Router.push(`/classroom/subject/${classRoomSubject.id}/task/${id}/resp`)
    if (isDone && !canViewResult) alert('Você já respondeu esse formulário')
  }

  return {
    ...hookDataProps,
    onPresTask
  }
}

export default useStudentTasks
