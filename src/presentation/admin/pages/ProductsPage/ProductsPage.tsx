import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button, Icon, Modal } from '@components/ui/index.ts'
import { DataTable } from '../../components/DataTable/index.ts'
import { ProductForm } from './ProductForm.tsx'
import { useProducts } from '@hooks/index.ts'
import type { Product } from '@domain/types/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'

type View = 'list' | 'create' | 'edit'

export function ProductsPage() {
  const { products, loading, create, update, remove } = useProducts({ useCache: false })
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<Product | undefined>()
  const [deleting, setDeleting] = useState<Product | null>(null)

  async function handleCreate(input: ProductInput) {
    await create(input)
    setView('list')
  }

  async function handleUpdate(input: ProductInput) {
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
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Nuevo producto</h2>
        <ProductForm onSubmit={handleCreate} onCancel={() => setView('list')} />
      </div>
    )
  }

  if (view === 'edit' && editing) {
    return (
      <div>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Editar producto</h2>
        <ProductForm product={editing} onSubmit={handleUpdate} onCancel={() => { setView('list'); setEditing(undefined) }} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text">Productos</h2>
        <Button variant="primary" onClick={() => setView('create')}>
          <Icon icon={Plus} size={16} /> Nuevo producto
        </Button>
      </div>

      {loading ? (
        <p className="text-kokoro-muted text-sm">Cargando...</p>
      ) : (
        <DataTable
          data={products}
          keyExtractor={p => p.id}
          emptyMessage="No hay productos aún. Crea el primero."
          columns={[
            {
              key: 'image',
              header: '',
              className: 'w-16',
              render: p => (
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
              ),
            },
            {
              key: 'name',
              header: 'Nombre',
              render: p => (
                <div>
                  <p className="font-medium text-kokoro-text">{p.name}</p>
                  <p className="text-xs text-kokoro-muted">{p.category}</p>
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Estado',
              render: p => (
                <span className={`text-xs px-2 py-1 rounded-full ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {p.active ? 'Activo' : 'Inactivo'}
                </span>
              ),
            },
            {
              key: 'tag',
              header: 'Tag',
              render: p => p.tag ? (
                <span className="text-xs px-2 py-1 rounded-full bg-kokoro-primary/10 text-kokoro-primary">{p.tag}</span>
              ) : <span className="text-kokoro-muted">—</span>,
            },
            {
              key: 'actions',
              header: '',
              className: 'w-24',
              render: p => (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(p); setView('edit') }}
                    className="p-1.5 rounded-lg hover:bg-kokoro-surface text-kokoro-muted hover:text-kokoro-primary transition-colors"
                  >
                    <Icon icon={Pencil} size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(p)}
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

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Eliminar producto">
        <p className="text-sm text-kokoro-muted mb-6">
          ¿Eliminar <strong>{deleting?.name}</strong>? Esta acción no se puede deshacer.
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
