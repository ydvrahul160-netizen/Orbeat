import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import ArtistRegisterPageComponent from './ArtistRegisterPage'
import { useApp } from '../contexts/AppContext'

export default function ArtistRegister() {
  const navigate = useNavigate()
  const { user, handleBecomeArtist } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const onBecomeArtist = async () => {
    try {
      setIsLoading(true)
      await handleBecomeArtist()
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.role === 'artist') {
    return (
      <DashboardLayout>
        <div className="text-center">
          <p className="text-zinc-400">
            {user?.role === 'artist' ? 'You are already an artist!' : 'User not found'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-full bg-green-500 px-6 py-2 font-bold text-black"
          >
            Go back
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <ArtistRegisterPageComponent
        user={user}
        onBecomeArtist={onBecomeArtist}
        onHome={() => navigate('/')}
      />
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          <p className="mt-2 text-zinc-400">Upgrading your account...</p>
        </div>
      )}
    </DashboardLayout>
  )
}
