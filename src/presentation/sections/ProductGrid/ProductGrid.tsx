import { useRef, useMemo, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
// import { Button, Badge } from '@components/ui/index.ts'
import { Badge } from '@components/ui/index.ts'
import { useProducts } from '@hooks/index.ts'
import type { Product } from '@domain/types/index.ts'
import { useScrollAnimation } from '@hooks/index.ts'
import { gsap } from '@infrastructure/gsap/index.ts'
import { springTransition } from '@animations/index.ts'

const ALL_CATEGORY = 'Todos'

// interface ProductGridProps {
//   onAddToCart: (product: Product) => void
// }

// export function ProductGrid({ onAddToCart }: ProductGridProps) {
export function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const { products, loading, error } = useProducts({ activeOnly: true })

  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category))]
    return [ALL_CATEGORY, ...unique]
  }, [products])

  const filteredProducts = useMemo(
    () => activeCategory === ALL_CATEGORY
      ? products
      : products.filter(p => p.category === activeCategory),
    [activeCategory, products],
  )

  useScrollAnimation(sectionRef, () => {
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

  if (loading) {
    return (
      <section id="products" className="section-padding bg-kokoro-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 md:mb-14">
            <p className="text-kokoro-muted text-xs tracking-[0.3em] uppercase mb-3">
              Colección
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-kokoro-text">
              Nuestros productos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-kokoro-surface rounded-[40px] overflow-hidden border border-kokoro-border animate-pulse"
              >
                <div className="aspect-4/3 bg-kokoro-border" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-16 bg-kokoro-border rounded" />
                  <div className="h-5 w-3/4 bg-kokoro-border rounded" />
                  <div className="h-4 w-full bg-kokoro-border rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="section-padding bg-kokoro-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-kokoro-muted">No se pudieron cargar los productos.</p>
        </div>
      </section>
    )
  }

  if (products.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-label="Catálogo de productos KOKORO"
      className="section-padding bg-kokoro-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <p className="text-kokoro-muted text-xs tracking-[0.3em] uppercase mb-3">
            Colección
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-kokoro-text">
            Nuestros productos
          </h2>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                border
                ${activeCategory === category
                  ? 'bg-kokoro-primary text-white border-kokoro-primary'
                  : 'bg-kokoro-surface text-kokoro-muted border-kokoro-border hover:border-kokoro-primary/40 hover:text-kokoro-text'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={el => { cardsRef.current[index] = el }}
              >
                {/* onAddToCart comentado — descomentar si se activa e-commerce */}
                {/* <ProductCard product={product} onAddToCart={onAddToCart} /> */}
                <ProductCard product={product} />
              </div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── ProductCard ────────────────────────────────────────────────────────────────

// interface ProductCardProps {
//   product: Product
//   onAddToCart: (product: Product) => void
// }

interface ProductCardProps {
  product: Product
}

// function ProductCard({ product, onAddToCart }: ProductCardProps) {
function ProductCard({ product }: ProductCardProps) {
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
          src={product.imageUrl}
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
        <div>
          <p className="text-xs text-kokoro-muted tracking-widest uppercase mb-1">
            {product.category}
          </p>
          <h3 className="font-heading text-xl font-medium text-kokoro-text">
            {product.name}
          </h3>
        </div>

        {/* Precio comentado — descomentar si se activa e-commerce
        <span className="font-heading text-lg font-semibold text-kokoro-primary whitespace-nowrap">
          {product.price}
        </span>
        */}

        <p className="text-sm text-kokoro-muted leading-relaxed flex-1">
          {product.subtitle}
        </p>

        {/* Botón de carrito comentado — descomentar si se activa e-commerce
        <Button
          variant="secondary"
          className="w-full mt-2"
          onClick={() => onAddToCart(product)}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al carrito
        </Button>
        */}
      </div>
    </m.div>
  )
}
