export interface FlexCalendarProps {
  visible: boolean
  date: string
  navigationLeve?: FlexCalendarNavigationLevel
  theme?: FlexCalendarTheme
  align?: FlexCalendarAlign
  onChangeDate: (date: string) => void
}

export interface FlexCalendarYearProps {
  years: number[]
  selectedYear: number
  onPressYear: (year: number) => void
}

export interface FlexCalendarMonthProps {
  isCurrentYear: boolean
  selectedMonth: number
  onPressMonth: (year: number) => void
}

export interface FlexCalendarDayProps {
  days: number[][]
  isCurrentYear: boolean
  isCurrentMonth: boolean
  selectedDay: number
  onPressDay: (year: number) => void
}

export interface FlexCalendarDateChange {
  year?: number
  month?: number
  day?: number
}

export enum FlexCalendarNavigationLevel {
  Year,
  Month,
  Day
}

export enum FlexCalendarTheme {
  White = 'FlexCalendarThemeWhite',
  Purple = 'FlexCalendarThemePurple'
}

export enum FlexCalendarAlign {
  Left = 'FlexCalendarAlignLeft',
  Right = 'FlexCalendarAlignRight'
}
