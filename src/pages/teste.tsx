import React, { ChangeEvent } from 'react'

import { FormSectionCard } from 'components/Elements'
import { InputDate } from 'components/Forms'

import useCreateForm from 'hooks/useCreateForm'
import useSections from 'hooks/useSections'

import styles from 'styles/pages/UpsetForm/index.module.scss'

const test = () => {
  const {
    sections,
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
    // onChangePrazoDateForm,
    // onChangeViewAnswerForm,
    // onChangeDescriptionForm,
    onChangeSectionNota,
    onChangeSectionRespNull
  } = useSections()

  const {
    viewAnswer,
    deadline,
    description,
    onChangeDeadline,
    onChangeDescription,
    onChangeViewAnswer,
    onChangeSection,
    onSubmitCreateForm
    // setFormData
  } = useCreateForm()

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
              <h3>Prazo de entrega:</h3>
              <div className={styles.InputDate}>
                {/* <InputDate
                  date={deadline}
                  onChangeDate={onChangeDeadline}
                /> */}
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
          />

        ))}
      </div>
    </div>
  )
}
export default test
