import React, { ChangeEvent, useState, useRef, useEffect } from 'react'

import styles from 'styles/components/Elements/QuestionCard/index.module.scss'

import { FormRespProps } from './types'

const QuestionCard = (
  {
    id,
    title,
    points,
    isRequireActive,
    typeOptionQuestion,
    radioOrCheckOptions,
    taskItemImages,
    answer,
    onChangeParagraphAnswerQuestion,
    onChangeShortAnswerQuestion,
    onChangeUserRespCheckedOption
  }: FormRespProps) => {
  const [answerHeight, setAnswerHeight] = useState(42)
  const answerRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setAnswerHeight(answerRef.current?.scrollHeight ?? answerHeight)
  }, [answer])

  const onChangeParagraphAnswer = (event: ChangeEvent<HTMLTextAreaElement>) => onChangeParagraphAnswerQuestion(event.target.value)

  const onChangeShortAnswer = (event: ChangeEvent<HTMLInputElement>) => onChangeShortAnswerQuestion(event.target.value)

  const onChangeAnswer = (optionId: number) =>
    (event: ChangeEvent<HTMLInputElement>) => onChangeUserRespCheckedOption(optionId, event.target.checked)

  return (
    <div className={styles.container}>

      <div className={styles.question}>

        <div className={styles.numberWithQuestion}>
          <div className={styles.number}>{id + 1}</div>
          {isRequireActive
            ? <h1 className={styles.titleQuestion}>{title}<span className={styles.spanRequire}>*</span></h1>
            : <h1 className={styles.titleQuestion}>{title}</h1>}
          <p className={styles.nota}>{points ? `${points} pontos` : null}</p>
        </div>

        {typeOptionQuestion === 'shortResp' && (
          <div className={styles.component}>
            {taskItemImages.map(image => (image.base64 !== null)
              ? <img key={image.id} src={image.base64} className={styles.image} />
              : null)}
            <input type='text' placeholder='Insere sua Resposta' onChange={onChangeShortAnswer} className={styles.input} />
          </div>
        )}

        {typeOptionQuestion === 'paragraph' && (
          <div className={styles.component}>
            {taskItemImages.map(image => (image.base64 !== null)
              ? <img key={image.id} src={image.base64} className={styles.image} />
              : null)}
            <textarea
              ref={answerRef}
              value={answer}
              placeholder='Insere sua Resposta'
              className={styles.textareaAnswer}
              style={{
                height: answerHeight
              }}
              onChange={onChangeParagraphAnswer}
            />
          </div>
        )}

        {typeOptionQuestion === 'radio' && (
          <div className={styles.component}>
            {taskItemImages.map(image => (image.base64 !== null)
              ? <img key={image.id} src={image.base64} className={styles.image} />
              : null)}
            {radioOrCheckOptions.map(i => (
              <div key={i.id} className={styles.questionRadioCheck}>
                <p>{i.letter}.</p>
                <input type='radio' onChange={onChangeAnswer(i.id)} value={i.letter} name={`${id}-radio`} className={styles.radioOrCheck} />
                <p className={styles.textarea}>{i.description}</p>
              </div>
            ))}
          </div>
        )}

        {typeOptionQuestion === 'checkbox' && (
          <div className={styles.component}>
            {taskItemImages.map(image => (image.base64 !== null)
              ? <img key={image.id} src={image.base64} className={styles.image} />
              : null)}
            {radioOrCheckOptions.map(i => (
              <div key={i.id} className={styles.questionRadioCheck}>
                <p>{i.letter}.</p>
                <input type='checkbox' onChange={onChangeAnswer(i.id)} value={i.letter} name={`${id}-checkbox`} className={styles.radioOrCheck} />
                <p className={styles.textarea}>{i.description}</p>
              </div>
            ))}
          </div>
        )}
        <div />
      </div>
    </div>
  )
}

export default QuestionCard
