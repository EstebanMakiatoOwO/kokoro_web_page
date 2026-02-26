export interface NavLink {
  readonly label: string
  readonly href: string
}

export interface FooterColumn {
  readonly heading: string
  readonly links: readonly NavLink[]
}

export interface SocialLink {
  readonly platform: 'instagram' | 'pinterest' | 'twitter'
  readonly href: string
  readonly label: string
}
