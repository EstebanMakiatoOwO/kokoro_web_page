import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Icon } from '@components/ui/index.ts'
import { uploadImage } from '@infrastructure/supabase/index.ts'

interface ImageUploaderProps {
  bucket: 'product-images' | 'carousel-images'
  currentUrl?: string
  onUploaded: (url: string) => void
}

export function ImageUploader({ bucket, currentUrl, onUploaded }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const url = await uploadImage(bucket, file)
      setPreview(url)
      onUploaded(url)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-kokoro-text">Imagen</label>

      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-kokoro-border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(''); onUploaded('') }}
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
          >
            <Icon icon={X} size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-40 rounded-xl border-2 border-dashed border-kokoro-border
                     flex flex-col items-center justify-center gap-2
                     text-kokoro-muted hover:border-kokoro-primary/40 hover:text-kokoro-primary
                     transition-colors duration-200 disabled:opacity-50"
        >
          <Icon icon={Upload} size={24} />
          <span className="text-sm">
            {uploading ? 'Subiendo...' : 'Subir imagen'}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
