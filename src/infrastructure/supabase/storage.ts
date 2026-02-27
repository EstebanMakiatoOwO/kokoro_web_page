import { supabase } from './client.ts'

export async function uploadImage(
  bucket: 'product-images' | 'carousel-images',
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'webp'
  const fileName = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

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
