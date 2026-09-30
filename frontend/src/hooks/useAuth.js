import { useEffect, useState } from 'react'
import { signIn } from '../services/api'

function readUser() {
  try { return JSON.parse(localStorage.getItem('little-user') || 'null') }
  catch { return null }
}

export function useAuth() {
  const [user, setUser] = useState(readUser)
  const [token, setToken] = useState(() => localStorage.getItem('little-token') || '')

  useEffect(() => {
    if (user) localStorage.setItem('little-user', JSON.stringify(user))
    else localStorage.removeItem('little-user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('little-token', token)
    else localStorage.removeItem('little-token')
  }, [token])

  async function authenticate(mode, details) {
    const result = await signIn(mode, details)
    setUser(result.user)
    setToken(result.token)
    return result.user
  }

  function logout() {
    setUser(null)
    setToken('')
  }

  return { user, token, authenticate, logout }
}
