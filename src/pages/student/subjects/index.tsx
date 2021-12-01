import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useStudentClassRoomSubjects } from 'hooks/ClassRoom/Student'

import { generateStudentClassRoomSubjectConsultColumns } from 'services/StudentService/Client'

const StudentSubjectsScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPressEdit
  } = useStudentClassRoomSubjects()
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
            columns={generateStudentClassRoomSubjectConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default StudentSubjectsScreen
