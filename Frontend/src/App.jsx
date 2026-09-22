import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApp } from './contexts/AppContext'
import Loader from './components/ui/Loader'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ArtistRegister from './pages/ArtistRegister'
import Upload from './pages/Upload'
import CreateAlbum from './pages/CreateAlbum'
import AlbumDetails from './pages/AlbumDetails'

export default function App() {
  const { authChecking, user } = useApp()
  const location = useLocation()

  // Show loading while checking auth
  if (authChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-zinc-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Not logged in - show auth pages
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="*"
          element={<Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />}
        />
      </Routes>
    )
  }

  // Logged in - show dashboard pages
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/search" element={<Home />} />
      <Route path="/history" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/artist" element={user.role === 'artist' ? <Profile /> : <Navigate to="/" replace />} />
      <Route path="/studio" element={user.role === 'artist' ? <Profile /> : <Navigate to="/" replace />} />
      <Route path="/artist-register" element={user.role !== 'artist' ? <ArtistRegister /> : <Navigate to="/profile" replace />} />
      <Route path="/upload" element={user.role === 'artist' ? <Upload /> : <Navigate to="/" replace />} />
      <Route path="/create-album" element={user.role === 'artist' ? <CreateAlbum /> : <Navigate to="/" replace />} />
      <Route path="/album-details/:albumId" element={<AlbumDetails />} />

      {/* Redirect login/register to home when logged in */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
