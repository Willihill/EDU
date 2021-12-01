export enum ButtonIconSmallTheme {
  BlueDark = 'ButtonIconSmallBlueDark',
  Green = 'ButtonIconSmallGreen',
  GreenWhite = 'ButtonIconSmallGreenWhite'
}

export enum ButtonIconSmallIcon {
  FunnelFill = 'BsFunnelFill',
  PersonPlusFill = 'PersonPlusFill',
  SaveOutline = 'FiSave'
}

export interface ButtonIconSmallProps {
  stylesCustom?: string
  label: string
  icon?: ButtonIconSmallIcon
  theme?: ButtonIconSmallTheme
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}
