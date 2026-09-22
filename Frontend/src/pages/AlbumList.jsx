import { FaCompactDisc, FaPlay, FaArrowUpRightFromSquare } from 'react-icons/fa6'

export default function AlbumList({ albums, onSelect }) {
  if (!albums?.length) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-6 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <FaCompactDisc className="text-xl text-zinc-500" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-zinc-200">
          No albums yet
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          New releases will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {albums.map((album) => (
        <button
          key={album._id}
          type="button"
          onClick={() => onSelect(album._id)}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-violet-400/40"
        >
          {/* Artwork */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/30 via-blue-500/10 to-zinc-950">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl transition duration-500 group-hover:bg-violet-400/30" />

            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <FaCompactDisc className="text-7xl text-white/20 transition duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-violet-300/50" />
            </div>

            {/* Play */}
            <span className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <FaPlay className="ml-0.5 text-xs" />
            </span>

            {/* Small badge */}
            <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-200 backdrop-blur-md">
              Album
            </span>
          </div>

          {/* Details */}
          <div className="px-1 pb-1 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-zinc-100 transition group-hover:text-white">
                  {album.title}
                </h3>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  {album.artist?.username || 'Unknown Artist'}
                </p>
              </div>

              <FaArrowUpRightFromSquare className="mt-1 shrink-0 text-xs text-zinc-600 transition group-hover:text-violet-300" />
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              {album.musics?.length || 0} tracks
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}