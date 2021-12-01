import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { QuestionResultCard } from 'components/Elements/'

import useCreateForm from 'hooks/useCreateForm'

import { serverGetFormAsweredByIdService } from 'services/FormService/Server'
import { ConfigFormPushProps } from 'services/FormService/types'

import styles from 'styles/pages/FormResult/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { dateToInput } from 'utils/helpers/Date'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const FormRespScreen = (props: PageRegisterProps<ConfigFormPushProps | undefined>) => {
  const {
    sections,
    description,
    deadline,
    subjectName,
    teacherName,
    setSections,
    onChangeClassSubjectId,
    setFormData
  } = useCreateForm()

  useEffect(() => {
    if (props.data) {
      onChangeClassSubjectId(props.data.classSubjectId)

      if (props.data.taskItems) {
        setSections(props.data.taskItems)
        setFormData(props.data)
      }
    }
  }, [])

  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <h1 className={styles.textAreaTitulo}>{description}</h1>
        <p className={styles.textPrazo}>Prazo: {dateToInput(deadline)}</p>
        <p>Prof: {teacherName}</p>
        <p>Disciplina: {subjectName}</p>
      </div>

      {sections.map(question => (
        <QuestionResultCard
          key={question.id}
          {...question}
        />
      ))}
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const classSubjectId = parseNumeric(context.params?.subjectId as string)
  const taskId = parseNumeric(context.params?.taskId as string)

  const pageProps: PageRegisterProps<Partial<ConfigFormPushProps>> = {
    isNotFound: false,
    isNew: context.params?.taskId?.toString().toLowerCase() === 'new'
  }

  if (!pageProps.isNew && taskId) {
    const { err, resp } = await asyncPromiseSimple(serverGetFormAsweredByIdService(classSubjectId, taskId, 1))
    // classSubjectId: number, taskId: number, userId: number
    // TODO Quando não existir retornar para 404
    console.log(resp)
    if (!resp) throw new Error(err?.message)

    pageProps.data = resp
  }

  pageProps.data = {
    ...pageProps.data,
    classSubjectId
  }

  return {
    props: pageProps
  }
}

export default FormRespScreen
