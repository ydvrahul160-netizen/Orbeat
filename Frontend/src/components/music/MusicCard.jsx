import { useState } from "react";
import { FaCommentDots, FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { useApp } from "../../contexts/AppContext";
import Avatar from "../ui/Avatar";
import CommentModal from "./CommentModal";

export default function MusicCard({
  music,
  onPlay,
  onLike,
  onComment,
  isActive = false,
  isLiked = false,
  rank,
}) {
  const { currentTrack, isPlaying } = useApp();
  const [commentsOpen, setCommentsOpen] = useState(false);

  const isPlayingCurrent = isPlaying && currentTrack?._id === music._id;

  return (
    <article
      className={`group w-52 shrink-0 snap-start rounded-lg p-3 transition-colors duration-300 sm:w-56 ${
        isActive ? "bg-zinc-800" : "bg-transparent hover:bg-zinc-900"
      }`}
    >
      {/* Cover */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-800">
        {music.coverImage ? (
          <img
            src={music.coverImage}
            alt={`${music.title} cover`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/80 to-zinc-950">
            <IoMusicalNotes className="text-6xl text-black/40" />
          </div>
        )}

        {/* Dark hover layer */}
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

        {/* Play button */}
        <button
          onClick={() => onPlay(music)}
          className={`absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-400 ${
            isPlayingCurrent
              ? "translate-y-0 opacity-100"
              : "translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          }`}
          aria-label={`${isPlayingCurrent ? "Pause" : "Play"} ${music.title}`}
        >
          {isPlayingCurrent ? (
            <FaPause className="text-sm" />
          ) : (
            <FaPlay className="ml-0.5 text-sm" />
          )}
        </button>

        {/* Rank */}
        {rank && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">
            #{rank}
          </span>
        )}
      </div>

      {/* Song information */}
      <div className="mt-3 min-w-0">
        <h3
          className={`truncate text-sm font-semibold ${
            isPlayingCurrent ? "text-green-400" : "text-white"
          }`}
          title={music.title}
        >
          {music.title}
        </h3>

        <div className="mt-1 flex min-w-0 items-center gap-2">
          <Avatar artist={music.artist} size="h-5 w-5" />

          <p
            className="truncate text-sm text-zinc-400 transition group-hover:text-zinc-300"
            title={music.artist?.username || "Unknown Artist"}
          >
            {music.artist?.username || "Unknown Artist"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-1">
        <button
          onClick={() => onLike(music._id)}
          className={`flex h-8 items-center gap-2 rounded-full px-2.5 text-xs transition ${
            isLiked
              ? "text-green-400"
              : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
          }`}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          <FaHeart />
          <span>{isLiked ? "Liked" : "Like"}</span>
        </button>

        <button
          type="button"
          onClick={() => setCommentsOpen(true)}
          className="flex h-8 items-center gap-2 rounded-full px-2.5 text-xs text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Comment on song"
        >
          <FaCommentDots />
          <span>Comment</span>
        </button>
      </div>

      {commentsOpen && (
        <CommentModal
          music={music}
          onComment={onComment}
          onClose={() => setCommentsOpen(false)}
        />
      )}
    </article>
  );
}
