import { useState } from 'react'

import { ConfigFormPushProps } from 'services/FormService/types'

const useForm = () => {
  const [form, setForm] = useState<ConfigFormPushProps[]>([])

  const updateFormData = (questionID: number, predicate: (section: ConfigFormPushProps) => ConfigFormPushProps) => {
    setForm(form
      .map(formResp => {
        return formResp.id === questionID
          ? predicate(formResp)
          : formResp
      })
    )
  }

  const onChangeQuestion = (questionID: number) =>
    (optionId: number, isSelected: boolean) => {
      updateFormData(questionID, question => ({ ...question, radioOrCheckOptions: question.taskItems.map(option => option.id === optionId ? { ...option, isCheckedUser: isSelected } : option) }))
    }

  const onChangeParagraphAnswer = (questionId: number) =>
    (answer: string) =>
      updateFormData(questionId, itemForm => ({ ...itemForm, answer }))

  const onChangeShortAnswer = (questionId: number) =>
    (answer: string) =>
      updateFormData(questionId, itemForm => ({ ...itemForm, answer }))

  return {
    form,
    onChangeQuestion,
    onChangeParagraphAnswer,
    onChangeShortAnswer
  }
}

export default useForm
