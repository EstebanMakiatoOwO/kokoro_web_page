// import { useCart } from '@hooks/index.ts'
import { Navbar, Hero, ProductGrid, Philosophy, Footer } from '@sections/index.ts'
import { PageLayout } from '@layouts/index.ts'

function App() {
  // Carrito comentado — descomentar si se activa e-commerce
  // const { itemCount, actions } = useCart()

  return (
    <>
      {/* <Navbar cartItemCount={itemCount} /> */}
      <Navbar />
      <PageLayout>
        <Hero />
        {/* <ProductGrid onAddToCart={actions.addToCart} /> */}
        <ProductGrid />
        <Philosophy />
      </PageLayout>
      <Footer />
    </>
  )
}

export default App
