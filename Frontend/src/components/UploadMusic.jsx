import { useState } from 'react'

import Button from './ui/Button.jsx'
import Input from './ui/Input.jsx'

export default function UploadMusic({ onUpload, error }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  return (
    <form
      className="mx-auto max-w-xl rounded-lg border border-zinc-800 bg-zinc-900 p-6"
      onSubmit={(event) => {
        event.preventDefault()

        if (!file) return

        const formData = new FormData()

        formData.append('title', title.trim())
        formData.append('music', file)

        if (coverImage) {
          formData.append('coverImage', coverImage)
        }

        onUpload(formData)
      }}
    >
      <h2 className="mb-6 text-2xl font-bold">Upload Song</h2>

      <Input
        label="Song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter song title"
        required
      />

      {/* Audio */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Audio file
        </label>

        <input
          className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-green-500 file:px-4 file:py-2 file:font-semibold file:text-black"
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
      </div>

      {/* Cover Image */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Cover image
          <span className="ml-2 text-xs text-zinc-500">
            Optional
          </span>
        </label>

        <input
          className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-zinc-700 file:px-4 file:py-2 file:font-semibold file:text-white"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
        />

        <p className="mt-2 text-xs text-zinc-500">
          JPG, PNG or WebP • Maximum 5 MB
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button type="submit">Upload</Button>
    </form>
  )
}