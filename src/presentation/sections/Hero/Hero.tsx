import { useRef } from 'react'
import { m } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@components/ui/index.ts'
import { BRAND_IDENTITY } from '../../../constants/brand.ts'
import { useScrollAnimation } from '@hooks/index.ts'
import { gsap } from '@infrastructure/gsap/index.ts'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(sectionRef, () => {
    // ── Entrance Timeline ──────────────────────────────────────────
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.2,
    })

    // Overlay fade out (initial cover → transparent)
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.8 }, 0)
    }

    // Headline lines: slide up from below the clip mask
    const lineRefs = [line1Ref.current, line2Ref.current, line3Ref.current]
    lineRefs.forEach((ref, i) => {
      if (ref) {
        tl.from(ref, { y: '105%', duration: 1.0 }, 0.3 + i * 0.1)
      }
    })

    // Subtitle fade + slide
    if (subRef.current) {
      tl.from(subRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.from(ctaRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
    }

    // ── Parallax on scroll ─────────────────────────────────────────
    if (imageRef.current && sectionRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }
  })

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Bienvenida — KOKORO Cosméticos"
      className="relative min-h-screen flex items-center overflow-hidden bg-kokoro-bg"
    >
      {/* Background image with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform scale-110"
        aria-hidden="true"
      >
        <img
          src="https://picsum.photos/seed/kokoro-hero-bg/1920/1080"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Initial overlay (fades out on entrance) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-kokoro-bg pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Decorative gradient */}
      <div
        className="absolute inset-0 bg-linear-to-r from-kokoro-bg via-kokoro-bg/70 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Kanji eyebrow */}
          <m.p
            className="text-kokoro-muted text-sm tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {BRAND_IDENTITY.nameKanji} &nbsp;·&nbsp; Tu tienda de belleza en Tuxtla
          </m.p>

          {/* Headline — each line in a clip container */}
          <h1 className="font-heading font-semibold leading-[1.05] text-kokoro-text mb-6">
            <div className="clip-reveal overflow-hidden">
              <div ref={line1Ref} className="text-5xl md:text-7xl lg:text-8xl">
                Tu belleza,
              </div>
            </div>
            <div className="clip-reveal overflow-hidden">
              <div ref={line2Ref} className="text-5xl md:text-7xl lg:text-8xl text-kokoro-primary">
                nuestra
              </div>
            </div>
            <div className="clip-reveal overflow-hidden">
              <div ref={line3Ref} className="text-5xl md:text-7xl lg:text-8xl">
                selección.
              </div>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="text-kokoro-muted text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            {BRAND_IDENTITY.subtagline}
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Explorar colección
            </Button>
            <Button variant="secondary" onClick={() => {
              document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Conócenos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-2 text-kokoro-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </m.div>
      </m.div>
    </section>
  )
}
