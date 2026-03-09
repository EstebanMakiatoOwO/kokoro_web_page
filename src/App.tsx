import { Routes, Route, Navigate } from 'react-router-dom'
// import { useCart } from '@hooks/index.ts'
import { Navbar, Hero, LogoBanner, Carousel, ProductGrid, Philosophy, Footer } from '@sections/index.ts'
import { PageLayout, AdminLayout } from '@layouts/index.ts'
import { ProtectedRoute } from './presentation/admin/components/ProtectedRoute/index.ts'
import { LoginPage } from './presentation/admin/pages/LoginPage/index.ts'
import { DashboardPage } from './presentation/admin/pages/DashboardPage/index.ts'
import { ProductsPage } from './presentation/admin/pages/ProductsPage/index.ts'
import { CarouselPage } from './presentation/admin/pages/CarouselPage/index.ts'

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
  )
}
