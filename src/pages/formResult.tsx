import React from 'react'

import { QuestionResultCard } from 'components/Elements/'

import useRespForm from 'hooks/useRespForm'

import styles from 'styles/pages/FormResult/index.module.scss'

const FormResultScreen = () => {
  const {
    formResp

  } = useRespForm()
  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <h1 className={styles.textAreaTitulo}>Atividade Avaliativa</h1>
        <p className={styles.textPrazo}>Prazo 11/11/2021</p>
        <p>Prof: Junior Souza</p>
        <p>Disciplina: Engenharia de Softaware</p>
      </div>

      {formResp.map(question => (
        <QuestionResultCard
          key={question.id}
          {...question}
        />
      ))}
    </div>
  )
}

export default FormResultScreen
