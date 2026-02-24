export const BRAND_IDENTITY = {
  name: 'KOKORO',
  nameKanji: '心',
  tagline: '心 — La esencia de la belleza, desde adentro.',
  subtagline: 'Cosméticos de lujo japonés creados con intención.',
  philosophy: 'Creemos que la belleza no es una máscara, sino un ritual. Cada fórmula nace de siglos de sabiduría botánica japonesa, destilada en su forma más pura.',
  colors: {
    bg: '#FFFAF5',
    primary: '#C47F6B',
    primaryLight: '#D4A090',
    primaryDark: '#A66855',
    text: '#2D2D2D',
    textMuted: '#7A7570',
    surface: '#FFF5EE',
    border: '#EDE3DC',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  social: {
    instagram: '#',
    pinterest: '#',
    twitter: '#',
  },
} as const

export interface Product {
  id: number
  name: string
  subtitle: string
  price: string
  category: string
  image: string
  tag?: string
  featured?: boolean
}

export const PRODUCT_CATALOG: Product[] = [
  {
    id: 1,
    name: 'Sakura Serum',
    subtitle: 'Esencia de flor de cerezo con ácido hialurónico para renovación celular profunda',
    price: '$1,290',
    category: 'Sérum',
    image: 'https://picsum.photos/seed/kokoro-serum/600/800',
    tag: 'Más vendido',
    featured: true,
  },
  {
    id: 2,
    name: 'Wabi-Sabi Cream',
    subtitle: 'Belleza imperfecta, nutrición perfecta',
    price: '$980',
    category: 'Crema',
    image: 'https://picsum.photos/seed/kokoro-cream/600/500',
  },
  {
    id: 3,
    name: 'Tsuki Face Oil',
    subtitle: 'Ritual lunar de flor de luna prensada en frío',
    price: '$1,590',
    category: 'Aceite Facial',
    image: 'https://picsum.photos/seed/kokoro-oil/600/500',
    tag: 'Nuevo',
  },
  {
    id: 4,
    name: 'Ma Toner',
    subtitle: 'Hidratación del espacio negativo — menos es más',
    price: '$790',
    category: 'Tónico',
    image: 'https://picsum.photos/seed/kokoro-toner/600/500',
  },
  {
    id: 5,
    name: 'Zen Cleanser',
    subtitle: 'Espuma para el ritual matutino consciente',
    price: '$650',
    category: 'Limpiador',
    image: 'https://picsum.photos/seed/kokoro-cleanser/600/500',
  },
]
