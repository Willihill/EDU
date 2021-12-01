import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useCourses } from 'hooks/Course'

import { generateAdminCourseConsultColumns } from 'services/CourseService/Client'

const AdminCoursesScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPressNew,
    onPressEdit
  } = useCourses()

  return (
    <PageLayout>
      <ConsultPage.Container>
        <ConsultPage.Header
          title='Cursos'
          labelButtonNew='Novo curso'
          onPressNew={onPressNew}
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
            columns={generateAdminCourseConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default AdminCoursesScreen
