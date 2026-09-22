import Avatar from '../ui/Avatar'

export default function OrbitTrail({ currentTrack, recommendations = [], hiddenGems = [] }) {
  const trail = [
    currentTrack,
    recommendations.find((track) => track._id !== currentTrack?._id),
    hiddenGems.find((track) => track._id !== currentTrack?._id),
  ].filter(Boolean)

  return (
    <section className="mt-10 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-400">Orbit</p>
          <h3 className="mt-1 text-2xl font-bold">Your discovery trail</h3>
        </div>
        <span className="text-sm text-zinc-500">Live from your current feed</span>
      </div>
      {trail.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {trail.map((track, index) => (
            <div key={`${track._id}-${index}`} className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-2">
                <Avatar artist={track.artist} size="h-7 w-7" />
                <div className="max-w-36">
                  <p className="truncate text-sm font-semibold">{track.title}</p>
                  <p className="truncate text-xs text-zinc-500">{track.artist?.username || 'Artist'}</p>
                </div>
              </div>
              {index < trail.length - 1 && <span className="text-green-400">↓</span>}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-zinc-500">Start listening to build your Orbit.</p>
      )}
    </section>
  )
}
