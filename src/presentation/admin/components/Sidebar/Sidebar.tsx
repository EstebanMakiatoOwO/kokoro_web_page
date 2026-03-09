import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Images, LogOut } from 'lucide-react'
import { Icon } from '@components/ui/index.ts'
import { useAuth } from '@hooks/index.ts'

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Productos' },
  { to: '/admin/carousel', icon: Images, label: 'Carrusel' },
] as const

export function Sidebar() {
  const { signOut } = useAuth()

  return (
    <aside className="w-64 bg-white border-r border-kokoro-border flex flex-col min-h-screen">
      <div className="p-6 border-b border-kokoro-border">
        <h1 className="font-heading text-xl font-semibold text-kokoro-text">
          KOKORO <span className="text-kokoro-primary">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
              transition-colors duration-200
              ${isActive
                ? 'bg-kokoro-primary/10 text-kokoro-primary'
                : 'text-kokoro-muted hover:text-kokoro-text hover:bg-kokoro-surface'
              }
            `}
          >
            <Icon icon={item.icon} size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-kokoro-border">
        <button
          onClick={() => void signOut()}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                     text-kokoro-muted hover:text-red-500 hover:bg-red-50
                     transition-colors duration-200 w-full"
        >
          <Icon icon={LogOut} size={18} />
          Cerrar sesión
        </button>
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-2 mt-1 rounded-xl text-xs
                     text-kokoro-muted hover:text-kokoro-primary transition-colors"
        >
          ← Volver al sitio
        </a>
      </div>
    </aside>
  )
}
