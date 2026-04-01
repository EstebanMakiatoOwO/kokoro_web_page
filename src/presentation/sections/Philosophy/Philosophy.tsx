import { useRef } from 'react'
import { m } from 'framer-motion'
import { BRAND_IDENTITY } from '../../../constants/brand.ts'
import { fadeUp, staggerContainer, staggerItem } from '@animations/index.ts'
import { useScrollAnimation } from '@hooks/index.ts'
import { gsap } from '@infrastructure/gsap/index.ts'

const PHILOSOPHY_PILLARS = [
  { value: '50+', label: 'Marcas seleccionadas' },
  { value: '100%', label: 'Productos originales' },
  { value: '♥', label: 'Atención personalizada' },
] as const

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(sectionRef, () => {
    if (imageRef.current && sectionRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }
  })

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-label="Sobre nosotros — Filosofía KOKORO"
      className="section-padding bg-kokoro-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className="relative h-120 md:h-150 rounded-[40px] overflow-hidden order-2 lg:order-1">
            <div
              ref={imageRef}
              className="absolute inset-0 scale-110 will-change-transform"
            >
              <img
                src={`${import.meta.env.BASE_URL}Kokoro_nosotros.webp`}
                alt="Tienda KOKORO en Tuxtla"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-kokoro-surface/40 to-transparent" aria-hidden="true" />

            {/* Floating kanji card */}
            <m.div
              className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-sm
                         rounded-3xl px-6 py-4 border border-kokoro-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-heading text-5xl text-kokoro-primary leading-none">心</p>
              <p className="text-xs text-kokoro-muted tracking-widest mt-1">Kokoro — Corazón</p>
            </m.div>
          </div>

          {/* Text column */}
          <m.div
            className="order-1 lg:order-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <m.p
              variants={staggerItem}
              className="text-kokoro-muted text-xs tracking-[0.3em] uppercase mb-4"
            >
              Sobre nosotros
            </m.p>

            <m.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl font-semibold text-kokoro-text leading-tight mb-6"
            >
              Elegimos por ti lo mejor en belleza.
            </m.h2>

            <m.p
              variants={staggerItem}
              className="text-kokoro-muted text-lg leading-relaxed mb-8"
            >
              {BRAND_IDENTITY.philosophy}
            </m.p>

            {/* Three pillars */}
            <m.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-kokoro-border"
            >
              {PHILOSOPHY_PILLARS.map(pillar => (
                <m.div key={pillar.label} variants={staggerItem}>
                  <p className="font-heading text-3xl font-semibold text-kokoro-primary mb-1">
                    {pillar.value}
                  </p>
                  <p className="text-xs text-kokoro-muted tracking-wide">
                    {pillar.label}
                  </p>
                </m.div>
              ))}
            </m.div>
          </m.div>

        </div>
      </div>
    </section>
  )
}
