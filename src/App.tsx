import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import { useCart } from '@hooks/index.ts'
import { Navbar, Hero, LogoBanner, Carousel, ProductGrid, Philosophy, Footer } from '@sections/index.ts'
import { PageLayout } from '@layouts/index.ts'

const AdminLayout = lazy(() => import('./presentation/layouts/AdminLayout.tsx').then(m => ({ default: m.AdminLayout })))
const ProtectedRoute = lazy(() => import('./presentation/admin/components/ProtectedRoute/ProtectedRoute.tsx').then(m => ({ default: m.ProtectedRoute })))
const LoginPage = lazy(() => import('./presentation/admin/pages/LoginPage/LoginPage.tsx').then(m => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('./presentation/admin/pages/DashboardPage/DashboardPage.tsx').then(m => ({ default: m.DashboardPage })))
const ProductsPage = lazy(() => import('./presentation/admin/pages/ProductsPage/ProductsPage.tsx').then(m => ({ default: m.ProductsPage })))
const CarouselPage = lazy(() => import('./presentation/admin/pages/CarouselPage/CarouselPage.tsx').then(m => ({ default: m.CarouselPage })))

function PublicSite() {
  // Carrito comentado — descomentar si se activa e-commerce
  // const { itemCount, actions } = useCart()

  return (
    <>
      {/* <Navbar cartItemCount={itemCount} /> */}
      <Navbar />
      <PageLayout>
        <Hero />
        <Carousel />
        {/* <ProductGrid onAddToCart={actions.addToCart} /> */}
        <ProductGrid />
        <Philosophy />
        <LogoBanner />
      </PageLayout>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-kokoro-bg" />}>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="carousel" element={<CarouselPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
