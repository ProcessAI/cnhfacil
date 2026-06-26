import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function normalizeUser(user) {
  if (!user) return null
  const perfil = user.perfil || user.usuario_nivel_acesso || user.nivel || user.cargo || null
  return { ...user, perfil }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return normalizeUser(JSON.parse(localStorage.getItem('cnhfacil_user')))
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('cnhfacil_token'))

  function login(userData, jwt) {
    const normalized = normalizeUser(userData)
    setUser(normalized)
    setToken(jwt)
    localStorage.setItem('cnhfacil_user', JSON.stringify(normalized))
    localStorage.setItem('cnhfacil_token', jwt)
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('cnhfacil_user')
    localStorage.removeItem('cnhfacil_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.perfil === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
