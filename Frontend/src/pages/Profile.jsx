import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import {
  FaArrowLeft,
  FaUserCircle,
  FaMusic,
  FaCompactDisc,
} from 'react-icons/fa'
import DashboardLayout from '../Layouts/DashboardLayout'
import ProfilePageComponent from '../pages/ProfilePage'
import { useApp } from '../contexts/AppContext'

export default function Profile() {
  const navigate = useNavigate()

  const {
    user,
    musics,
    albums,
    artistMusics,
    artistAlbums,
    artistLoading,
    handleUpdateMusic,
    handleDeleteMusic,
    handleUpdateAlbum,
    handleDeleteAlbum,
    handleProfileImageUpload,
  } = useApp()

  const likedIds = useMemo(() => {
    const userId = user?.id

    return new Set(
      musics
        .filter((music) =>
          music.likes?.some(
            (like) => String(like) === String(userId),
          ),
        )
        .map((music) => music._id),
    )
  }, [musics, user?.id])

  if (!user) {
    return (
      <DashboardLayout>
        <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
          {/* Ambient background */}
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-400/[0.05] blur-3xl" />

          <section className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950/80 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
            {/* Top accent */}
            <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/15 to-cyan-400/10">
              <FaUserCircle className="text-4xl text-zinc-500" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Orbeat Account
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Profile unavailable
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              Your session may have expired. Sign in again to access your
              profile and personal music space.
            </p>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200"
            >
              Sign in to Orbeat
            </button>
          </section>
        </main>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <main className="relative min-h-full overflow-hidden pb-12">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          {/* Page heading */}
          <header className="mb-7">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
            >
              <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Orbeat
            </button>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Your Space
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Profile
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                  Manage your identity, music and creator activity from one
                  place.
                </p>
              </div>

              {/* Small account stats */}
              <div className="flex gap-2">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FaMusic className="text-xs text-violet-300" />
                    <span className="text-sm font-semibold text-white">
                      {musics?.length || 0}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                    Tracks
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FaCompactDisc className="text-xs text-cyan-300" />
                    <span className="text-sm font-semibold text-white">
                      {albums?.length || 0}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                    Albums
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Profile content */}
          <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950/60 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />

            <div className="p-4 sm:p-6 lg:p-8">
              <ProfilePageComponent
                user={user}
                musics={musics}
                albums={albums}
                artistMusics={artistMusics}
                artistAlbums={artistAlbums}
                artistLoading={artistLoading}
                likedIds={likedIds}
                onHome={() => navigate('/')}
                onArtistRegister={() => navigate('/artist-register')}
                onUpload={() => navigate('/upload')}
                onCreateAlbum={() => navigate('/create-album')}
                onUpdateMusic={handleUpdateMusic}
                onDeleteMusic={handleDeleteMusic}
                onUpdateAlbum={handleUpdateAlbum}
                onDeleteAlbum={handleDeleteAlbum}
                onProfileImageUpload={handleProfileImageUpload}
              />
            </div>
          </section>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-700">
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Your profile, your music, your orbit.</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}