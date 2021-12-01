export enum ToggleTheme {
  Green = 'ToggleThemeGreen'
}

export interface ToggleProps {
  active: boolean
  theme?: ToggleTheme
  onPressToggle: () => any
}
