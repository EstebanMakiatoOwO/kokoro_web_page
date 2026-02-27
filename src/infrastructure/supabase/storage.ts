import { supabase } from './client.ts'

function convertToWebP(file: File, quality = 0.85): Promise<File> {
  if (file.type === 'image/webp') return Promise.resolve(file)

  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Canvas context not available'))
        return
      }

      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('WebP conversion failed'))
            return
          }
          const name = file.name.replace(/\.[^.]+$/, '.webp')
          resolve(new File([blob], name, { type: 'image/webp' }))
        },
        'image/webp',
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image for conversion'))
    }

    img.src = url
  })
}

export async function uploadImage(
  bucket: 'product-images' | 'carousel-images',
  file: File,
): Promise<string> {
  const webpFile = await convertToWebP(file)
  const fileName = `${crypto.randomUUID()}.webp`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, webpFile, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return data.publicUrl
}

export async function deleteImage(
  bucket: 'product-images' | 'carousel-images',
  url: string,
): Promise<void> {
  const parts = url.split('/')
  const fileName = parts[parts.length - 1]
  if (!fileName) return

  const { error } = await supabase.storage.from(bucket).remove([fileName])
  if (error) throw error
}
