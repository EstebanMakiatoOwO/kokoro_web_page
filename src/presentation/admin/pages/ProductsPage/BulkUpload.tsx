import { useState, useRef } from 'react'
import { Plus, Trash2, Upload, X } from 'lucide-react'
import { Button, Icon } from '@components/ui/index.ts'
import { uploadImage } from '@infrastructure/supabase/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'

const CATEGORY_OPTIONS = ['Labios', 'Ojos', 'Rostro', 'Bases', 'Rubor', 'Corrector', 'Cejas', 'Skincare', 'Accesorios']
const TAG_OPTIONS = ['', 'Nuevo', 'Popular', 'Oferta', 'Más vendido', 'Edición limitada']

interface RowData {
  id: number
  name: string
  subtitle: string
  price: string
  category: string
  tag: string
  imageUrl: string
  uploading: boolean
}

function emptyRow(id: number): RowData {
  return { id, name: '', subtitle: '', price: '', category: '', tag: '', imageUrl: '', uploading: false }
}

interface BulkUploadProps {
  onUpload: (products: ProductInput[]) => Promise<void>
  onCancel: () => void
}

export function BulkUpload({ onUpload, onCancel }: BulkUploadProps) {
  const [rows, setRows] = useState<RowData[]>([emptyRow(1)])
  const [nextId, setNextId] = useState(2)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})

  function addRow() {
    setRows(prev => [...prev, emptyRow(nextId)])
    setNextId(n => n + 1)
  }

  function removeRow(id: number) {
    setRows(prev => prev.length > 1 ? prev.filter(r => r.id !== id) : prev)
  }

  function updateRow(id: number, field: keyof RowData, value: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  async function handleImageUpload(id: number, file: File) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, uploading: true } : r))
    try {
      const url = await uploadImage('product-images', file)
      setRows(prev => prev.map(r => r.id === id ? { ...r, imageUrl: url, uploading: false } : r))
    } catch {
      setRows(prev => prev.map(r => r.id === id ? { ...r, uploading: false } : r))
    }
  }

  function isRowValid(row: RowData) {
    return row.name.trim() !== '' && row.subtitle.trim() !== '' && row.category !== '' && row.imageUrl !== ''
  }

  const validRows = rows.filter(isRowValid)

  async function handleSubmit() {
    if (validRows.length === 0) return
    setSaving(true)
    try {
      const inputs: ProductInput[] = validRows.map(r => ({
        name: r.name.trim(),
        subtitle: r.subtitle.trim(),
        price: r.price.trim() || undefined,
        category: r.category,
        tag: r.tag || undefined,
        imageUrl: r.imageUrl,
        featured: false,
        active: true,
        sortOrder: 0,
      }))
      await onUpload(inputs)
      setResult(inputs.length)
      setRows([emptyRow(nextId)])
      setNextId(n => n + 1)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full bg-transparent border border-kokoro-border rounded-lg px-2 py-1.5 text-sm text-kokoro-text focus:outline-none focus:border-kokoro-primary transition-colors'
  const selectClass = `${inputClass} appearance-none`

  return (
    <div className="flex flex-col gap-5">
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
          Se crearon <strong>{result}</strong> productos exitosamente.
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-kokoro-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-kokoro-surface text-kokoro-muted text-left">
              <th className="px-3 py-2.5 font-medium w-12">#</th>
              <th className="px-3 py-2.5 font-medium min-w-[160px]">Imagen</th>
              <th className="px-3 py-2.5 font-medium min-w-[180px]">Nombre *</th>
              <th className="px-3 py-2.5 font-medium min-w-[180px]">Descripción *</th>
              <th className="px-3 py-2.5 font-medium min-w-[130px]">Categoría *</th>
              <th className="px-3 py-2.5 font-medium min-w-[100px]">Precio</th>
              <th className="px-3 py-2.5 font-medium min-w-[130px]">Tag</th>
              <th className="px-3 py-2.5 font-medium w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kokoro-border">
            {rows.map((row, i) => (
              <tr key={row.id} className="align-top">
                <td className="px-3 py-2.5 text-kokoro-muted">{i + 1}</td>

                {/* Image */}
                <td className="px-3 py-2.5">
                  {row.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-kokoro-border">
                      <img src={row.imageUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => updateRow(row.id, 'imageUrl', '')}
                        className="absolute top-0.5 right-0.5 p-0.5 bg-white/80 rounded-full hover:bg-white"
                      >
                        <Icon icon={X} size={10} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={row.uploading}
                      onClick={() => fileRefs.current[row.id]?.click()}
                      className="w-16 h-16 rounded-lg border-2 border-dashed border-kokoro-border flex flex-col items-center justify-center gap-0.5 text-kokoro-muted hover:border-kokoro-primary/40 hover:text-kokoro-primary transition-colors disabled:opacity-50"
                    >
                      <Icon icon={Upload} size={14} />
                      <span className="text-[10px]">{row.uploading ? '...' : 'Subir'}</span>
                    </button>
                  )}
                  <input
                    ref={el => { fileRefs.current[row.id] = el }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const f = e.target.files?.[0]
                      if (f) void handleImageUpload(row.id, f)
                    }}
                  />
                </td>

                {/* Name */}
                <td className="px-3 py-2.5">
                  <input
                    className={inputClass}
                    placeholder="Nombre del producto"
                    value={row.name}
                    onChange={e => updateRow(row.id, 'name', e.target.value)}
                  />
                </td>

                {/* Description */}
                <td className="px-3 py-2.5">
                  <input
                    className={inputClass}
                    placeholder="Descripción breve"
                    value={row.subtitle}
                    onChange={e => updateRow(row.id, 'subtitle', e.target.value)}
                  />
                </td>

                {/* Category */}
                <td className="px-3 py-2.5">
                  <select
                    className={selectClass}
                    value={row.category}
                    onChange={e => updateRow(row.id, 'category', e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </td>

                {/* Price */}
                <td className="px-3 py-2.5">
                  <input
                    className={inputClass}
                    placeholder="$199"
                    value={row.price}
                    onChange={e => updateRow(row.id, 'price', e.target.value)}
                  />
                </td>

                {/* Tag */}
                <td className="px-3 py-2.5">
                  <select
                    className={selectClass}
                    value={row.tag}
                    onChange={e => updateRow(row.id, 'tag', e.target.value)}
                  >
                    <option value="">Sin tag</option>
                    {TAG_OPTIONS.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </td>

                {/* Remove */}
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-kokoro-muted hover:text-red-500 transition-colors"
                    disabled={rows.length <= 1}
                  >
                    <Icon icon={Trash2} size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add row */}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-sm text-kokoro-primary hover:underline self-start"
      >
        <Icon icon={Plus} size={14} /> Agregar otra fila
      </button>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="primary"
          onClick={() => void handleSubmit()}
          disabled={saving || validRows.length === 0}
        >
          {saving ? 'Guardando...' : `Crear ${validRows.length} producto${validRows.length !== 1 ? 's' : ''}`}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        {validRows.length === 0 && rows.some(r => r.name || r.subtitle) && (
          <span className="text-xs text-kokoro-muted">
            * Completa nombre, descripción, categoría e imagen para habilitar
          </span>
        )}
      </div>
    </div>
  )
}
