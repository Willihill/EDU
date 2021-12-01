export interface ConsultPageProps {
  children: JSX.Element | JSX.Element[]
}

export interface ConsultPageHeaderProps {
  title: string
  labelButtonNew?: string
  onPressFilter?: () => void
  onPressNew?: () => void
}
