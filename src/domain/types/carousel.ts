export interface CarouselSlide {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly ctaLabel?: string
  readonly ctaHref?: string
  readonly imageUrl: string
  readonly sortOrder: number
  readonly active: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export interface CarouselSlideInput {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl: string
  sortOrder: number
  active: boolean
}
