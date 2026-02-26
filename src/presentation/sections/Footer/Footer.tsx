import { m } from 'framer-motion'
import { Instagram, Twitter, Link2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@components/ui/index.ts'
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@application/constants/index.ts'
import { BRAND_IDENTITY } from '../../../constants/brand.ts'
import { staggerContainer, staggerItem, springTransition } from '@animations/index.ts'
import type { SocialLink } from '@domain/types/index.ts'

const SOCIAL_ICON_MAP: Record<SocialLink['platform'], LucideIcon> = {
  instagram: Instagram,
  twitter: Twitter,
  pinterest: Link2,
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="bg-kokoro-text text-kokoro-bg pt-20 pb-10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Top row */}
        <m.div
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 pb-16
                     border-b border-white/10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Brand column */}
          <m.div variants={staggerItem}>
            <div className="flex items-baseline gap-3 mb-4">
              <img src={`${import.meta.env.BASE_URL}Kokoro_logo_letras.png`} alt={BRAND_IDENTITY.name} className='h-7 w-auto'/>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {BRAND_IDENTITY.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-8">
              {SOCIAL_LINKS.map(social => {
                const SocialIcon = SOCIAL_ICON_MAP[social.platform]
                return (
                  <m.a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/20
                               flex items-center justify-center
                               text-white/50 hover:text-white hover:border-white/50
                               transition-colors duration-200
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                  >
                    <Icon icon={SocialIcon} size={16} />
                  </m.a>
                )
              })}
            </div>
          </m.div>

          {/* Navigation columns */}
          {FOOTER_COLUMNS.map(column => (
            <m.div key={column.heading} variants={staggerItem}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} KOKORO. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20 tracking-widest" aria-hidden="true">
            心 — Tuxtla Gutiérrez, Chiapas
          </p>
        </div>
      </div>
    </footer>
  )
}
