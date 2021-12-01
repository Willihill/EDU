import React from 'react'

import { ConsultPage, ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useAdminClassRooms } from 'hooks/ClassRoom/Admin'

import { generateAdminClassRoomConsultColumns } from 'services/ClassRoomService/Client'

const AdminClassRoomsScreen = () => {
  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPressNew,
    onPressEdit
  } = useAdminClassRooms()

  return (
    <PageLayout>
      <ConsultPage.Container>
        <ConsultPage.Header
          title='Turmas'
          labelButtonNew='Nova turma'
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
            columns={generateAdminClassRoomConsultColumns()}
          />
        </ContainerFetch.Container>
      </ConsultPage.Container>
    </PageLayout>
  )
}

export default AdminClassRoomsScreen
