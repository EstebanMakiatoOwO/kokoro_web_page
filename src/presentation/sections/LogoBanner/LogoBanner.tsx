import { m } from 'framer-motion'

export function LogoBanner() {
  return (
    <section className="py-20 md:py-28 bg-kokoro-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <m.img
          src={`${import.meta.env.BASE_URL}Kokoro_logo_grande_completo.png`}
          alt="KOKORO — Logo completo"
          className="w-48 md:w-64 lg:w-72 object-contain drop-shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <m.div
          className="mt-6 w-16 h-px bg-kokoro-primary/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  )
}
