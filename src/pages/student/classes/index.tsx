import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useStudentMonthClasses } from 'hooks/ClassRoom/Student'

import { generateStudentMonthClassConsultColumns } from 'services/StudentService/Client'

const StudentClassesScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate
  } = useStudentMonthClasses()
  return (
    <PageLayout>
      <ConsultPage.Container>
        <ConsultPage.Header
          title='Aulas do mês'
        />
        <ContainerFetch.Container
          countData={count}
          error={error}
          loading={isValidating}
          revalidateData={revalidate}
        >
          <FlexGrid
            data={data}
            columnDefaultSort={2}
            columns={generateStudentMonthClassConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default StudentClassesScreen
