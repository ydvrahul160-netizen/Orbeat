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
      className={`group w-56 shrink-0 rounded-lg p-4 transition duration-300 hover:bg-zinc-800 sm:w-60 ${
        isActive ? "bg-zinc-800 ring-1 ring-green-500/50" : "bg-zinc-900/70"
      }`}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-gradient-to-br from-green-500 via-emerald-700 to-zinc-950 shadow-xl">
        {music.coverImage ? (
          <img
            src={music.coverImage}
            alt={`${music.title} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IoMusicalNotes className="text-7xl text-black/45" />
          </div>
        )}

        <button
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black shadow-xl transition hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2 sm:opacity-0"
          onClick={() => onPlay(music)}
          aria-label={`${isPlayingCurrent ? "Pause" : "Play"} ${music.title}`}
        >
          {isPlayingCurrent ? <FaPause /> : <FaPlay className="ml-1" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {rank && (
          <span className="text-sm font-bold text-green-400">#{rank}</span>
        )}
        <h3 className="truncate text-base font-bold text-white">
          {music.title}
        </h3>
      </div>
      <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
        <Avatar artist={music.artist} size="h-6 w-6" />
        <p className="truncate">{music.artist?.username || "Unknown Artist"}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
        <button
          className={`flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-zinc-700 hover:text-white ${
            isLiked ? "text-green-400" : ""
          }`}
          onClick={() => onLike(music._id)}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          <FaHeart /> Like
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-3 py-2"
          onClick={() => setCommentsOpen(true)}
        >
          <FaCommentDots /> Comment
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
