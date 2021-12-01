import React, { useEffect, ChangeEvent } from 'react'

import { GetServerSidePropsContext } from 'next'

import { FormSectionCard } from 'components/Elements/'
import { InputDate } from 'components/Forms'

import useCreateForm from 'hooks/useCreateForm'
// import useSections from 'hooks/useSections'

import { serverGetFormByIdService } from 'services/FormService/Server'
import { ConfigFormPushProps } from 'services/FormService/types'

import styles from 'styles/pages/UpsetForm/index.module.scss'

import { PageRegisterProps } from 'utils/common/types'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const UpsertFormScreen = (props: PageRegisterProps<ConfigFormPushProps | undefined>) => {
  const {
    viewAnswer,
    deadline,
    description,
    sections,
    startline,
    onChangeClassSubjectId,
    onChangeDeadline,
    onChangeDescription,
    onChangeViewAnswer,
    onSubmitCreateForm,
    onChangeStartline,
    setFormData,
    onPressSectionAdd,
    setSections,
    onChangeSecionTitle,
    onChangeSectionRequire,
    onChangeSectionImgSelected,
    onChangeRadioOrCheck,
    onChangeDescCheckOrRadio,
    onChangeSectionTypeOption,
    onSectionInsertCheckOrRadio,
    onPressRemoveCheckOrRadio,
    onPressSectionCopy,
    onPressExcludeSection,
    onChangeActualOption,
    onChangeCheckAnswerOpt,
    onPressExcludeImage,
    onChangeSectionNota,
    onChangeSectionRespNull,
    onCreateInitialSection
  } = useCreateForm()

  useEffect(() => {
    if (props.isNew) onCreateInitialSection()
    if (props.data) {
      onChangeClassSubjectId(props.data.classSubjectId)

      if (props.data.taskItems) {
        setSections(props.data.taskItems)
        setFormData(props.data)
      }
    }
  }, [])

  const onChangeDescriptionForm = (event: ChangeEvent<HTMLTextAreaElement>) => onChangeDescription(event.target.value)

  const onChangeViewFormAnswer = (event: ChangeEvent<HTMLInputElement>) => onChangeViewAnswer(event.target.checked)

  return (

    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.main}>
          <div className={styles.formHeader}>
            <div className={styles.viewResult}>
              <h3>Exibir respostas após o envio</h3>
              <input type='checkbox' checked={viewAnswer} className={styles.check} onChange={onChangeViewFormAnswer} />
            </div>

            <p className={styles.divider}>|</p>

            <div className={styles.prazoEntrega}>
              <h3>Início:</h3>
              <div className={styles.InputDate}>
                <InputDate
                  date={startline}
                  onChangeDate={onChangeStartline}
                />
              </div>
            </div>

            <p className={styles.divider}>|</p>

            <div className={styles.prazoEntrega}>
              <h3>Fim:</h3>
              <div className={styles.InputDate}>
                <InputDate
                  date={deadline}
                  onChangeDate={onChangeDeadline}
                />
              </div>
            </div>

            <p className={styles.divider}>|</p>

            <button type='submit' className={styles.btn} onClick={onSubmitCreateForm}>Salvar</button>
          </div>
        </div>

        <div className={styles.descriptionForm}>
          <textarea placeholder='Insere uma descrição' value={description} className={styles.textAreaTitulo} onChange={onChangeDescriptionForm} />
        </div>
      </div>

      <div className={styles.section}>
        {sections.map((question, idx) => (
          <FormSectionCard
            key={question.id}
            {...question}
            onChangeTitle={onChangeSecionTitle(question.id)}
            onChangeRequire={onChangeSectionRequire(question.id)}
            onChangeImageSelected={onChangeSectionImgSelected(question.id)}
            onChangeRadioCheck={onChangeRadioOrCheck(question.id)}
            onChangeTypeOption={onChangeSectionTypeOption(question.id)}
            onChangeOptionDescription={onChangeDescCheckOrRadio(question.id)}
            onPressInsertOption={onSectionInsertCheckOrRadio(question.id, { id: Math.random(), description: '', letter: '', isCheckedStudent: false, isCheckedProf: false })}
            onExcludeOption={onPressRemoveCheckOrRadio(question.id)}
            onPressCopySection={onPressSectionCopy(question.id)}
            onExcludeSection={onPressExcludeSection(question.id)}
            onChangeActualOption={onChangeActualOption(question.id)}
            onExcludeImage={onPressExcludeImage(question.id)}
            onChangeNotaQuestion={onChangeSectionNota(question.id)}
            onChangeSectionNullResp={onChangeSectionRespNull(question.id)}
            onChangeAnswerQuestion={onChangeCheckAnswerOpt(question.id)}
            onPressAddSection={onPressSectionAdd(question.id)}
          />

        ))}
      </div>
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
    const { err, resp } = await asyncPromiseSimple(serverGetFormByIdService(classSubjectId, taskId))
    // console.log(resp?.taskItems.map(i => i.radioOrCheckOptions))
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

export default UpsertFormScreen
