import React from 'react'

import { HomeAmountCard } from 'components/Cards'
import { HomeAmountCardIcon } from 'components/Cards/HomeAmountCard/types'
import { ContainerFetch, FlexGrid } from 'components/Elements'
import { PageLayout } from 'components/Layout'

import { useAdminClassRooms } from 'hooks/ClassRoom/Admin'
import { useUniversityAmount } from 'hooks/University'

import { generateAdminClassRoomConsultColumns } from 'services/ClassRoomService/Client'

import styles from 'styles/pages/Admin/Home/index.module.scss'

const AdminHomeScreen = () => {
  const {
    studentsCount,
    teachersCount,
    classRoomsCount
  } = useUniversityAmount()

  const {
    data,
    count,
    error,
    isValidating,
    revalidate,
    onPressEdit
  } = useAdminClassRooms()

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.amounts}>
            <HomeAmountCard
              title='Alunos'
              icon={HomeAmountCardIcon.Studant}
              amount={studentsCount}
            />
            <HomeAmountCard
              title='Professores'
              icon={HomeAmountCardIcon.Teacher}
              amount={teachersCount}
            />
            <HomeAmountCard
              title='Turmas'
              icon={HomeAmountCardIcon.ClassRoom}
              amount={classRoomsCount}
            />
          </div>

          <div className={styles.classRooms}>
            <h1 className={styles.title}>Turmas abertas</h1>

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
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default AdminHomeScreen
