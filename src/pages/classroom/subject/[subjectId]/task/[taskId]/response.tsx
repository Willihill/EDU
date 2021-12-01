import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { QuestionCard } from 'components/Elements/'

import useCreateForm from 'hooks/useCreateForm'

import { serverGetFormResponseByIdService } from 'services/FormService/Server'
import { ConfigFormPushProps } from 'services/FormService/types'

import styles from 'styles/pages/Form/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { dateToInput } from 'utils/helpers/Date'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const FormResponseScreen = (props: PageRegisterProps<ConfigFormPushProps>) => {
  const {
    description,
    deadline,
    teacherName,
    subjectName,
    sections,
    onChangeUserRespChecked,
    onChangeParagraphAnswer,
    onChangeShortAnswer,
    setSections,
    onChangeClassSubjectId,
    setFormData,
    onSubmitResponseForm
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
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.textAreaTitulo}>{description}</h1>
          <p className={styles.textPrazo}>Prazo {dateToInput(deadline)}</p>
          <p>Prof: {teacherName}</p>
          <p>Disciplina: {subjectName}</p>
        </div>

        {sections.map(question => (
          <div key={question.id} className={styles.main}>
            <QuestionCard
              key={question.id.toString()}
              {...question}
              onChangeUserRespCheckedOption={onChangeUserRespChecked(question.id)}
              // onChangeAnswerQuestion={onChangeUserRespChecked(question.id)}
              onChangeParagraphAnswerQuestion={onChangeParagraphAnswer(question.id)}
              onChangeShortAnswerQuestion={onChangeShortAnswer(question.id)}
            />
          </div>
        ))}
      </div>

      <button className={styles.btn} onClick={onSubmitResponseForm} type='submit'>Enviar</button>
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
    const { err, resp } = await asyncPromiseSimple(serverGetFormResponseByIdService(classSubjectId, taskId))

    // TODO Quando não existir retornar para 404
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

export default FormResponseScreen
