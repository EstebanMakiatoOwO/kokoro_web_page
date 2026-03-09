import { useState } from 'react'
import { Input, Switch, Button } from '@components/ui/index.ts'
import { ImageUploader } from '../../components/ImageUploader/index.ts'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'

interface SlideFormProps {
  slide?: CarouselSlide
  onSubmit: (input: CarouselSlideInput) => Promise<void>
  onCancel: () => void
}

export function SlideForm({ slide, onSubmit, onCancel }: SlideFormProps) {
  const [title, setTitle] = useState(slide?.title ?? '')
  const [subtitle, setSubtitle] = useState(slide?.subtitle ?? '')
  const [ctaLabel, setCtaLabel] = useState(slide?.ctaLabel ?? '')
  const [ctaHref, setCtaHref] = useState(slide?.ctaHref ?? '')
  const [imageUrl, setImageUrl] = useState(slide?.imageUrl ?? '')
  const [active, setActive] = useState(slide?.active ?? true)
  const [sortOrder, setSortOrder] = useState(slide?.sortOrder ?? 0)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        title,
        subtitle: subtitle || undefined,
        ctaLabel: ctaLabel || undefined,
        ctaHref: ctaHref || undefined,
        imageUrl,
        active,
        sortOrder,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={e => void handleSubmit(e)} className="flex flex-col gap-4 max-w-lg">
      <Input label="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input label="Subtítulo (opcional)" value={subtitle} onChange={e => setSubtitle(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Texto del botón (opcional)" value={ctaLabel} onChange={e => setCtaLabel(e.target.value)} placeholder="Ver oferta" />
        <Input label="Link del botón (opcional)" value={ctaHref} onChange={e => setCtaHref(e.target.value)} placeholder="#products" />
      </div>
      <Input label="Orden" type="number" value={String(sortOrder)} onChange={e => setSortOrder(Number(e.target.value))} />
      <ImageUploader bucket="carousel-images" currentUrl={imageUrl} onUploaded={setImageUrl} />
      <Switch label="Activo (visible en el sitio)" checked={active} onChange={setActive} />
      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" disabled={saving || !title || !imageUrl}>
          {saving ? 'Guardando...' : slide ? 'Actualizar' : 'Crear slide'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  )
}
