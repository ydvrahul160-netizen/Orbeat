import MusicCard from "./MusicCard";

export default function MusicList({
  musics,
  onPlay,
  onLike,
  onComment,
  currentTrack,
  likedIds = new Set(),
  showRank = false,
}) {
  if (!musics?.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-12 text-center text-zinc-400">
        No songs available
      </div>
    );
  }

  return (
    <div className="flex min-w-0 gap-4 overflow-x-auto pb-2 pr-4 snap-x snap-mandatory scrollbar-hide">
      {musics.map((music, index) => (
        <MusicCard
          key={music._id}
          music={music}
          onPlay={onPlay}
          onLike={onLike}
          onComment={onComment}
          isActive={currentTrack?._id === music._id}
          isLiked={likedIds.has(music._id)}
          rank={showRank ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}