import { useState } from 'react'
import { Input, Textarea, Switch, Button } from '@components/ui/index.ts'
import { Select } from '@components/ui/Select/index.ts'
import { ImageUploader } from '../../components/ImageUploader/index.ts'
import type { Product } from '@domain/types/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'

const CATEGORY_OPTIONS = [
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
  { value: '', label: 'Sin tag' },
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Popular', label: 'Popular' },
  { value: 'Oferta', label: 'Oferta' },
  { value: 'Más vendido', label: 'Más vendido' },
  { value: 'Edición limitada', label: 'Edición limitada' },
]

interface ProductFormProps {
  product?: Product
  onSubmit: (input: ProductInput) => Promise<void>
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '')
  const [subtitle, setSubtitle] = useState(product?.subtitle ?? '')
  const [price, setPrice] = useState(product?.price ?? '')
  const [category, setCategory] = useState(product?.category ?? '')
  const [tag, setTag] = useState(product?.tag ?? '')
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '')
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [active, setActive] = useState(product?.active ?? true)
  const [sortOrder, setSortOrder] = useState(product?.sortOrder ?? 0)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        name,
        subtitle,
        price: price || undefined,
        category,
        imageUrl,
        tag: tag || undefined,
        featured,
        active,
        sortOrder,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={e => void handleSubmit(e)} className="flex flex-col gap-4 max-w-lg">
      <Input label="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <Textarea label="Descripción" value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Categoría" value={category} onChange={e => setCategory(e.target.value)} options={CATEGORY_OPTIONS} required />
        <Input label="Precio (opcional)" value={price} onChange={e => setPrice(e.target.value)} placeholder="$199" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Tag (opcional)" value={tag} onChange={e => setTag(e.target.value)} options={TAG_OPTIONS} placeholder="Sin tag" />
        <Input label="Orden" type="number" value={String(sortOrder)} onChange={e => setSortOrder(Number(e.target.value))} />
      </div>
      <ImageUploader bucket="product-images" currentUrl={imageUrl} onUploaded={setImageUrl} />
      <div className="flex flex-col gap-3 pt-2">
        <Switch label="Destacado" checked={featured} onChange={setFeatured} />
        <Switch label="Activo (visible en el sitio)" checked={active} onChange={setActive} />
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" disabled={saving || !name || !category || !imageUrl}>
          {saving ? 'Guardando...' : product ? 'Actualizar' : 'Crear producto'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
