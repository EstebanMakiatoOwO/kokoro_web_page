import { useState } from 'react'
import { m, useScroll, useMotionValueEvent } from 'framer-motion'
// import { ShoppingBag, Menu, X } from 'lucide-react'
import { Menu, X } from 'lucide-react'
import { Icon } from '@components/ui/index.ts'
import { NAV_LINKS } from '@application/constants/index.ts'
import { BRAND_IDENTITY } from '../../../constants/brand.ts'
// import { springTransition } from '@animations/index.ts'

// interface NavbarProps {
//   cartItemCount: number
// }

// export function Navbar({ cartItemCount }: NavbarProps) {
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 60)
  })

  return (
    <m.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'glass border-b border-kokoro-border py-3' : 'py-6'}
      `}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Navegación principal">
        {/* Logo */}
        <a href="#hero" className="flex items-baseline gap-2 group">
          <img src={`${import.meta.env.BASE_URL}Kokoro_logo_letras.png`} alt={BRAND_IDENTITY.name} width={120} height={28} className='h-7 w-auto'/>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-kokoro-muted hover:text-kokoro-text
                           tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden p-1 text-kokoro-text
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kokoro-primary"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <Icon icon={menuOpen ? X : Menu} size={22} />
        </button>

        {/* Cart icon — comentado por ahora, descomentar si se activa e-commerce
        <div className="flex items-center gap-4">
          <button
            className="relative p-1 text-kokoro-text hover:text-kokoro-primary transition-colors duration-200
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kokoro-primary"
            aria-label="Carrito de compras"
          >
            <Icon icon={ShoppingBag} size={22} />
            {cartItemCount > 0 && (
              <m.span
                key={cartItemCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springTransition}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full
                           bg-kokoro-primary text-white text-[10px]
                           flex items-center justify-center font-medium"
              >
                {cartItemCount}
              </m.span>
            )}
          </button>
        </div>
        */}
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass border-t border-kokoro-border md:hidden overflow-hidden"
        >
          <ul className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-kokoro-text hover:text-kokoro-primary transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      )}
    </m.header>
  )
}
