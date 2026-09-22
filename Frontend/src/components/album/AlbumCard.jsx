import { FaCompactDisc, FaPlay } from "react-icons/fa";

export default function AlbumCard({ album, onSelect }) {
  const artwork =
    album?.coverImage ||
    album?.image ||
    album?.artwork ||
    album?.thumbnail ||
    null;

  const artistName =
    album?.artist?.username ||
    album?.artist?.name ||
    "Orbeat Creator";

  return (
    <article
      onClick={() => onSelect(album._id)}
      className="group w-56 shrink-0 cursor-pointer rounded-3xl border border-white/[0.06] bg-white/[0.025] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05] sm:w-60"
    >
      {/* Artwork */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950 via-zinc-900 to-cyan-950 shadow-2xl">
        {artwork ? (
          <img
            src={artwork}
            alt={`${album.title} artwork`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

            <FaCompactDisc className="relative text-7xl text-violet-300/70 transition duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
        )}

        {/* Artwork overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Play button */}
        <button
          type="button"
          aria-label={`Play ${album.title}`}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(album._id);
          }}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <FaPlay className="ml-0.5 text-xs" />
        </button>

        {/* Album type */}
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
          Album
        </span>
      </div>

      {/* Information */}
      <div className="px-1 pb-1">
        <h3 className="truncate text-base font-semibold tracking-tight text-white">
          {album.title}
        </h3>

        <p className="mt-1 truncate text-sm text-zinc-500 transition group-hover:text-zinc-400">
          {artistName}
        </p>
      </div>
    </article>
  );
}