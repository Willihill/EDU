import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'
import { TaskStatus } from 'components/Widget'

import { useStudentTasks } from 'hooks/ClassRoom/Student'

import { generateStudentTaskConsultColumns } from 'services/StudentService/Client'

const StudentTasksScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPresTask
  } = useStudentTasks()

  return (
    <PageLayout>
      <ConsultPage.Container>
        <ConsultPage.Header
          title='Atividades'
        />
        <ContainerFetch.Container
          countData={count}
          error={error}
          loading={isValidating}
          revalidateData={revalidate}
        >
          <FlexGrid
            data={data}
            onPressRow={onPresTask}
            columns={generateStudentTaskConsultColumns(data => <TaskStatus {...data} />)}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default StudentTasksScreen
