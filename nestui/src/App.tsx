import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Billing from './pages/Billing'
import SubAccounts from './pages/SubAccounts'
import ThemeGenerator from './pages/ThemeGenerator'

function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-nestui-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nestui-blue/25 to-purple-500/25 animate-pulse" />
            <div className="absolute inset-[3px] rounded-[9px] bg-nestui-bg" />
            <svg className="relative z-10 w-5 h-5 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <p className="text-nestui-text3 text-xs font-medium tracking-wider uppercase">Loading</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to="/dashboard" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={session ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/onboarding"
        element={<ProtectedRoute><Onboarding /></ProtectedRoute>}
      />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />
      <Route
        path="/billing"
        element={<ProtectedRoute><Billing /></ProtectedRoute>}
      />
      <Route
        path="/sub-accounts"
        element={<ProtectedRoute><SubAccounts /></ProtectedRoute>}
      />
      <Route
        path="/generate"
        element={<ProtectedRoute><ThemeGenerator /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to={session ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}

export default App
