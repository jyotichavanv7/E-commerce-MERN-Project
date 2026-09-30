const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const response = await fetch(API + path, options)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}

export function getProducts() {
  return request('/products')
}

export function signIn(mode, details) {
  return request('/auth/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  })
}

export function placeOrder(items, address, token) {
  return request('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({ items, shippingAddress: address }),
  })
}
