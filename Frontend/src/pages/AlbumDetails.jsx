import { FaArrowRight, FaPlay } from 'react-icons/fa'
import { IoMusicalNotes } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20">
              <IoMusicalNotes />
            </span>
            Your music, your orbit
          </div>

          <h1 className="max-w-4xl text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Music that moves
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              with you.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            Discover new sounds, follow independent creators, and build a
            listening experience that feels completely yours.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() =>
                navigate('/login', {
                  state: { from: '/' },
                })
              }
              className="group flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-zinc-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <FaPlay className="ml-0.5 text-[10px]" />
              </span>
              Start Listening
            </button>

            <button
              onClick={() => navigate('/register')}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >
              Create an account
              <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-7 text-sm text-zinc-500">
            <span>Discover</span>
            <span>Listen</span>
            <span>Connect</span>
            <span>Create</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/20 via-[#11121c] to-cyan-400/10 p-6 shadow-2xl">
            <div className="absolute inset-8 rounded-[1.5rem] border border-white/10 bg-black/40" />

            <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 shadow-2xl">
                <div className="absolute inset-5 rounded-full border border-white/10" />
                <div className="absolute inset-12 rounded-full bg-zinc-950" />

                <IoMusicalNotes className="relative z-10 text-6xl text-cyan-300" />
              </div>
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur-xl">
              <div>
                <p className="text-xs text-zinc-500">Now exploring</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  New sounds
                </p>
              </div>

              <div className="flex items-end gap-1">
                <span className="h-3 w-1 rounded-full bg-violet-400" />
                <span className="h-6 w-1 rounded-full bg-cyan-300" />
                <span className="h-4 w-1 rounded-full bg-blue-400" />
                <span className="h-8 w-1 rounded-full bg-violet-400" />
                <span className="h-5 w-1 rounded-full bg-cyan-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}