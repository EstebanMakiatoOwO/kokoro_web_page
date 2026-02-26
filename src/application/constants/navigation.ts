import type { NavLink, FooterColumn, SocialLink } from '@domain/types/index.ts'

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Productos', href: '#products' },
  { label: 'Nosotros', href: '#philosophy' },
  { label: 'Contacto', href: '#footer' },
] as const

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
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
] as const

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'instagram', href: '#', label: 'Instagram' },
  { platform: 'pinterest', href: '#', label: 'Pinterest' },
  { platform: 'twitter', href: '#', label: 'Twitter / X' },
] as const
