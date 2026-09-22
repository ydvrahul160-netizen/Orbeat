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
    <div className="flex gap-5 overflow-x-auto pb-4 pr-4 snap-x snap-mandatory">
      {musics.map((music, index) => (
        <div key={music._id} className="snap-start">
          <MusicCard
            music={music}
            onPlay={onPlay}
            onLike={onLike}
            onComment={onComment}
            isActive={currentTrack?._id === music._id}
            isLiked={likedIds.has(music._id)}
            rank={showRank ? index + 1 : undefined}
          />
        </div>
      ))}
    </div>
  );
}
