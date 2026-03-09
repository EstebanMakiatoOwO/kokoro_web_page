import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'

export interface ICarouselRepository {
  getAll(): Promise<CarouselSlide[]>
  getActive(): Promise<CarouselSlide[]>
  create(input: CarouselSlideInput): Promise<CarouselSlide>
  update(id: string, input: Partial<CarouselSlideInput>): Promise<CarouselSlide>
  delete(id: string): Promise<void>
}
