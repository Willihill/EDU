export interface InputTextWitProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  name?: string
  required?: boolean
  fontSize?: number | string
  onChangeText?: (text: string) => void
}
