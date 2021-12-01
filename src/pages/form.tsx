import React from 'react'

import { QuestionCard } from 'components/Elements/'

import useForm from 'hooks/useForm'

import styles from 'styles/pages/Form/index.module.scss'

const FormScreen = () => {
  // const {
  //   form,
  //   onChangeQuestion,
  //   onChangeParagraphAnswer,
  //   onChangeShortAnswer
  // } = useForm()

  const {
    viewAnswer,
    deadline,
    startline,
    taskItems

  } = useCreateForm()

  const onSubmitAnswer = () => console.log(form)

  return (
    <div className={styles.template}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.textAreaTitulo}>Atividade Avaliativa</h1>
          <p className={styles.textPrazo}>Prazo 11/11/2021</p>
          <p>Prof: Junior Souza</p>
          <p>Disciplina: Engenharia de Softaware</p>
        </div>

        {taskItems.map(question => (
          <div key={question.id} className={styles.main}>
            {question.taskItems.map(option => (
              <QuestionCard
                key={option.id.toString()}
                {...option}
                onChangeAnswerQuestion={onChangeQuestion(option.id)}
                onChangeParagraphAnswerQuestion={onChangeParagraphAnswer(option.id)}
                onChangeShortAnswerQuestion={onChangeShortAnswer(option.id)}
              />
            ))}
          </div>
        ))}
      </div>

      <button className={styles.btn} onClick={onSubmitAnswer} type='submit'>Enviar</button>
    </div>
  )
}

export default FormScreen
