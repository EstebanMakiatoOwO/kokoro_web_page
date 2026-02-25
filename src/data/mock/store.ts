export interface NavLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: NavLink[]
}

export interface SocialLink {
  platform: 'instagram' | 'pinterest' | 'twitter'
  href: string
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Productos', href: '#products' },
  { label: 'Nosotros', href: '#philosophy' },
  { label: 'Contacto', href: '#footer' },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Categorías',
    links: [
      { label: 'Sérum', href: '#products' },
      { label: 'Cremas', href: '#products' },
      { label: 'Aceites', href: '#products' },
    ],
  },
  {
    heading: 'KOKORO',
    links: [
      { label: 'Sobre nosotros', href: '#philosophy' },
      { label: 'Visítanos en Tuxtla', href: '#footer' },
      { label: 'Contacto', href: '#footer' },
    ],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', href: '#', label: 'Instagram' },
  { platform: 'pinterest', href: '#', label: 'Pinterest' },
  { platform: 'twitter', href: '#', label: 'Twitter / X' },
]
