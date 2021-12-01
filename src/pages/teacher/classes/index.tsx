import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useTeacherMonthClasses } from 'hooks/ClassRoom/Teacher'

import { generateTeacherMonthClassConsultColumns } from 'services/TeacherService/Client'

const TeacherClassesScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate
  } = useTeacherMonthClasses()
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
            columns={generateTeacherMonthClassConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default TeacherClassesScreen
