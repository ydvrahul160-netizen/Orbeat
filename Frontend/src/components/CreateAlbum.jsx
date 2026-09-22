import { useState } from 'react'

import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'

export default function CreateAlbum({ onCreate, musics = [], error }) {
  const [title, setTitle] = useState('')
  const [musicId, setMusicId] = useState('')

  return (
    <form
      className="mx-auto max-w-xl rounded-lg border border-zinc-800 bg-zinc-900 p-6"
      onSubmit={(event) => {
        event.preventDefault()
        onCreate({ title: title.trim(), musicId })
      }}
    >
      <h2 className="mb-6 text-2xl font-bold">Create Album</h2>

      <Input
        label="Album title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter album title"
        required
      />

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Add song
        </label>
        <select
          value={musicId}
          onChange={(e) => setMusicId(e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select one of your uploaded songs</option>
          {musics.map((music) => (
            <option key={music._id} value={music._id}>
              {music.title}
            </option>
          ))}
        </select>
      </div>

      {!musics.length && (
        <p className="mb-5 rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-300">
          Upload a song first, then create an album from it.
        </p>
      )}

      {error && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button type="submit" disabled={!musics.length}>
        Create Album
      </Button>
    </form>
  )
}
