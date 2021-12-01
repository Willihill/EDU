import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri'

import styles from 'styles/components/Elements/QuestionFormResult/index.module.scss'

import { FormProps } from './types'

const FormResp = (
  {
    id,
    isRequireActive,
    points,
    title,
    typeOptionQuestion,
    taskItemImages,
    answer,
    radioOrCheckOptions
  }: FormProps) => {
  return (
    <div className={styles.container}>

      <div className={styles.body}>

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
              <p className={styles.inputUser}>{answer}</p>
            </div>
          )}

          {typeOptionQuestion === 'paragraph' && (
            <div className={styles.component}>
              {taskItemImages.map(image => (image.base64 !== null)
                ? <img key={image.id} src={image.base64} className={styles.image} />
                : null)}
              <p className={styles.inputUser}>{answer}</p>
            </div>
          )}

          {typeOptionQuestion === 'radio'
            ? (
              <>
                {radioOrCheckOptions.find(i => i.isCheckedStudent !== i.isCheckedProf)
                  ? (
                    <div className={styles.divWrongCicle}>

                      <div className={styles.test}>
                        <AiOutlineClose className={styles.iconWrong} />
                      </div>
                      <div className={styles.component}>
                        {taskItemImages.map(image => (image.base64 !== null)
                          ? <img key={image.id} src={image.base64} className={styles.image} />
                          : null)}
                        {radioOrCheckOptions.map(i => (
                          <div key={i.id} className={styles.questionRadioCheck}>
                            <div>
                              {i.isCheckedProf && (
                                <div>
                                  <p>{i.letter}.</p>
                                  <FaCheck className={styles.imageCheck} />
                                </div>
                              )}
                              {i.isCheckedStudent && (
                                <div className={styles.questionRadioCheck}>
                                  <p>{i.letter}.</p>
                                  <MdRadioButtonChecked className={styles.iconRadio} />
                                </div>
                              )}
                              {!i.isCheckedStudent && !i.isCheckedProf && (
                                <div className={styles.questionRadioCheck}> <p>{i.letter}.</p>
                                  <MdRadioButtonUnchecked className={styles.iconRadio} />
                                </div>
                              )}
                            </div>
                            <p className={styles.textarea}>{i.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    )
                  : (
                    <div className={styles.divCorrectAnswer}>

                      <div className={styles.test}>
                        <FaCheck className={styles.iconCorrect} />
                      </div>
                      <div className={styles.component}>
                        {taskItemImages.map(image => (image.base64 !== null)
                          ? <img key={image.id} src={image.base64} className={styles.image} />
                          : null)}
                        {radioOrCheckOptions.map(i => (
                          <div key={i.id} className={styles.questionRadioCheck}>
                            {i.isCheckedStudent && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                <MdRadioButtonChecked className={styles.iconRadio} />
                              </div>
                            )}
                            {!i.isCheckedStudent && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                <MdRadioButtonUnchecked className={styles.iconRadio} />
                              </div>
                            )}
                            <p className={styles.textarea}>{i.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
              </>)
            : null}

          {typeOptionQuestion === 'checkbox'
            ? (
              <>
                {radioOrCheckOptions.find(i => i.isCheckedStudent !== i.isCheckedProf)
                  ? (
                    <div className={styles.divWrongCicle}>

                      <div className={styles.test}>
                        <AiOutlineClose className={styles.iconWrong} />
                      </div>
                      <div className={styles.component}>
                        {taskItemImages.map(image => (image.base64 !== null)
                          ? <img key={image.id} src={image.base64} className={styles.image} />
                          : null)}
                        {radioOrCheckOptions.map(i => (
                          <div key={i.id} className={styles.questionRadioCheck}>
                            {i.isCheckedProf && (
                              <div>
                                <p>{i.letter}.</p>
                                <FaCheck className={styles.imageCheck} />
                              </div>
                            )}
                            {i.isCheckedStudent && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                {/* <input type='checkbox' readOnly checked={i.isCheckedUser} value={i.letter} name={`${id}-checkbox`} className={styles.radioOrCheck} /> */}
                                <RiCheckboxFill className={styles.iconCheck} />
                              </div>
                            )}
                            {!i.isCheckedStudent && !i.isCheckedProf && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                {/* <input type='checkbox' readOnly value={i.letter} name={`${id}-checkbox`} className={styles.radioOrCheck} /> */}
                                <RiCheckboxBlankLine className={styles.iconCheck} />
                              </div>
                            )}
                            <p className={styles.textarea}>{i.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    )
                  : (
                    <div className={styles.divCorrectAnswer}>

                      <div className={styles.test}>
                        <FaCheck className={styles.iconCorrect} />
                      </div>
                      <div className={styles.component}>
                        {taskItemImages.map(image => (image.base64 !== null)
                          ? <img key={image.id} src={image.base64} className={styles.image} />
                          : null)}
                        {radioOrCheckOptions.map(i => (
                          <div key={i.id} className={styles.questionRadioCheck}>
                            {i.isCheckedStudent && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                {/* <input type='checkbox' readOnly checked={i.isCheckedUser} value={i.letter} name={`${id}-checkbox`} className={styles.radioOrCheck} /> */}
                                <RiCheckboxFill className={styles.iconCheck} />
                              </div>
                            )}
                            {!i.isCheckedStudent && (
                              <div className={styles.questionRadioCheck}>
                                <p>{i.letter}.</p>
                                {/* <input type='checkbox' readOnly checked={i.isCheckedUser} value={i.letter} name={`${id}-checkbox`} className={styles.radioOrCheck} /> */}
                                <RiCheckboxBlankLine className={styles.iconCheck} />
                              </div>
                            )}
                            <p className={styles.textarea}>{i.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
              </>
              )
            : null}
        </div>
      </div>
    </div>
  )
}

export default FormResp
