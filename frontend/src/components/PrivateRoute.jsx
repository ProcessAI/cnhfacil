import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth()
  const perfil = user?.perfil || user?.usuario_nivel_acesso || user?.nivel || user?.cargo
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && String(perfil).toLowerCase() !== 'admin') return <Navigate to="/inicio" replace />
  return children
}
