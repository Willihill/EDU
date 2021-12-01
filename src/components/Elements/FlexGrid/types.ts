import { Paths } from 'utils/common/types'

export interface FlexGridDataProps {
  isEditable?: boolean
  isActive?: boolean
  isExcluding?: boolean
}

export type FlexGridColumnComponent<T> = (data: T, index: number) => JSX.Element

export interface FlexGridColumnProps<T> {
  label: string
  flex?: number
  width?: number
  fixed?: boolean
  orderable?: boolean
  component?: FlexGridColumnComponent<T>
  key: keyof T | Paths<T, 5>
  transform?: (data: any) => string | number
}

export enum FlexGridColumnOrderType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export interface FlexGridColumnOrderProps {
  column: FlexGridColumnProps<any>
  order: FlexGridColumnOrderType
}

export enum FlexGridTheme {
  White = 'FlexGridWhite',
  BlueDark = 'FlexGridBlueDark'
}

export interface FlexGridProps<T extends FlexGridDataProps> {
  data: T[]
  hideBorder?: boolean
  theme?: FlexGridTheme
  columns: Array<FlexGridColumnProps<T>>
  columnDefaultSort?: number
  onPressRow?: (item: T) => void
}
