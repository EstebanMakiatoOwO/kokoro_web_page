import { useProducts, useCarousel, useSettings } from '@hooks/index.ts'
import { Switch } from '@components/ui/index.ts'

export function DashboardPage() {
  const { products, loading: pLoading } = useProducts({ useCache: false })
  const { slides, loading: cLoading } = useCarousel({ useCache: false })
  const { settings, loading: sLoading, updateSettings } = useSettings({ useCache: false })

  const loading = pLoading || cLoading || sLoading

  const stats = [
    { label: 'Productos totales', value: products.length },
    { label: 'Productos activos', value: products.filter(p => p.active).length },
    { label: 'Slides del carrusel', value: slides.length },
    { label: 'Slides activos', value: slides.filter(s => s.active).length },
  ]

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Dashboard</h2>

      {loading ? (
        <p className="text-kokoro-muted text-sm">Cargando...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-kokoro-border p-5"
              >
                <p className="text-3xl font-heading font-semibold text-kokoro-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-kokoro-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {settings && (
            <div className="bg-white rounded-xl border border-kokoro-border p-5">
              <h3 className="font-heading text-lg font-medium text-kokoro-text mb-4">
                Configuración del sitio
              </h3>
              <Switch
                label="Sección de carrusel visible en el sitio público"
                checked={settings.carouselEnabled}
                onChange={checked => void updateSettings({ carouselEnabled: checked })}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
