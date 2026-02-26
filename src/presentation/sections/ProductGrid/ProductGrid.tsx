import { useRef } from 'react'
import { m } from 'framer-motion'
import { Button, Badge } from '@components/ui/index.ts'
import { PRODUCTS } from '@application/data/index.ts'
import type { Product } from '@domain/types/index.ts'
import { useScrollAnimation } from '@hooks/index.ts'
import { gsap } from '@infrastructure/gsap/index.ts'
import { springTransition } from '@animations/index.ts'

interface ProductGridProps {
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const sectionRef = useScrollAnimation<HTMLElement>(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        delay: (i % 3) * 0.08,
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="products"
      className="section-padding bg-kokoro-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <p className="text-kokoro-muted text-xs tracking-[0.3em] uppercase mb-3">
            Colección
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-kokoro-text">
            Rituales de cuidado
          </h2>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              ref={el => { cardsRef.current[index] = el }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ProductCard ────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <m.div
      className="group bg-kokoro-surface rounded-[40px] overflow-hidden
                 border border-kokoro-border hover:border-kokoro-primary/30
                 transition-colors duration-300 flex flex-col"
      whileHover={{ y: -4 }}
      transition={springTransition}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3">
        <m.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {product.tag && (
          <div className="absolute top-4 left-4">
            <Badge label={product.tag} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-kokoro-muted tracking-widest uppercase mb-1">
              {product.category}
            </p>
            <h3 className="font-heading text-xl font-medium text-kokoro-text">
              {product.name}
            </h3>
          </div>
          <span className="font-heading text-lg font-semibold text-kokoro-primary whitespace-nowrap">
            {product.price}
          </span>
        </div>

        <p className="text-sm text-kokoro-muted leading-relaxed flex-1">
          {product.subtitle}
        </p>

        <Button
          variant="secondary"
          className="w-full mt-2"
          onClick={() => onAddToCart(product)}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al carrito
        </Button>
      </div>
    </m.div>
  )
}
