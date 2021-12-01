export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  onChangeText?: (text: string) => void
}
