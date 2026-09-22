import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaCompactDisc } from 'react-icons/fa'
import DashboardLayout from '../Layouts/DashboardLayout'
import CreateAlbumComponent from '../components/CreateAlbum'
import { useApp } from '../contexts/AppContext'

export default function CreateAlbumPage() {
  const navigate = useNavigate()
  const { handleCreateAlbum, error, artistMusics } = useApp()

  const [localError, setLocalError] = useState('')
  const [localMessage, setLocalMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (!localMessage) return

    const timer = setTimeout(() => {
      navigate('/')
    }, 1800)

    return () => clearTimeout(timer)
  }, [localMessage, navigate])

  const onCreate = async (data) => {
    try {
      setLocalError('')
      setLocalMessage('')
      setIsCreating(true)

      await handleCreateAlbum(data)

      setLocalMessage('Your album is ready to go live.')
    } catch (err) {
      setLocalError(err?.message || 'Unable to create the album.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <DashboardLayout>
      <main className="relative min-h-full overflow-hidden px-1 pb-12">
        {/* Ambient background */}
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          {/* Header */}
          <header className="mb-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
            >
              <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </button>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-400/10 shadow-lg shadow-violet-950/20 sm:h-14 sm:w-14">
                <div className="absolute inset-0 bg-white/[0.03]" />
                <FaCompactDisc className="relative text-xl text-cyan-300 sm:text-2xl" />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Creator Space
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Create an album
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Bring your tracks together into a release your listeners can
                  discover.
                </p>
              </div>
            </div>
          </header>

          {/* Status messages */}
          {localError && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.07] px-4 py-4 text-sm text-red-300"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
              <span>{localError}</span>
            </div>
          )}

          {error && !localError && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.07] px-4 py-4 text-sm text-red-300"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
              <span>{error}</span>
            </div>
          )}

          {localMessage && (
            <div
              role="status"
              className="mb-6 overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10">
                  <FaCheckCircle className="text-cyan-300" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Album created successfully
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    {localMessage}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-full origin-left animate-[shrink_1.8s_linear] bg-cyan-300" />
              </div>
            </div>
          )}

          {/* Main card */}
          <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {/* Top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

            <div className="relative p-5 sm:p-7 lg:p-9">
              {/* Intro strip */}
              <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">
                    Shape your next release
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                    Select your tracks, give the release a name, and make it
                    part of your Orbeat catalog.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {artistMusics?.length || 0} available tracks
                </div>
              </div>

              {/* Existing form component */}
              <div className="relative">
                <CreateAlbumComponent
                  onCreate={onCreate}
                  musics={artistMusics}
                  error={error || localError}
                  isCreating={isCreating}
                />
              </div>
            </div>
          </section>

          {/* Small footer note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-zinc-600">
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>Made for independent creators on Orbeat</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </DashboardLayout>
  )
}