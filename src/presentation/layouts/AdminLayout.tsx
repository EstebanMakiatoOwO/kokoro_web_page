import { Outlet } from 'react-router-dom'
import { Sidebar } from '../admin/components/Sidebar/index.ts'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-kokoro-bg">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
