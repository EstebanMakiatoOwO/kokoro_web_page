export interface ThemeColors {
  bg: string
  primary: string
  primaryLight: string
  primaryDark: string
  text: string
  textMuted: string
  surface: string
  border: string
}

export interface ThemeFonts {
  heading: string
  body: string
}

export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
}
