import { useState } from 'react'

import { SectionRadioOrCheckProps, SectionProps, OptionQuestionType } from 'services/FormService/types'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']

const useSections = () => {
  const [sections, setSections] = useState<SectionProps[]>([{
    id: 1,
    title: '',
    isRequireActive: false,
    isImageSelected: false,
    typeOptionQuestion: 'radio',
    number: 1,
    radioOrCheckOptions: [
      {
        id: 1,
        letter: 'a',
        description: '',
        isCheckedProf: false,
        isCheckedStudent: false
      }
    ],
    text: 'Múltipla Escolha',
    taskItemImages: [],
    answer: '',
    points: 0,
    answerQuestion: []
  }])

  const updateSessionData = (sessionID: number, predicate: (session: SectionProps) => SectionProps) => {
    setSections(sections
      .map(session => {
        return session.id === sessionID
          ? predicate(session)
          : session
      })
    )
  }

  const insertSectionData = (session: SectionProps) => setSections([...sections, session])

  const onChangeSecionTitle = (sessionID: number) =>
    (title: string) =>
      updateSessionData(sessionID, session => ({ ...session, title }))

  const onChangeSectionRequire = (sectionId: number) =>
    (isRequireActive: boolean) =>
      updateSessionData(sectionId, section => ({ ...section, isRequireActive }))

  const onChangeSectionImgSelected = (sectionId: number) =>
    (isImageSelected: boolean, imgId: number, urlImage: string) => {
      console.log(urlImage)
      updateSessionData(sectionId,
        section => ({
          ...section,
          isImageSelected,
          taskItemImages: [...section.taskItemImages, { id: imgId, base64: urlImage }]
        }))
    }

  const onPressExcludeImage = (sectionId: number) =>
    (idImage: number) =>
      updateSessionData(sectionId, section =>
        ({ ...section, taskItemImages: (section.taskItemImages.filter(i => i.id !== idImage)) }))

  const onChangeRadioOrCheck = (sectionId: number) =>
    (radioOrCheck: string) =>
      updateSessionData(sectionId, section => ({ ...section, radioOrCheck }))

  const onChangeSectionTypeOption = (sectionId: number) =>
    (typeOption: string) =>
      updateSessionData(sectionId, section => ({ ...section, typeOption }))

  const onChangeSectionRespNull = (sectionId: number) =>
    () => updateSessionData(sectionId, section => ({ ...section, answerQuestion: [] }))

  const onChangeSectionNota = (sectionId: number) =>
    (points: number) =>
      updateSessionData(sectionId, section => ({ ...section, points }))

  const onChangeActualOption = (sectionId: number) =>
    (text: string, typeOptionQuestion: OptionQuestionType) =>
      updateSessionData(sectionId, section => ({ ...section, text, typeOptionQuestion }))

  const onChangeRespSection = (sectionId: number) =>
    (letterOption: string[]) =>
      updateSessionData(sectionId, section => ({ ...section, answerQuestion: letterOption }))

  const onChangeDescCheckOrRadio = (sectionId: number) =>
    (optionId: number, description: string) =>
      updateSessionData(sectionId,
        section => ({
          ...section,
          radioOrCheckOptions: section.radioOrCheckOptions
            .map(option => option.id === optionId ? ({ ...option, description }) : option)
        })
      )

  const onChangeCheckAnswerOpt = (sectionId: number) =>
    (optionId: number, isSelectedProf: boolean) => {
      updateSessionData(sectionId,
        section => ({
          ...section,
          radioOrCheckOptions: section.radioOrCheckOptions
            .map(option => option.id === optionId ? ({ ...option, isCheckedProf: isSelectedProf }) : option)
        })
      )
    }

  const generateOptionsLetter = (options: SectionRadioOrCheckProps[]): SectionRadioOrCheckProps[] =>
    options
      .sort((cur, prev) => cur.id > prev.id ? -1 : 1)
      .map((option, idx) => ({
        ...option,
        letter: letters[idx]
      }))

  const onPressRemoveCheckOrRadio = (sectionId: number) =>
    (optionId: number) => {
      const sec = sections.find(i => i.id === sectionId)
      const count = sec?.radioOrCheckOptions.length
      if (count) {
        if (count - 1 !== 0) {
          updateSessionData(sectionId, section =>
            ({ ...section, radioOrCheckOptions: generateOptionsLetter(section.radioOrCheckOptions.filter(i => i.id !== optionId)) }))
        }
      }
    }

  const onSectionInsertCheckOrRadio = (sectionId: number, option: SectionRadioOrCheckProps) =>
    () => {
      const existSection = sections.find(i => i.id === sectionId)
      if (existSection) {
        let init
        const count = existSection.radioOrCheckOptions.length
        for (let i = 0; i <= count; i++) {
          init = letters[i]
          option.letter = init
        }
        updateSessionData(sectionId, section => ({ ...section, radioOrCheckOptions: [...section.radioOrCheckOptions, option] }))
      }
    }

  const onPressSectionCopy = (sessionID: number) =>
    () => {
      const section = sections.find(i => i.id === sessionID)
      if (!section) return

      const idSec = Math.random()
      const newSection: SectionProps = {
        id: idSec,
        title: section.title,
        number: section.number + 1,
        isRequireActive: section.isRequireActive,
        isImageSelected: section.isImageSelected,
        typeOptionQuestion: section.typeOptionQuestion,
        radioOrCheckOptions: section.radioOrCheckOptions,
        text: section.text,
        taskItemImages: section.taskItemImages,
        points: section.points,
        answer: section.answer,
        answerQuestion: section.answerQuestion
      }

      insertSectionData(newSection)
    }

  const onPressExcludeSection = (sectionId: number) =>
    () => {
      const count = sections.length
      if (count - 1 !== 0) { setSections(sections.filter(i => i.id !== sectionId)) }
    }

  return {
    sections,
    onChangeSecionTitle,
    onChangeSectionRequire,
    onChangeSectionImgSelected,
    onChangeRadioOrCheck,
    onChangeSectionTypeOption,
    onChangeDescCheckOrRadio,
    onSectionInsertCheckOrRadio,
    onPressRemoveCheckOrRadio,
    onPressSectionCopy,
    onPressExcludeSection,
    onChangeActualOption,
    onChangeRespSection,
    onPressExcludeImage,
    onChangeSectionNota,
    onChangeSectionRespNull,
    onChangeCheckAnswerOpt
  }
}

export default useSections
