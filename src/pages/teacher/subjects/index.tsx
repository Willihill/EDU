import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useTeacherClassRoomSubjects } from 'hooks/ClassRoom/Teacher'

import { generateTeacherClassRoomSubjectConsultColumns } from 'services/TeacherService/Client'

const TeacherSubjectsScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPressEdit
  } = useTeacherClassRoomSubjects()

  return (
    <PageLayout>
      <ConsultPage.Container>
        <ConsultPage.Header
          title='Matérias'
        />
        <ContainerFetch.Container
          countData={count}
          error={error}
          loading={isValidating}
          revalidateData={revalidate}
        >
          <FlexGrid
            data={data}
            onPressRow={onPressEdit}
            columns={generateTeacherClassRoomSubjectConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default TeacherSubjectsScreen
