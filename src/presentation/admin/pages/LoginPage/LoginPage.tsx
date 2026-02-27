import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@components/ui/index.ts'
import { useAuth } from '@hooks/index.ts'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-kokoro-bg px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-semibold text-kokoro-text">
            KOKORO <span className="text-kokoro-primary">Admin</span>
          </h1>
          <p className="text-kokoro-muted text-sm mt-2">Inicia sesión para administrar</p>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@kokoro.com"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
          )}

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </Button>
        </form>

        <a
          href="/"
          className="block text-center text-sm text-kokoro-muted hover:text-kokoro-primary mt-6 transition-colors"
        >
          ← Volver al sitio
        </a>
      </div>
    </div>
  )
}
