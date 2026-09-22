import { useState } from 'react'
import Avatar from '../components/ui/Avatar'

/**
 * ProfilePage Component - User profile with stats and artist tools
 * This is a reusable component, use Profile.jsx page for routing
 */
function ProfilePageComponent({
  user,
  musics,
  albums,
  artistMusics = [],
  artistAlbums = [],
  artistLoading = false,
  likedIds,
  onHome,
  onArtistRegister,
  onUpload,
  onCreateAlbum,
  onUpdateMusic,
  onDeleteMusic,
  onUpdateAlbum,
  onDeleteAlbum,
  onProfileImageUpload,
}) {
  const [editingMusicId, setEditingMusicId] = useState(null)
  const [editingAlbumId, setEditingAlbumId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState('')
  const totalPlays = artistMusics.reduce((sum, music) => sum + (music.playCount || 0), 0)
  const totalLikes = artistMusics.reduce((sum, music) => sum + (music.likes?.length || 0), 0)
  const topTrack = [...artistMusics].sort((a, b) => (b.playCount || 0) - (a.playCount || 0))[0]

  const uploadImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImageError('')
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append('profileImage', file)
      await onProfileImageUpload(formData)
    } catch (error) {
      setImageError(error.message)
    } finally {
      setImageUploading(false)
    }
  }

  const saveMusic = async (musicId) => {
    await onUpdateMusic(musicId, { title: editingTitle })
    setEditingMusicId(null)
  }

  const saveAlbum = async (albumId) => {
    await onUpdateAlbum(albumId, { title: editingTitle })
    setEditingAlbumId(null)
  }

  return (
    <section>
      <div className="rounded-lg bg-gradient-to-r from-zinc-700 via-zinc-900 to-black p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div>
            <Avatar artist={user} size="h-28 w-28" className="text-5xl" />
            <label className="mt-3 block cursor-pointer text-center text-xs font-semibold text-green-300">
              {imageUploading ? 'Uploading...' : 'Change image'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={uploadImage}
                disabled={imageUploading}
              />
            </label>
            {imageError && <p className="mt-1 text-xs text-red-300">{imageError}</p>}
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-zinc-300">Profile</p>
            <h2 className="mt-2 text-4xl font-black sm:text-6xl">{user.username}</h2>
            <p className="mt-3 text-zinc-300">{user.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-zinc-800 px-3 py-1 text-sm font-bold capitalize text-green-300">
              {user.role} account
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Available catalog</p>
          <p className="mt-2 text-2xl font-black">{musics.length} tracks</p>
        </div>
        <div className="rounded-lg bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Liked</p>
          <p className="mt-2 text-2xl font-black">{likedIds.size} songs</p>
        </div>
        <div className="rounded-lg bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Available albums</p>
          <p className="mt-2 text-2xl font-black">{albums.length} releases</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        {user.role === 'artist' ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Artist Studio</h3>
              <p className="mt-2 text-zinc-400">Manage uploads and albums from your artist account.</p>
              <p className="mt-2 text-sm text-zinc-500">{artistMusics.length} songs uploaded by you</p>
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-full bg-green-500 px-5 py-3 font-bold text-black"
                onClick={onUpload}
              >
                Upload
              </button>
              <button
                className="rounded-full bg-zinc-800 px-5 py-3 font-bold text-white"
                onClick={onCreateAlbum}
              >
                Create Album
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Create Artist Account</h3>
              <p className="mt-2 text-zinc-400">Tap register to upgrade this profile into an artist account and unlock uploads.</p>
            </div>
            <button
              className="rounded-full bg-green-500 px-5 py-3 font-bold text-black"
              onClick={onArtistRegister}
            >
              Register Artist
            </button>
          </div>
        )}
      </div>

      {user.role === 'artist' && (
        <section className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
          <h3 className="text-2xl font-bold">Orbeat Studio Insights</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-900 p-4"><p className="text-sm text-zinc-400">Total plays</p><p className="mt-2 text-2xl font-black">{totalPlays}</p></div>
            <div className="rounded-lg bg-zinc-900 p-4"><p className="text-sm text-zinc-400">Likes</p><p className="mt-2 text-2xl font-black">{totalLikes}</p></div>
            <div className="rounded-lg bg-zinc-900 p-4"><p className="text-sm text-zinc-400">Releases</p><p className="mt-2 text-2xl font-black">{artistAlbums.length}</p></div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">Top track: <span className="font-semibold text-zinc-200">{topTrack?.title || 'No tracks yet'}</span></p>
        </section>
      )}

      {user.role === 'artist' && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="text-2xl font-bold">Your Songs</h3>
            {artistLoading ? (
              <p className="mt-4 text-zinc-400">Loading your songs...</p>
            ) : !artistMusics.length ? (
              <p className="mt-4 text-zinc-400">You have not uploaded any songs yet.</p>
            ) : (
              <div className="mt-4 grid gap-3">
                {artistMusics.map((music) => (
                  <div key={music._id} className="rounded-lg bg-zinc-900 p-4">
                    {editingMusicId === music._id ? (
                      <div className="flex flex-wrap gap-2">
                        <input
                          className="input-field min-w-0 flex-1"
                          value={editingTitle}
                          onChange={(event) => setEditingTitle(event.target.value)}
                          aria-label={`Edit ${music.title}`}
                        />
                        <button className="rounded-full bg-green-500 px-4 py-2 font-bold text-black" onClick={() => saveMusic(music._id)}>
                          Save
                        </button>
                        <button className="rounded-full bg-zinc-800 px-4 py-2 font-bold" onClick={() => setEditingMusicId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold">{music.title}</p>
                          <p className="mt-1 text-sm text-zinc-400">
                            {music.playCount || 0} plays · {music.likes?.length || 0} likes · {music.comments?.length || 0} comments
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-bold"
                            onClick={() => {
                              setEditingMusicId(music._id)
                              setEditingTitle(music.title)
                            }}
                          >
                            Edit
                          </button>
                          <button className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-300" onClick={() => onDeleteMusic(music._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="text-2xl font-bold">Your Albums</h3>
            {artistLoading ? (
              <p className="mt-4 text-zinc-400">Loading your albums...</p>
            ) : !artistAlbums.length ? (
              <p className="mt-4 text-zinc-400">You have not created any albums yet.</p>
            ) : (
              <div className="mt-4 grid gap-3">
                {artistAlbums.map((album) => (
                  <div key={album._id} className="rounded-lg bg-zinc-900 p-4">
                    {editingAlbumId === album._id ? (
                      <div className="flex flex-wrap gap-2">
                        <input
                          className="input-field min-w-0 flex-1"
                          value={editingTitle}
                          onChange={(event) => setEditingTitle(event.target.value)}
                          aria-label={`Edit ${album.title}`}
                        />
                        <button className="rounded-full bg-green-500 px-4 py-2 font-bold text-black" onClick={() => saveAlbum(album._id)}>
                          Save
                        </button>
                        <button className="rounded-full bg-zinc-800 px-4 py-2 font-bold" onClick={() => setEditingAlbumId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold">{album.title}</p>
                          <p className="mt-1 text-sm text-zinc-400">{album.musics?.length || 0} songs</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-bold"
                            onClick={() => {
                              setEditingAlbumId(album._id)
                              setEditingTitle(album.title)
                            }}
                          >
                            Edit
                          </button>
                          <button className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-300" onClick={() => onDeleteAlbum(album._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <button
        className="mt-6 rounded-full bg-zinc-900 px-5 py-3 font-bold text-zinc-200 hover:bg-zinc-800"
        onClick={onHome}
      >
        Back to Home
      </button>
    </section>
  )
}

export default ProfilePageComponent
