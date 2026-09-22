import { useState } from 'react'

export default function CommentModal({ music, onComment, onClose }) {
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitComment = async (event) => {
    event.preventDefault()
    const value = comment.trim()
    if (!value) return

    setError('')
    setSubmitting(true)
    try {
      await onComment(music._id, value)
      setComment('')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label={`Comments for ${music.title}`}>
      <div className="flex max-h-[min(90vh,36rem)] w-full max-w-md flex-col rounded-lg border border-zinc-700 bg-zinc-950 p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-zinc-500">Comments</p>
            <h3 className="mt-1 truncate text-xl font-bold text-white">{music.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-zinc-800 px-3 py-2 text-sm font-bold text-zinc-200">
            Close
          </button>
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
          {!music.comments?.length ? (
            <p className="py-8 text-center text-sm text-zinc-500">No comments yet.</p>
          ) : (
            <div className="grid gap-3">
              {music.comments.map((item) => (
                <div key={item._id || `${item.user?._id}-${item.createdAt}`} className="rounded-md bg-zinc-900 p-3">
                  <p className="font-semibold text-zinc-300">{item.user?.username || 'Listener'}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <form className="mt-4 flex gap-2" onSubmit={submitComment}>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="min-w-0 flex-1 rounded-full border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-green-500"
            placeholder="Add comment"
            autoFocus
          />
          <button type="submit" disabled={submitting} className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black disabled:opacity-50">
            {submitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
