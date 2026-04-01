import { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@components/ui/index.ts'
import { useCarousel, useSettings } from '@hooks/index.ts'

export function Carousel() {
  const { slides, loading: slidesLoading } = useCarousel({ activeOnly: true })
  const { settings, loading: settingsLoading } = useSettings()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [slides.length, next])

  if (settingsLoading || slidesLoading) return null
  if (!settings?.carouselEnabled || slides.length === 0) return null

  const slide = slides[current]

  return (
    <section className="relative w-full overflow-hidden bg-kokoro-surface">
      <div className="relative h-64 sm:h-80 md:h-96">
        <AnimatePresence mode="wait">
          <m.div
            key={slide.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              width={1200}
              height={400}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-lg">
                  <h3 className="font-heading text-2xl md:text-4xl font-semibold text-white mb-2">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="text-white/80 text-sm md:text-base mb-4">{slide.subtitle}</p>
                  )}
                  {slide.ctaLabel && slide.ctaHref && (
                    <a
                      href={slide.ctaHref}
                      className="inline-block px-6 py-2.5 bg-white text-kokoro-text text-sm font-medium
                                 rounded-full hover:bg-kokoro-primary hover:text-white transition-colors"
                    >
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm
                         rounded-full text-white hover:bg-white/40 transition-colors z-10"
              aria-label="Slide anterior"
            >
              <Icon icon={ChevronLeft} size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm
                         rounded-full text-white hover:bg-white/40 transition-colors z-10"
              aria-label="Siguiente slide"
            >
              <Icon icon={ChevronRight} size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
                  aria-label={`Ir a slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
