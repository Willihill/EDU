export interface InputTextProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  name?: string
  required?: boolean
  onChangeText?: (text: string) => void
}
