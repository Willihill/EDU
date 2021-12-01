import { SectionProps } from 'services/FormService/types'

export interface FormRespProps extends SectionProps {
  onChangeParagraphAnswerQuestion: (answer: string) => void
  onChangeShortAnswerQuestion: (answer: string) => void
  // onChangeAnswerQuestion: (optionId: number, isSelected: boolean) => void
  onChangeUserRespCheckedOption: (id: number, isCheckedStudent: boolean) => void
}
