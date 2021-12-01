export enum LoadingIndicatorTheme {
  BlueDark = 'LoadingIndicatorThemeBlueDark',
  BlueLight = 'LoadingIndicatorThemeBlueLight',
  Gray = 'LoadingIndicatorThemeGray',
  White = 'LoadingIndicatorThemeWhite'
}

export interface LoadingIndicatorProps {
  theme?: LoadingIndicatorTheme
  speed?: number
  size?: number
}
