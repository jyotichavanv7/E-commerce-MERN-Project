import { useEffect, useMemo, useState } from 'react'
import { demoProducts } from '../data/products'
import { getProducts } from '../services/api'

function readCart() {
  try { return JSON.parse(localStorage.getItem('little-cart') || '[]') }
  catch { return [] }
}

export function useShop() {
  const [products, setProducts] = useState(demoProducts)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState(readCart)
  const [saved, setSaved] = useState([])

  useEffect(() => {
    getProducts().then(items => { if (items.length) setProducts(items) }).catch(() => {})
  }, [])

  useEffect(() => {
    localStorage.setItem('little-cart', JSON.stringify(cart))
  }, [cart])

  const visibleProducts = useMemo(() => {
    let items = products.filter(product =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'low') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'high') items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [products, category, search, sort])

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product) {
    setCart(items => items.some(item => item._id === product._id)
      ? items.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }])
  }

  function changeQuantity(id, amount) {
    setCart(items => items
      .map(item => item._id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter(item => item.quantity > 0))
  }

  function removeFromCart(id) {
    setCart(items => items.filter(item => item._id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function toggleSaved(id) {
    setSaved(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id])
  }

  return {
    products: visibleProducts, category, setCategory, search, setSearch, sort, setSort,
    cart, itemCount, total, addToCart, changeQuantity, removeFromCart, clearCart,
    saved, toggleSaved,
  }
}
