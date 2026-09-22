/**
 * ContentShelf Component - Displays a horizontal scrollable shelf of items
 * Used for: Radio Stations, Charts, Editor Picks
 */
function ContentShelf({ title, icon, items, tone = 'green' }) {
  if (!items.length) return null

  const colors = {
    green: 'from-green-600 to-emerald-950',
    blue: 'from-sky-600 to-indigo-950',
    pink: 'from-fuchsia-600 to-rose-950',
    amber: 'from-amber-500 to-red-950',
  }

  return (
    <section className="mt-10">
      <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
        {icon} {title}
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 pr-4 snap-x snap-mandatory">
        {items.map((item, index) => (
          <article
            key={item}
            className="w-52 shrink-0 rounded-lg bg-zinc-900/70 p-4 transition hover:bg-zinc-800 snap-start sm:w-56"
          >
            <div
              className={`mb-4 flex aspect-square items-center justify-center rounded-md bg-gradient-to-br ${colors[tone]} shadow-xl`}
            >
              <span className="text-4xl font-black text-white/90">{index + 1}</span>
            </div>
            <h4 className="line-clamp-2 font-bold text-white">{item}</h4>
            <p className="mt-2 text-sm text-zinc-400">Made for music lovers</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContentShelf
