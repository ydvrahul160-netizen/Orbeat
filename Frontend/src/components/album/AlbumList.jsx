import AlbumCard from "./AlbumCard";

export default function AlbumList({ albums, onSelect }) {
  if (!albums?.length) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <span className="text-xl">◉</span>
        </div>

        <h3 className="mt-4 text-base font-semibold text-zinc-200">
          No albums found
        </h3>

        <p className="mt-1 max-w-sm text-sm text-zinc-600">
          Albums will appear here as creators publish new releases.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pr-4 [scrollbar-width:thin] [scrollbar-color:rgba(139,92,246,.35)_transparent]">
        {albums.map((album) => (
          <div
            key={album._id}
            className="w-52 shrink-0 snap-start sm:w-56 lg:w-60"
          >
            <AlbumCard album={album} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* subtle edge fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#09090b] to-transparent" />
    </div>
  );
}