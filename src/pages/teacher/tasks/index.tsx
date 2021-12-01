import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useTeacherTasks } from 'hooks/ClassRoom/Teacher'

import { generateTeacherTaskConsultColumns } from 'services/TeacherService/Client'

const TeacherTasksScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPresTask
  } = useTeacherTasks()

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
            columns={generateTeacherTaskConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default TeacherTasksScreen
