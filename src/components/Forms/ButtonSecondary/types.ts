export enum ButtonSecondaryTheme {
  BlueDark = 'ButtonSecondaryThemeBlueDark',
  BlueLight = 'ButtonSecondaryThemeBlueLight',
  Gray = 'ButtonSecondaryThemeGray',
  Red = 'ButtonSecondaryThemeRed',
  White = 'ButtonSecondaryThemeWhite',
  Green = 'ButtonSecondaryThemeGreen'
}

export enum ButtonSecondaryIcon {
  FunnelFill = 'BsFunnelFill',
  PersonPlusFill = 'PersonPlusFill',
  SaveOutline = 'FiSave',
  Plus = 'FiPlus'
}

export interface ButtonSecondaryProps {
  icon?: ButtonSecondaryIcon
  stylesCustom?: string
  label: string
  theme?: ButtonSecondaryTheme
  disabled?: boolean
  loading?: boolean
  preventDefault?: boolean
  onPress?: () => void
}
