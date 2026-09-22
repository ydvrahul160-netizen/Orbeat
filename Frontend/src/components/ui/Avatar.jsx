export default function Avatar({ artist, size = 'h-10 w-10', className = '' }) {
  const label = artist?.username?.charAt(0)?.toUpperCase() || 'A'

  return artist?.profileImage ? (
    <img
      src={artist.profileImage}
      alt={artist.username || 'Artist'}
      className={`${size} rounded-full object-cover ${className}`}
    />
  ) : (
    <div className={`${size} flex items-center justify-center rounded-full bg-green-500 font-bold text-black ${className}`}>
      {label}
    </div>
  )
}
