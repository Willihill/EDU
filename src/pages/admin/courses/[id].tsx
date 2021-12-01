import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { FlexGrid } from 'components/Elements'
import { ButtonSecondary, ButtonIconSmall, InputSpinner, InputTextWit } from 'components/Forms'
import { ButtonIconSmallIcon, ButtonIconSmallTheme } from 'components/Forms/ButtonIconSmall/types'
import { ButtonSecondaryIcon, ButtonSecondaryTheme } from 'components/Forms/ButtonSecondary/types'
import { PageLayout } from 'components/Layout'
import { RowActions, ScrollControll } from 'components/Widget'

import { useCoursePush } from 'hooks/Course'

import { generateAdminCourseSubjectColumns } from 'services/CourseService/Client'
import { serverGetCourseByIdService } from 'services/CourseService/Server'
import { CoursePushProps } from 'services/CourseService/types'

import styles from 'styles/pages/Admin/Courses/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const AdminCoursePushScreen = (props: PageRegisterProps<CoursePushProps>) => {
  const {
    name,
    duration,
    newSubjectName,
    subjects,
    loading,
    onChangeName,
    onChangeDuration,
    onChangeNewSubjectName,
    onPressSubmiteCoursePush,
    onPressAddSubject,
    onPressRemoveSubject,
    setCoursePushData,
    resetCoursePush
  } = useCoursePush()

  useEffect(() => {
    resetCoursePush()
    if (props.data) setCoursePushData(props.data)
  }, [])

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <InputTextWit
            placeholder='Título'
            fontSize={20}
            value={name}
            onChangeText={onChangeName}
          />

          <div className={styles.bottomHeader}>
            <div>
              <InputSpinner
                label='Semestres'
                value={duration}
                onChangeValue={onChangeDuration}
              />
            </div>
            <ButtonIconSmall
              label='Salvar'
              loading={loading}
              icon={ButtonIconSmallIcon.SaveOutline}
              theme={ButtonIconSmallTheme.BlueDark}
              onPress={onPressSubmiteCoursePush}
            />
          </div>
        </div>

        <div className={styles.content}>
          <h1>Matérias</h1>

          <div className={styles.addMaterial}>
            <InputTextWit
              placeholder='Nome da matéria'
              fontSize={12}
              value={newSubjectName}
              onChangeText={onChangeNewSubjectName}
            />

            <ButtonSecondary
              label='Adicionar'
              disabled={loading}
              icon={ButtonSecondaryIcon.Plus}
              theme={ButtonSecondaryTheme.Green}
              onPress={onPressAddSubject}
            />
          </div>

          <ScrollControll>
            <FlexGrid
              data={subjects}
              columns={generateAdminCourseSubjectColumns((i, idx) => <RowActions onPressRemove={onPressRemoveSubject(idx)} />)}
            />
          </ScrollControll>
        </div>
      </div>
    </PageLayout>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = parseNumeric(context.params?.id as string)
  const pageProps: PageRegisterProps<CoursePushProps> = {
    isNotFound: false,
    isNew: context.params?.id?.toString().toLowerCase() === 'new'
  }

  if (!pageProps.isNew && id) {
    const { err, resp } = await asyncPromiseSimple(serverGetCourseByIdService(id))

    // TODO Quando não existir retornar para 404
    if (!resp) throw new Error(err?.message)

    pageProps.data = resp
  }

  return {
    props: pageProps
  }
}

export default AdminCoursePushScreen
