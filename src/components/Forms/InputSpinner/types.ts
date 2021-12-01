export interface InputSpinnerProps {
  id?: string
  label?: string
  required?: boolean
  disabled?: boolean
  value: number
  step?: number
  min?: number
  max?: number
  decimalPrecision?: number
  onChangeValue?: (text: number) => void
}
