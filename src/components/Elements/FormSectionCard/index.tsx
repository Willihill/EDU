import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { FaCheckSquare, FaRegPlusSquare } from 'react-icons/fa'
import { GrDuplicate } from 'react-icons/gr'
import { ImParagraphLeft } from 'react-icons/im'
import { IoMdRadioButtonOn } from 'react-icons/io'
import { MdShortText } from 'react-icons/md'

import styles from 'styles/components/Elements/FormSectionCard/index.module.scss'

import { FormsSectionCardProps } from './types'

const Forms = ({
  id,
  title,
  isRequireActive,
  isImageSelected,
  taskItemImages,
  typeOptionQuestion,
  radioOrCheckOptions,
  text,
  points,
  onChangeTitle,
  onChangeRequire,
  onChangeImageSelected,
  onPressInsertOption,
  onChangeOptionDescription,
  onExcludeOption,
  onPressCopySection,
  onExcludeSection,
  onChangeActualOption,
  onChangeAnswerQuestion,
  onPressAddSection,
  onExcludeImage,
  onChangeNotaQuestion,
  onChangeSectionNullResp
}: FormsSectionCardProps) => {
  const [titleHeight, setTitleHeight] = useState(42)
  const titleRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTitleHeight(titleRef.current?.scrollHeight ?? titleHeight)
  }, [title])

  const onChangeSecionTitle = (event: ChangeEvent<HTMLTextAreaElement>) => onChangeTitle(event.target.value)

  const onChangeSectionRequired = (event: ChangeEvent<HTMLInputElement>) => onChangeRequire(event.target.checked)

  const onChangeSectionNota = (event: ChangeEvent<HTMLInputElement>) => onChangeNotaQuestion(parseInt(event.target.value))

  const onChangeAnswerCheck = (id: number) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked
      onChangeAnswerQuestion(id, isChecked)
    }

  const imageSectionSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const reader = new FileReader()

      reader.onload = function (e) {
        const id = Math.random()
        const base64 = e?.target?.result

        onChangeImageSelected(true, id, base64 as string)
      }

      reader.readAsDataURL(event.target.files[0])
      console.log(event.target.files[0])
    }
  }

  const onChangeActualOptionSection = (event: any) => {
    onChangeSectionNullResp()
    const index = parseInt(event.target.id)

    if (index === 1) {
      onChangeActualOption('Caixas de Seleção', 'checkbox')
    } else if (index === 2) {
      onChangeActualOption('Múltipla Escolha', 'radio')
    } else if (index === 3) {
      onChangeActualOption('Resposta Curta', 'shortResp')
    } else if (index === 4) {
      onChangeActualOption('Parágrafo', 'paragraph')
    }
  }

  const onPressExcludeOption = (id: number) =>
    () => {
      onExcludeOption(id)
    }

  const onPressExcludeImage = (id: number) =>
    () => onExcludeImage(id)

  const onChangeOptionDescriptionInput = (id: number) =>
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeOptionDescription(id, event.target.value)

      onOptionChangeValueControlHeight(event)
    }

  const onOptionChangeValueControlHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.setProperty('height', `${(event.target.scrollHeight).toString()}px`)
  }

  return (
    <div className={styles.formSection}>
      <div className={styles.config1}>
        <textarea
          ref={titleRef}
          className={styles.textAreaQuestion}
          style={{
            height: titleHeight
          }}
          placeholder='Pergunta'
          value={title}
          onChange={onChangeSecionTitle}
        />

        <div className={styles.sectionAddImage}>
          <label className={styles.labelImg}>
            <img src='/assets/test1/icon-image.png' className={styles.addImg} />
            <input
              className={styles.inputFile}
              type='file'
              accept='.jpg,.jpeg,.gif,.png,.mov,.mp4'
              onChange={imageSectionSelected}
            />
          </label>
        </div>

        <div className={styles.dropdown}>

          <div className={styles.actualOption}>
            {typeOptionQuestion === 'shortResp' && (<MdShortText className={styles.imgShortActual} />)}
            {typeOptionQuestion === 'checkbox' && (<FaCheckSquare className={styles.imgActual} />)}
            {typeOptionQuestion === 'radio' && (<IoMdRadioButtonOn className={styles.imgRadioActual} />)}
            {typeOptionQuestion === 'paragraph' && (<ImParagraphLeft className={styles.imgActual} />)}

            {text}
            <img className={styles.iconCaretDown} src='/assets/test1/icon-caret-down.png' />
          </div>

          <div className={styles.dropdownContent}>
            <div className={styles.optionDrop} id='1' onClick={onChangeActualOptionSection}>
              <img className={styles.imgDrop} src='/assets/test1/icon-checked.png' />
              Caixas de Seleção
            </div>
            <div className={styles.optionDrop} id='2' onClick={onChangeActualOptionSection}>
              <img className={styles.imgDrop} src='/assets/test1/icon-radio-checked.png' />
              Múltipla Escolha
            </div>

            <div className={styles.diviser} />

            <div className={styles.optionDrop} id='3' onClick={onChangeActualOptionSection}>
              <img className={styles.imgShortText} src='/assets/test1/icon-short-text.png' />
              Resposta Curta
            </div>
            <div className={styles.optionDrop} id='4' onClick={onChangeActualOptionSection}>
              <img className={styles.imgDrop} src='/assets/test1/icon-paragraph.png' />
              Parágrafo
            </div>

            <div className={styles.diviser} />

            <div className={styles.optionNota}>
              Atribuir Nota:
              <input type='text' placeholder='0' value={points} onChange={onChangeSectionNota} className={styles.inputNota} />
              pontos
            </div>
          </div>
        </div>

      </div>
      <div className={styles.questionSection}>

        {taskItemImages.map((img) => (
          <div key={img.id} className={styles.imgSelected}>
            {img.base64
              ? (
                <img
                  className={styles.imgClose}
                  src='/assets/test1/icon-close.png'
                  alt='CloseIcon'
                  onClick={onPressExcludeImage(img.id)}
                />
                )
              : null}

            <img id='preview' src={img.base64} className={styles.imgPreview} />

          </div>
        ))}

        {(typeOptionQuestion === 'radio' || typeOptionQuestion === 'checkbox')
          ? (
            <div className={styles.radioOrCheck}>
              {radioOrCheckOptions.map((opt, index) => (
                <div key={opt.id.toString()} className={styles.option}>
                  <span className={styles.spanSelectOption}>{opt.letter + '.'}</span>
                  <input
                    name={'test' + id.toString()}
                    value={opt.letter}
                    checked={opt.isCheckedProf}
                    onChange={onChangeAnswerCheck(opt.id)}
                    type={typeOptionQuestion}
                    className={styles.radioOrCheckOption}
                  />
                  <textarea
                    id={opt.id.toString()}
                    className={styles.textAreaOption}
                    placeholder='insere opção'
                    value={opt.description}
                    onChange={onChangeOptionDescriptionInput(opt.id)}
                  />
                  <img
                    src='/assets/test1/icon-remove.png'
                    className={styles.imgRemoveOption}
                    onClick={onPressExcludeOption(opt.id)}
                  />
                </div>
              ))}
            </div>
            )
          : (typeOptionQuestion === 'shortResp')
              ? <p placeholder='Resposta' className={styles.textRespText}>Resposta Curta</p>
              : <p placeholder='Resposta' className={styles.textRespText}>Resposta Longa</p>}

        {typeOptionQuestion === 'checkbox' || typeOptionQuestion === 'radio'
          ? <img src='/assets/test1/icon-add.png' onClick={onPressInsertOption} className={styles.imgAddOption} />
          : null}

      </div>

      <div className={styles.config3}>
        <div className={styles.endResp}>
          {typeOptionQuestion === 'checkbox' || typeOptionQuestion === 'radio'
            ? (
              <div>
                Resposta da questão:
                {radioOrCheckOptions.map(opt => (
                  <div className={styles.resp} key={opt.id}> {opt.isCheckedProf ? opt.letter : null}</div>
                ))}
              </div>
              )
            : null}

        </div>
        <div className={styles.endConfig}>
          {/* <img src='/assets/test1/icon-duplicar.png' className={styles.img} onClick={onPressCopySection} /> */}
          {/* <img src='/assets/test1/icon-new.png' className={styles.img} /> */}
          <GrDuplicate className={styles.imgPlus} onClick={onPressCopySection} />
          <FaRegPlusSquare className={styles.imgPlus} onClick={onPressAddSection} />
          <img src='/assets/test1/icon-excluir.png' className={styles.img} onClick={onExcludeSection} />

          Obrigatória
          <div className={styles.toggleContaine}>
            <input type='checkbox' checked={isRequireActive} className={styles.inputToggle} onChange={onChangeSectionRequired} />
            <div className={styles.slider} id='round' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forms
