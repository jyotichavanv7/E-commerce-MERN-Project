import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import Story from './components/Story'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import Toast from './components/Toast'
import { useAuth } from './hooks/useAuth'
import { useShop } from './hooks/useShop'
import { placeOrder } from './services/api'

function App() {
  const shop = useShop()
  const auth = useAuth()
  const [modal, setModal] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  function notify(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  async function handleAuth(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const user = await auth.authenticate(modal, {
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
      })
      setModal('')
      notify('Welcome, ' + user.name.split(' ')[0] + '!')
    } catch (issue) {
      setError(issue.message === 'Failed to fetch' ? 'Start the backend to sign in.' : issue.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleCheckout(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const address = new FormData(event.currentTarget).get('address')
    try {
      await placeOrder(shop.cart.map(item => ({ product: item._id, quantity: item.quantity })), address, auth.token)
      shop.clearCart()
      setModal('')
      notify('Your order is on its way!')
    } catch (issue) {
      setError(issue.message === 'Failed to fetch' ? 'Start the backend to complete checkout.' : issue.message)
    } finally {
      setBusy(false)
    }
  }

  function startCheckout() {
    if (!auth.user) {
      setError('Please sign in before checkout.')
      setModal('login')
      return
    }
    setError('')
    setModal('checkout')
  }

  return <div className="store">
    <Header
      user={auth.user}
      itemCount={shop.itemCount}
      search={shop.search}
      onSearch={shop.setSearch}
      onAccount={() => { setError(''); setModal('login') }}
      onSignOut={() => { auth.logout(); notify('Signed out') }}
      onOpenCart={() => setModal('cart')}
      onCategory={shop.setCategory}
    />
    <main id="top">
      <Hero />
      <div className="trust">
        <span>✳ &nbsp;Thoughtfully sourced</span><span>♡ &nbsp;Small batch finds</span>
        <span>↗ &nbsp;Ships with a smile</span><span>☆ &nbsp;4.9/5 from happy homes</span>
      </div>
      <ProductSection
        products={shop.products}
        category={shop.category}
        onCategory={shop.setCategory}
        sort={shop.sort}
        onSort={shop.setSort}
        search={shop.search}
        onSearch={shop.setSearch}
        saved={shop.saved}
        onToggleSaved={shop.toggleSaved}
        onAdd={product => { shop.addToCart(product); notify('Added to your bag') }}
      />
      <Story />
      <Newsletter onSubscribe={notify} />
    </main>
    <Footer />

    {modal && <div className="backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) setModal('')
    }}>
      {modal === 'cart' && <CartDrawer
        cart={shop.cart}
        count={shop.itemCount}
        total={shop.total}
        onClose={() => setModal('')}
        onQuantity={shop.changeQuantity}
        onRemove={shop.removeFromCart}
        onCheckout={startCheckout}
      />}
      {modal === 'login' || modal === 'register' ? <AuthModal
        mode={modal}
        onModeChange={mode => { setError(''); setModal(mode) }}
        onClose={() => setModal('')}
        onSubmit={handleAuth}
        error={error}
        busy={busy}
      /> : null}
      {modal === 'checkout' && <CheckoutModal
        total={shop.total}
        error={error}
        busy={busy}
        onClose={() => setModal('cart')}
        onSubmit={handleCheckout}
      />}
    </div>}
    <Toast message={toast} />
  </div>
}

export default App
