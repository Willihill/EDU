import { OptionQuestionType, SectionProps } from 'services/FormService/types'

export interface FormsSectionCardProps extends SectionProps {
  onChangeTitle: (title: string) => void
  onChangeRequire: (isRequireActive: boolean) => void
  onChangeImageSelected: (isImageSelected: boolean, id: number, base64: string) => void
  onChangeRadioCheck: (radioOrCheck: string) => void
  onChangeTypeOption: (typeOption: string) => void
  onPressInsertOption: () => void
  onChangeOptionDescription: (id: number, description: string) => void
  onExcludeOption: (id: number) => void
  onPressCopySection: () => void
  onPressAddSection: () => void
  onExcludeSection: () => void
  onExcludeImage: (id: number) => void
  onChangeActualOption: (text: string, typeOptionQuestion: OptionQuestionType) => void
  onChangeAnswerQuestion: (id: number, isCheckedProf: boolean) => void
  onChangeNotaQuestion: (points: number) => void
  onChangeSectionNullResp: () => void
}
