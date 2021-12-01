import React, { useEffect, useState } from 'react'

import { GetServerSidePropsContext } from 'next'

import { ClassRoomCalendarWeek, ContainerFetch, ContainerTabPage, FlexGrid, TabPage } from 'components/Elements'
import { ButtonIconSmall, InputTextWit, Select, InputDate, ButtonSecondary } from 'components/Forms'
import { ButtonIconSmallIcon, ButtonIconSmallTheme } from 'components/Forms/ButtonIconSmall/types'
import { ButtonSecondaryIcon, ButtonSecondaryTheme } from 'components/Forms/ButtonSecondary/types'
import { PageLayout } from 'components/Layout'
import { RowActions, ScrollControll, TextCopy } from 'components/Widget'

import { useAdminClassRoomPush } from 'hooks/ClassRoom/Admin'
import { useCourses } from 'hooks/Course'
import { useTeachers } from 'hooks/University/Teacher'

import { generateAdminClassRoomStudenInviteColumns, generateAdminClassRoomSubjectColumns } from 'services/ClassRoomService/Client'
import { classRoomPushSubjectToCommonDataFactory } from 'services/ClassRoomService/factory'
import { serverGetClassRoomByIdService } from 'services/ClassRoomService/Server'
import { ClassRoomPushProps } from 'services/ClassRoomService/types'

import styles from 'styles/pages/Admin/ClassRoomPush/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'
import { cpfMask } from 'utils/helpers/String'

const AdminClassRoomPushScreen = (props: PageRegisterProps<ClassRoomPushProps>) => {
  const [host, setHost] = useState('')
  const {
    id,
    code,
    startDate,
    course,
    coordinator,
    classToken,
    subjects,
    semeterList,
    calendarWeeks,
    studentInvitees,
    inviteCPF,
    loading,
    onChangeCode,
    onChangeStartDate,
    onChangeCourse,
    onChangeCoordinator,
    onChangeSubjectSemester,
    onChangeSubjectTeacher,
    onChangeInviteCPF,
    onPressAddCalendarWeek,
    onPressCopyCalendarWeek,
    onPressAddCalendarWeekDayClass,
    onChangeCalendarWeekDayClassInfo,
    onPressRemoveCalendarWeekDayClass,
    onPressAddInvite,
    onPressSubmiteClassRoomPush,
    setClassRoomPushData,
    resetClassRoomPush
  } = useAdminClassRoomPush()

  useEffect(() => {
    setHost(window.location.host)

    resetClassRoomPush()
    if (props.data) {
      setClassRoomPushData(props.data)
    }
  }, [])

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <InputTextWit
            placeholder='Código'
            fontSize={20}
            value={code}
            onChangeText={onChangeCode}
          />

          <div className={styles.bottomHeader}>
            <div className={styles.bottomHeaderContent}>
              <div>
                <InputDate
                  label='Data de inicio'
                  date={startDate}
                  onChangeDate={onChangeStartDate}
                />
              </div>

              <Select.Fetch
                required
                label='Curso'
                disabled={!!id}
                rowKey='id'
                hookFetchData={filter => useCourses({ name: filter })}
                selectedItem={course.name}
                renderItem={item => <Select.Row description={item.name} isSelected={course.id === item.id} />}
                onPressItem={onChangeCourse}
              />

              <Select.Fetch
                required
                label='Coordenador'
                rowKey='id'
                hookFetchData={filter => useTeachers({ name: filter })}
                selectedItem={coordinator.name}
                renderItem={item => <Select.Row description={item.name} isSelected={coordinator.id === item.id} />}
                onPressItem={onChangeCoordinator}
              />
            </div>
            <ButtonIconSmall
              label='Salvar'
              loading={loading}
              icon={ButtonIconSmallIcon.SaveOutline}
              theme={ButtonIconSmallTheme.BlueDark}
              onPress={onPressSubmiteClassRoomPush}
            />
          </div>
        </div>

        <div className={styles.content}>
          <ContainerTabPage>
            <TabPage
              key='Subjects'
              title='Matérias'
            >
              <ContainerFetch.Container
                countData={subjects.length}
                loading={false}
              >
                <FlexGrid
                  data={subjects}
                  columns={generateAdminClassRoomSubjectColumns(
                    (data, idx) => (
                      <Select.Fetch
                        required
                        rowKey='id'
                        hookFetchData={filter => useTeachers({ name: filter })}
                        selectedItem={data.teacher.name}
                        renderItem={item => <Select.Row description={item.name} isSelected={data.teacher.id === item.id} />}
                        onPressItem={onChangeSubjectTeacher(idx)}
                      />
                    ),
                    (data, idx) => (
                      <Select.Data
                        data={semeterList}
                        selectedItem={data.semester.toString()}
                        renderItem={item => <Select.Row description={item.toString()} isSelected={data.semester === item} />}
                        onPressItem={onChangeSubjectSemester(idx)}
                      />
                    )
                  )}
                />
              </ContainerFetch.Container>
            </TabPage>
            <TabPage
              key='Calendar'
              title='Calendario de aulas'
            >
              <div>
                <ButtonSecondary
                  label='Adicionar semana'
                  icon={ButtonSecondaryIcon.Plus}
                  theme={ButtonSecondaryTheme.Green}
                  onPress={onPressAddCalendarWeek}
                />
              </div>
              <ScrollControll gap={40}>
                {calendarWeeks.map((calendarWeek, idx) => (
                  <ClassRoomCalendarWeek
                    key={calendarWeek.weekNumber.toString()}
                    {...calendarWeek}
                    onPressDuplicate={() => onPressCopyCalendarWeek(calendarWeek.weekNumber)}
                    onPressAddClassSundayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'sunday')}
                    onChangeClassRoomSubjectSundayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'sunday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourSundayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'sunday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourSundayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'sunday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveSundayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'sunday', classIndex)}
                    onPressAddClassMondayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'monday')}
                    onChangeClassRoomSubjectMondayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'monday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourMondayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'monday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourMondayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'monday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveMondayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'monday', classIndex)}
                    onPressAddClassTuesdayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'tuesday')}
                    onChangeClassRoomSubjectTuesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'tuesday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourTuesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'tuesday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourTuesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'tuesday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveTuesdayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'tuesday', classIndex)}
                    onPressAddClassWednesdayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'wednesday')}
                    onChangeClassRoomSubjectWednesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'wednesday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourWednesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'wednesday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourWednesdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'wednesday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveWednesdayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'wednesday', classIndex)}
                    onPressAddClassThursdayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'thursday')}
                    onChangeClassRoomSubjectThursdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'thursday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourThursdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'thursday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourThursdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'thursday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveThursdayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'thursday', classIndex)}
                    onPressAddClassFridayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'friday')}
                    onChangeClassRoomSubjectFridayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'friday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourFridayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'friday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourFridayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'friday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveFridayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'friday', classIndex)}
                    onPressAddClassSaturdayWeekDay={() => onPressAddCalendarWeekDayClass(idx, 'saturday')}
                    onChangeClassRoomSubjectSaturdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'saturday', weekDayClassIndex, 'courseSubject', classRoomPushSubjectToCommonDataFactory(value))}
                    onChangeStartHourSaturdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'saturday', weekDayClassIndex, 'startAt', value)}
                    onChangeEndHourSaturdayWeekDayClass={(value, weekDayClassIndex) => onChangeCalendarWeekDayClassInfo(idx, 'saturday', weekDayClassIndex, 'endAt', value)}
                    onPressRemoveSaturdayWeekDayClass={classIndex => onPressRemoveCalendarWeekDayClass(idx, 'saturday', classIndex)}
                  />
                ))}
              </ScrollControll>
            </TabPage>
            <TabPage
              key='StudentInvites'
              title='Alunos'
            >
              <h1>Adicionar aluno</h1>

              <div
                style={{
                  flexDirection: 'row'
                }}
              >
                <div
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10
                  }}
                >
                  <InputTextWit
                    placeholder='CPF para convite'
                    fontSize={12}
                    value={cpfMask(inviteCPF)}
                    onChangeText={onChangeInviteCPF}
                  />

                  <ButtonSecondary
                    label='Convidar'
                    theme={ButtonSecondaryTheme.Green}
                    onPress={onPressAddInvite}
                  />
                </div>

                {!!classToken && <TextCopy text={`http://${host}/classroom/invite/${classToken}`} />}
              </div>

              <ContainerFetch.Container
                countData={subjects.length}
                loading={false}
              >
                <FlexGrid
                  data={studentInvitees}
                  columns={generateAdminClassRoomStudenInviteColumns((data, idx) => <RowActions onPressRemove={() => {}} />)}
                />
              </ContainerFetch.Container>
            </TabPage>
          </ContainerTabPage>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = parseNumeric(context.params?.id as string)
  const pageProps: PageRegisterProps<ClassRoomPushProps> = {
    isNotFound: false,
    isNew: context.params?.id?.toString().toLowerCase() === 'new'
  }

  if (!pageProps.isNew && id) {
    const { err, resp } = await asyncPromiseSimple(serverGetClassRoomByIdService(context.req, id))

    // TODO Quando não existir retornar para 404
    if (!resp) throw new Error(err?.message)

    pageProps.data = resp
  }

  return {
    props: pageProps
  }
}

export default AdminClassRoomPushScreen
