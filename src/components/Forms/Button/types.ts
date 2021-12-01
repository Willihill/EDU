export enum ButtonTheme {
  BlueDark = 'ButtonThemeBlueDark',
  BlueLight = 'ButtonThemeBlueLight',
  Gray = 'ButtonThemeGray',
  Red = 'ButtonThemeRed',
  White = 'ButtonThemeWhite'
}

export interface ButtonProps {
  stylesCustom?: string
  label: string
  theme?: ButtonTheme
  disabled?: boolean
  loading?: boolean
  preventDefault?: boolean
  onPress?: () => void
}
