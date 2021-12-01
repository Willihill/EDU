export interface InputHourProps {
  label?: string
  required?: boolean
  disabled?: boolean
  hour?: string
  onChangeHour: (hour: string) => void
}
