export const BRAND_IDENTITY = {
  name: 'KOKORO',
  nameKanji: '心',
  tagline: '心 — Tu tienda de belleza.',
  subtagline: 'Cosméticos premium seleccionados con intención para tu ritual de belleza.',
  philosophy: 'En KOKORO seleccionamos las mejores marcas de cosmética para ti. Cada producto en nuestra tienda ha sido cuidadosamente elegido para ofrecerte calidad, resultados reales y una experiencia de compra que se siente como un ritual.',
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
  price?: string
  category: string
  image: string
  tag?: string
  featured?: boolean
}

export const PRODUCT_CATALOG: Product[] = [
  {
    id: 1,
    name: 'Bases de Colores',
    subtitle: 'Paleta de bases con tonos variados para lograr una cobertura natural y uniforme en cada tipo de piel.',
    category: 'Bases',
    image: '/products/bases_colores.webp',
    tag: 'Popular',
    featured: true,
  },
  {
    id: 2,
    name: 'Bissu Rubor Líquido',
    subtitle: 'Rubor líquido de larga duración que aporta un rubor fresco y luminoso con acabado natural.',
    category: 'Rubor',
    image: '/products/bissu_rubor_liquid.webp',
  },
  {
    id: 3,
    name: 'Pink Up Glossy Colors',
    subtitle: 'Gloss con pigmentos vibrantes que deja los labios hidratados, brillantes y llenos de color.',
    category: 'Labios',
    image: '/products/pink_up_glossy_colors.webp',
    tag: 'Nuevo',
  },
  {
    id: 4,
    name: 'Pink Up Liquid Concealer',
    subtitle: 'Corrector líquido de alta cobertura para disimular ojeras e imperfecciones al instante.',
    category: 'Corrector',
    image: '/products/pink_up_liquid_concelear.webp',
  },
  {
    id: 5,
    name: 'Pink Up Matte 12H Much',
    subtitle: 'Labial matte de 12 horas con fórmula ultra pigmentada y acabado aterciopelado que no reseca.',
    category: 'Labios',
    image: '/products/pink_up_matte_12h_much.webp',
    featured: true,
  },
  {
    id: 6,
    name: 'Pink Up Organic Brows',
    subtitle: 'Gel para cejas con fórmula orgánica que define, rellena y fija las cejas de forma natural.',
    category: 'Cejas',
    image: '/products/pink_up_organic_brows.webp',
  },
  {
    id: 7,
    name: 'Pink Up PH Lip Fix',
    subtitle: 'Bálsamo labial que reacciona al pH de tus labios creando un tono rosado único y personalizado.',
    category: 'Labios',
    image: '/products/pink_up_ph_mi_fx_as.webp',
    tag: 'Nuevo',
  },
  {
    id: 8,
    name: 'Prosa Máscara Colors',
    subtitle: 'Máscara de pestañas en colores llamativos para un look divertido y fuera de lo común.',
    category: 'Ojos',
    image: '/products/prosa_mascara_colors.webp',
  },
  {
    id: 9,
    name: 'Pink Up Matte 12H',
    subtitle: 'Labial matte clásico de larga duración con colores intensos y fórmula ligera y cómoda.',
    category: 'Labios',
    image: '/products/punk_up_matte_12h.webp',
  },
  {
    id: 10,
    name: 'Super Glossy Up',
    subtitle: 'Gloss de brillo extremo con textura no pegajosa que realza el volumen natural de los labios.',
    category: 'Labios',
    image: '/products/super_glossy_up.webp',
    tag: 'Popular',
  },
  {
    id: 11,
    name: 'Yuya Máscara de Pestañas',
    subtitle: 'Máscara de la colección Yuya que alarga, define y da volumen sin grumos ni irritación.',
    category: 'Ojos',
    image: '/products/yuya_mascara_pestanas.webp',
    featured: true,
  },
]
