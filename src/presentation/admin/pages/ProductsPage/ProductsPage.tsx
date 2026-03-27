import { useState } from 'react'
import { ArrowLeft, Plus, Pencil, Trash2, Upload, X } from 'lucide-react'
import { Button, Icon, Modal } from '@components/ui/index.ts'
import { DataTable } from '../../components/DataTable/index.ts'
import { ProductForm } from './ProductForm.tsx'
import { BulkUpload } from './BulkUpload.tsx'
import { BulkEditModal } from './BulkEditModal.tsx'
import type { BulkChanges } from './BulkEditModal.tsx'
import { useProducts } from '@hooks/index.ts'
import type { Product } from '@domain/types/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'

type View = 'list' | 'create' | 'edit' | 'bulk'

export function ProductsPage() {
  const { products, loading, create, update, remove } = useProducts({ useCache: false })
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<Product | undefined>()
  const [deleting, setDeleting] = useState<Product | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [bulkEditing, setBulkEditing] = useState(false)
  const [bulkSaving, setBulkSaving] = useState(false)

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === products.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(products.map(p => p.id)))
    }
  }

  function clearSelection() {
    setSelected(new Set())
  }

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

  async function handleBulkCreate(inputs: ProductInput[]) {
    for (const input of inputs) {
      await create(input)
    }
    setView('list')
  }

  async function handleDelete() {
    if (!deleting) return
    await remove(deleting.id)
    setDeleting(null)
  }

  async function handleBulkDelete() {
    setBulkSaving(true)
    try {
      for (const id of selected) {
        await remove(id)
      }
      clearSelection()
      setBulkDeleting(false)
    } finally {
      setBulkSaving(false)
    }
  }

  async function handleBulkEdit(changes: BulkChanges) {
    setBulkSaving(true)
    try {
      for (const id of selected) {
        const partial: Record<string, unknown> = {}
        if (changes.category !== undefined) partial.category = changes.category
        if (changes.tag !== undefined) partial.tag = changes.tag === null ? '' : changes.tag
        if (changes.featured !== undefined) partial.featured = changes.featured
        if (changes.active !== undefined) partial.active = changes.active
        await update(id, partial as Partial<ProductInput>)
      }
      clearSelection()
      setBulkEditing(false)
    } finally {
      setBulkSaving(false)
    }
  }

  if (view === 'bulk') {
    return (
      <div>
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-kokoro-muted hover:text-kokoro-text transition-colors mb-4">
          <Icon icon={ArrowLeft} size={16} /> Volver a productos
        </button>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Carga masiva de productos</h2>
        <BulkUpload onUpload={handleBulkCreate} onCancel={() => setView('list')} />
      </div>
    )
  }

  if (view === 'create') {
    return (
      <div>
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-kokoro-muted hover:text-kokoro-text transition-colors mb-4">
          <Icon icon={ArrowLeft} size={16} /> Volver a productos
        </button>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Nuevo producto</h2>
        <ProductForm onSubmit={handleCreate} onCancel={() => setView('list')} />
      </div>
    )
  }

  if (view === 'edit' && editing) {
    return (
      <div>
        <button onClick={() => { setView('list'); setEditing(undefined) }} className="flex items-center gap-1.5 text-sm text-kokoro-muted hover:text-kokoro-text transition-colors mb-4">
          <Icon icon={ArrowLeft} size={16} /> Volver a productos
        </button>
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text mb-6">Editar producto</h2>
        <ProductForm product={editing} onSubmit={handleUpdate} onCancel={() => { setView('list'); setEditing(undefined) }} />
      </div>
    )
  }

  const allSelected = products.length > 0 && selected.size === products.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-semibold text-kokoro-text">Productos</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setView('bulk')}>
            <Icon icon={Upload} size={16} /> Carga masiva
          </Button>
          <Button variant="primary" onClick={() => setView('create')}>
            <Icon icon={Plus} size={16} /> Nuevo producto
          </Button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-kokoro-primary/5 border border-kokoro-primary/20 rounded-xl">
          <span className="text-sm font-medium text-kokoro-text">
            {selected.size} seleccionado{selected.size > 1 ? 's' : ''}
          </span>
          <div className="flex gap-2 ml-auto">
            <Button variant="secondary" onClick={() => setBulkEditing(true)} className="px-4! py-1.5!">
              <Icon icon={Pencil} size={14} /> Editar
            </Button>
            <Button variant="secondary" onClick={() => setBulkDeleting(true)} className="px-4! py-1.5! border-red-300! text-red-500! hover:bg-red-50!">
              <Icon icon={Trash2} size={14} /> Eliminar
            </Button>
            <button onClick={clearSelection} className="p-1.5 rounded-lg hover:bg-kokoro-surface text-kokoro-muted hover:text-kokoro-text transition-colors">
              <Icon icon={X} size={16} />
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-kokoro-muted text-sm">Cargando...</p>
      ) : (
        <DataTable
          data={products}
          keyExtractor={p => p.id}
          emptyMessage="No hay productos aún. Crea el primero."
          columns={[
            {
              key: 'select',
              header: '',
              className: 'w-10',
              render: p => (
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggleSelect(p.id)}
                  className="rounded border-kokoro-border accent-kokoro-primary cursor-pointer"
                />
              ),
            },
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

      {/* Select all hint */}
      {products.length > 0 && !loading && (
        <div className="mt-3 text-center">
          <button onClick={toggleAll} className="text-xs text-kokoro-muted hover:text-kokoro-primary transition-colors">
            {allSelected ? 'Deseleccionar todos' : `Seleccionar todos (${products.length})`}
          </button>
        </div>
      )}

      {/* Single delete modal */}
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Eliminar producto">
        <p className="text-sm text-kokoro-muted mb-6">
          ¿Eliminar <strong>{deleting?.name}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleting(null)}>Cancelar</Button>
          <Button
            variant="primary"
            onClick={() => void handleDelete()}
            className="bg-red-500! hover:bg-red-600!"
          >
            Eliminar
          </Button>
        </div>
      </Modal>

      {/* Bulk delete modal */}
      <Modal open={bulkDeleting} onClose={() => setBulkDeleting(false)} title="Eliminar productos">
        <p className="text-sm text-kokoro-muted mb-6">
          ¿Eliminar <strong>{selected.size}</strong> producto{selected.size > 1 ? 's' : ''}? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setBulkDeleting(false)}>Cancelar</Button>
          <Button
            variant="primary"
            onClick={() => void handleBulkDelete()}
            disabled={bulkSaving}
            className="bg-red-500! hover:bg-red-600!"
          >
            {bulkSaving ? 'Eliminando...' : `Eliminar ${selected.size}`}
          </Button>
        </div>
      </Modal>

      {/* Bulk edit modal */}
      <BulkEditModal
        open={bulkEditing}
        count={selected.size}
        onClose={() => setBulkEditing(false)}
        onApply={changes => void handleBulkEdit(changes)}
        saving={bulkSaving}
      />
    </div>
  )
}
