export enum ContainerFetchTheme {
  White = 'ContainerFetchThemeWhite',
  BlueDark = 'ContainerFetchThemeBlueDark'
}

export interface ContainerFetchProps {
  error?: Error
  countData: number
  hasMore?: boolean
  loading: boolean
  theme?: ContainerFetchTheme
  children: React.ReactChild | React.ReactChild[]
  revalidateData?: () => Promise<any>
  loadMoreData?: () => Promise<any>
}

export interface ContainerFetchContentProps<T> {
  data: T[]
  gap?: number
  renderItem: (data: T) => JSX.Element
}
