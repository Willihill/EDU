import { FlexCalendarProps } from 'components/Elements/FlexCalendar/types'

export interface InputDateProps extends Omit<FlexCalendarProps, 'visible'> {
  label?: string
  required?: boolean
  disabled?: boolean
}
