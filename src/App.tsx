import { useCart } from '@hooks/index.ts'
import { Navbar, Hero, ProductGrid, Philosophy, Footer } from '@sections/index.ts'
import { PageLayout } from '@layouts/index.ts'

function App() {
  const { itemCount, actions } = useCart()

  return (
    <>
      <Navbar cartItemCount={itemCount} />
      <PageLayout>
        <Hero />
        <ProductGrid onAddToCart={actions.addToCart} />
        <Philosophy />
      </PageLayout>
      <Footer />
    </>
  )
}

export default App
