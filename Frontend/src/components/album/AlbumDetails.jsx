import { FaArrowLeft, FaCompactDisc, FaPlay } from "react-icons/fa";
import Avatar from "../ui/Avatar";

export default function AlbumDetails({ album, onBack, onPlay, currentTrack }) {
  if (!album) {
    return (
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-12 text-center text-zinc-500">
        Select an album to explore
      </div>
    );
  }

  return (
    <section className="pb-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
      >
        <FaArrowLeft className="text-xs" />
        Back
      </button>

      {/* Album Hero */}
      <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-violet-950/70 via-zinc-950 to-[#07131b] p-6 shadow-2xl sm:p-8 lg:p-10">
        {/* Ambient background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-end">
          {/* Artwork */}
          <div className="group relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-zinc-900 to-cyan-500/10 shadow-2xl sm:h-52 sm:w-52">
            {album.coverImage ? (
              <img
                src={album.coverImage}
                alt={`${album.title} cover`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <FaCompactDisc className="text-8xl text-violet-400/80 transition duration-500 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Album information */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Album
            </p>

            <h1 className="mt-2 break-words text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {album.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <Avatar artist={album.artist} size="h-8 w-8" />

              <span className="font-medium text-white">
                {album.artist?.username || "Unknown Artist"}
              </span>

              <span className="text-zinc-600">•</span>

              <span className="text-zinc-400">
                {album.musics?.length || 0} songs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]">
        {/* Header */}
        <div className="grid grid-cols-[42px_1fr_64px] border-b border-white/[0.07] px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 sm:grid-cols-[52px_1fr_80px] sm:px-6">
          <span>#</span>
          <span>Track</span>
          <span className="text-right">Play</span>
        </div>

        {/* Tracks */}
        {album.musics?.length ? (
          <div>
            {album.musics.map((track, index) => {
              const isCurrent = currentTrack?._id === track._id;

              return (
                <div
                  key={track._id}
                  className={`group grid grid-cols-[42px_1fr_64px] items-center px-4 py-3 transition sm:grid-cols-[52px_1fr_80px] sm:px-6 ${
                    isCurrent ? "bg-violet-500/[0.08]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`text-sm ${
                      isCurrent
                        ? "font-semibold text-violet-300"
                        : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Track info */}
                  <div className="min-w-0 pr-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-900 via-zinc-900 to-cyan-900 sm:flex">
                        {track.coverImage ? (
                          <img
                            src={track.coverImage}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaCompactDisc className="text-lg text-violet-300/70" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3
                          className={`truncate text-sm font-semibold sm:text-base ${
                            isCurrent ? "text-violet-300" : "text-zinc-200"
                          }`}
                        >
                          {track.title}
                        </h3>

                        <p className="mt-0.5 truncate text-xs text-zinc-600 sm:text-sm">
                          {track.artist?.username ||
                            album.artist?.username ||
                            "Unknown Artist"}{" "}
                          <span className="text-zinc-700">•</span>{" "}
                          {track.likes?.length || 0} likes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Play */}
                  <button
                    onClick={() => onPlay(track)}
                    aria-label={
                      isCurrent ? `Play ${track.title}` : `Play ${track.title}`
                    }
                    className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full transition ${
                      isCurrent
                        ? "bg-violet-400 text-black shadow-lg shadow-violet-500/20"
                        : "bg-white/[0.07] text-zinc-300 hover:bg-white hover:text-black sm:opacity-0 sm:group-hover:opacity-100"
                    }`}
                  >
                    <FaPlay className="ml-0.5 text-xs" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FaCompactDisc className="mx-auto text-4xl text-zinc-700" />
            <p className="mt-4 text-sm text-zinc-500">
              This album doesn't have any tracks yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
