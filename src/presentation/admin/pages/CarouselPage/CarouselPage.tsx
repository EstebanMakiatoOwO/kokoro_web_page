import { useState } from 'react'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { Button, Icon, Modal, Switch } from '@components/ui/index.ts'
import { DataTable } from '../../components/DataTable/index.ts'
import { SlideForm } from './SlideForm.tsx'
import { useCarousel, useSettings } from '@hooks/index.ts'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'

type View = 'list' | 'create' | 'edit'

export function CarouselPage() {
  const { slides, loading, create, update, remove } = useCarousel({ useCache: false })
  const { settings, updateSettings } = useSettings({ useCache: false })
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<CarouselSlide | undefined>()
  const [deleting, setDeleting] = useState<CarouselSlide | null>(null)

  async function handleCreate(input: CarouselSlideInput) {
    await create(input)
    setView('list')
  }

  async function handleUpdate(input: CarouselSlideInput) {
    if (!editing) return
    await update(editing.id, input)
    setView('list')
    setEditing(undefined)
  }

  async function handleDelete() {
    if (!deleting) return
    await remove(deleting.id)
    setDeleting(null)
  }

  if (view === 'create') {
    return (
      <div>
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-kokoro-muted hover:text-kokoro-text transition-colors mb-4">
          <Icon icon={ArrowLeft} size={16} /> Volver a slides
        </button>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Nuevo slide</h2>
        <SlideForm onSubmit={handleCreate} onCancel={() => setView('list')} />
      </div>
    )
  }

  if (view === 'edit' && editing) {
    return (
      <div>
        <button onClick={() => { setView('list'); setEditing(undefined) }} className="flex items-center gap-1.5 text-sm text-kokoro-muted hover:text-kokoro-text transition-colors mb-4">
          <Icon icon={ArrowLeft} size={16} /> Volver a slides
        </button>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Editar slide</h2>
        <SlideForm slide={editing} onSubmit={handleUpdate} onCancel={() => { setView('list'); setEditing(undefined) }} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text">Carrusel</h2>
        <Button variant="primary" onClick={() => setView('create')}>
          <Icon icon={Plus} size={16} /> Nuevo slide
        </Button>
      </div>

      {settings && (
        <div className="bg-white rounded-xl border border-kokoro-border p-4 mb-6">
          <Switch
            label="Carrusel visible en el sitio público"
            checked={settings.carouselEnabled}
            onChange={checked => void updateSettings({ carouselEnabled: checked })}
          />
        </div>
      )}

      {loading ? (
        <p className="text-kokoro-muted text-sm">Cargando...</p>
      ) : (
        <DataTable
          data={slides}
          keyExtractor={s => s.id}
          emptyMessage="No hay slides aún. Crea el primero."
          columns={[
            {
              key: 'image',
              header: '',
              className: 'w-20',
              render: s => (
                <img src={s.imageUrl} alt={s.title} className="w-16 h-10 rounded-lg object-cover" />
              ),
            },
            {
              key: 'title',
              header: 'Título',
              render: s => (
                <div>
                  <p className="font-medium text-kokoro-text">{s.title}</p>
                  {s.subtitle && <p className="text-xs text-kokoro-muted">{s.subtitle}</p>}
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Estado',
              render: s => (
                <span className={`text-xs px-2 py-1 rounded-full ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {s.active ? 'Activo' : 'Inactivo'}
                </span>
              ),
            },
            {
              key: 'order',
              header: 'Orden',
              render: s => <span className="text-kokoro-muted">{s.sortOrder}</span>,
            },
            {
              key: 'actions',
              header: '',
              className: 'w-24',
              render: s => (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(s); setView('edit') }}
                    className="p-1.5 rounded-lg hover:bg-kokoro-surface text-kokoro-muted hover:text-kokoro-primary transition-colors"
                  >
                    <Icon icon={Pencil} size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(s)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-kokoro-muted hover:text-red-500 transition-colors"
                  >
                    <Icon icon={Trash2} size={15} />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Eliminar slide">
        <p className="text-sm text-kokoro-muted mb-6">
          ¿Eliminar <strong>{deleting?.title}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleting(null)}>Cancelar</Button>
          <Button
            variant="primary"
            onClick={() => void handleDelete()}
            className="!bg-red-500 hover:!bg-red-600"
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
