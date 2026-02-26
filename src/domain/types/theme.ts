export interface ThemeColors {
  readonly bg: string
  readonly primary: string
  readonly primaryLight: string
  readonly primaryDark: string
  readonly text: string
  readonly textMuted: string
  readonly surface: string
  readonly border: string
}

export interface ThemeFonts {
  readonly heading: string
  readonly body: string
}

export interface Theme {
  readonly colors: ThemeColors
  readonly fonts: ThemeFonts
}
