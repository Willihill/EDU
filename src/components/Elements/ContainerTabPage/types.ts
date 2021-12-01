import { TabPageProps } from '../TabPage/types'

export enum ContainerTabPageTheme {
  White = 'ContainerTabPageThemeWhite',
  Gray = 'ContainerTabPageThemeGray',
  Purple = 'ContainerTabPageThemePurple'
}

export type ElementTabPage = React.ReactElement<TabPageProps>

export interface ContainerTabPageProps {
  activeTabPage?: string | number
  theme?: ContainerTabPageTheme
  children: React.ReactElement | React.ReactElement[]
  headerRightContent?: React.ReactChild | React.ReactChild[]
  contentWithPadding?: boolean
  onChangeActiveTabPage?: (key: string | number) => void
}
