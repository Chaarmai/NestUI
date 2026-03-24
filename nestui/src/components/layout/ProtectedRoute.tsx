import { Navigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAppStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-nestui-bg flex items-center justify-center">
        <p className="text-nestui-text2 text-sm">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
