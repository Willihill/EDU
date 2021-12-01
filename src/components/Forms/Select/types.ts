import { SwrHookResponseProps } from 'utils/common/types'

export interface SelectDataProps<T> {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  data: T[]
  selectedItem?: string
  searchable?: boolean
  filterProp?: keyof T
  renderItem: (data: T) => React.ReactChild
  onPressItem: (data: T) => any
  onPressRemoveSelectedItem?: () => void
}

export interface SelectFetchProps<T> {
  label?: string
  required?: boolean
  disabled?: boolean
  selectedItem?: string
  rowKey?: keyof T
  renderItem: (data: T) => React.ReactChild
  onPressItem: (data: T) => any
  onPressAddItem?: () => void
  onPressRemoveSelectedItem?: () => void
  hookFetchData: (filter: string) => SwrHookResponseProps<T>
}

export interface SelectFetchRowProps {
  description: string
  isSelected?: boolean
  onPressEdit?: () => void
}
