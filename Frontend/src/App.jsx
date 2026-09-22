import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './contexts/AppContext'
import Loader from './components/ui/Loader'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import ArtistRegister from './pages/ArtistRegister'
import Upload from './pages/Upload'
import CreateAlbum from './pages/CreateAlbum'
import AlbumDetails from './pages/AlbumDetails'

export default function App() {
  const { authChecking, user } = useApp()

  // Check authentication first
  if (authChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-zinc-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* ================= PUBLIC HOME ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/album-details/:albumId" element={<AlbumDetails />} />

      {/* ================= AUTH PAGES ================= */}

      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </>
      )}

      {/* ================= LOGGED-IN USER ================= */}

      {user && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<Home />} />

          {/* Artist */}
          <Route
            path="/artist"
            element={
              user.role === 'artist'
                ? <Profile />
                : <Navigate to="/" replace />
            }
          />

          <Route
            path="/studio"
            element={
              user.role === 'artist'
                ? <Profile />
                : <Navigate to="/" replace />
            }
          />

          <Route
            path="/artist-register"
            element={
              user.role !== 'artist'
                ? <ArtistRegister />
                : <Navigate to="/profile" replace />
            }
          />

          <Route
            path="/upload"
            element={
              user.role === 'artist'
                ? <Upload />
                : <Navigate to="/" replace />
            }
          />

          <Route
            path="/create-album"
            element={
              user.role === 'artist'
                ? <CreateAlbum />
                : <Navigate to="/" replace />
            }
          />
        </>
      )}

      {/* ================= LOGIN / REGISTER WHEN ALREADY LOGGED IN ================= */}

      {user && (
        <>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* ================= FALLBACK ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}