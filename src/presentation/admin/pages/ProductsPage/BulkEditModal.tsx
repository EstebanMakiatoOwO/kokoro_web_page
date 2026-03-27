import { useState } from 'react'
import { Button, Modal, Switch } from '@components/ui/index.ts'
import { Select } from '@components/ui/Select/index.ts'

const CATEGORY_OPTIONS = [
  { value: '', label: 'No cambiar' },
  { value: 'Labios', label: 'Labios' },
  { value: 'Ojos', label: 'Ojos' },
  { value: 'Rostro', label: 'Rostro' },
  { value: 'Bases', label: 'Bases' },
  { value: 'Rubor', label: 'Rubor' },
  { value: 'Corrector', label: 'Corrector' },
  { value: 'Cejas', label: 'Cejas' },
  { value: 'Skincare', label: 'Skincare' },
  { value: 'Accesorios', label: 'Accesorios' },
]

const TAG_OPTIONS = [
  { value: '', label: 'No cambiar' },
  { value: '__clear__', label: 'Quitar tag' },
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Popular', label: 'Popular' },
  { value: 'Oferta', label: 'Oferta' },
  { value: 'Más vendido', label: 'Más vendido' },
  { value: 'Edición limitada', label: 'Edición limitada' },
]

interface BulkEditModalProps {
  open: boolean
  count: number
  onClose: () => void
  onApply: (changes: BulkChanges) => void
  saving: boolean
}

export interface BulkChanges {
  category?: string
  tag?: string | null
  featured?: boolean
  active?: boolean
}

export function BulkEditModal({ open, count, onClose, onApply, saving }: BulkEditModalProps) {
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [changeFeatured, setChangeFeatured] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [changeActive, setChangeActive] = useState(false)
  const [active, setActive] = useState(true)

  function handleApply() {
    const changes: BulkChanges = {}
    if (category) changes.category = category
    if (tag === '__clear__') changes.tag = null
    else if (tag) changes.tag = tag
    if (changeFeatured) changes.featured = featured
    if (changeActive) changes.active = active
    onApply(changes)
  }

  const hasChanges = category !== '' || tag !== '' || changeFeatured || changeActive

  return (
    <Modal open={open} onClose={onClose} title={`Editar ${count} productos`}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-kokoro-muted">
          Solo se modificarán los campos que cambies. Los demás se quedan como están.
        </p>

        <Select
          label="Categoría"
          value={category}
          onChange={e => setCategory(e.target.value)}
          options={CATEGORY_OPTIONS}
        />

        <Select
          label="Tag"
          value={tag}
          onChange={e => setTag(e.target.value)}
          options={TAG_OPTIONS}
        />

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={changeFeatured}
              onChange={e => setChangeFeatured(e.target.checked)}
              className="rounded border-kokoro-border accent-kokoro-primary"
            />
            <span className="text-sm text-kokoro-text">Cambiar destacado</span>
            {changeFeatured && (
              <Switch label="" checked={featured} onChange={setFeatured} />
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={changeActive}
              onChange={e => setChangeActive(e.target.checked)}
              className="rounded border-kokoro-border accent-kokoro-primary"
            />
            <span className="text-sm text-kokoro-text">Cambiar activo</span>
            {changeActive && (
              <Switch label="" checked={active} onChange={setActive} />
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleApply} disabled={!hasChanges || saving}>
            {saving ? 'Aplicando...' : `Aplicar a ${count} productos`}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
