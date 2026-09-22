/**
 * ArtistRegisterPage Component - Artist account registration
 * This is a reusable component, use ArtistRegister.jsx page for routing
 */
function ArtistRegisterPageComponent({ user, onBecomeArtist, onHome }) {
  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-sm font-bold uppercase text-green-400">Artist Registration</p>
      <h2 className="mt-3 text-4xl font-black">Open your artist account</h2>
      <p className="mt-4 text-zinc-400">
        This will upgrade {user.username} from listener to artist and unlock upload plus album tools.
      </p>

      <div className="mt-6 rounded-lg bg-zinc-900 p-5">
        <label className="mb-2 block text-sm font-bold text-zinc-300">Artist display name</label>
        <input className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white" value={user.username} readOnly />
        <p className="mt-3 text-sm text-zinc-500">You can keep this name for now and polish your brand later.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          className="rounded-full bg-green-500 px-5 py-3 font-bold text-black hover:bg-green-600"
          onClick={onBecomeArtist}
        >
          Create Artist Account
        </button>
        <button className="rounded-full bg-zinc-800 px-5 py-3 font-bold text-white hover:bg-zinc-700" onClick={onHome}>
          Cancel
        </button>
      </div>
    </section>
  )
}

export default ArtistRegisterPageComponent
