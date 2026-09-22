import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const navigate = useNavigate();

  const { searchResults, handleSearch, handleTogglePlayback } = useApp();

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  return (
    <DashboardLayout>
      <div className="min-h-screen text-white">
        {/* Songs */}
        {searchResults.songs.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold">Songs</h2>

            {searchResults.songs.map((song) => (
              <button
                key={song._id}
                type="button"
                onClick={() => handleTogglePlayback(song)}
                className="mb-2 block w-full rounded-lg bg-zinc-900 p-4 text-left transition hover:bg-zinc-800"
              >
                <p className="font-semibold">{song.title}</p>

                <p className="text-sm text-zinc-400">
                  {song.artist?.username || "Unknown Artist"}
                </p>
              </button>
            ))}
          </section>
        )}

        {/* Artists */}
        {searchResults.artists.map((artist) => (
          <button
            key={artist._id}
            type="button"
            onClick={() => navigate(`/profile/${artist._id}`)}
            className="mb-2 block w-full rounded-lg bg-zinc-900 p-4 text-left transition hover:bg-zinc-800"
          >
            <p className="font-semibold">{artist.username}</p>

            {artist.bio && (
              <p className="mt-1 text-sm text-zinc-400">{artist.bio}</p>
            )}
          </button>
        ))}

        {/* Albums */}
        {searchResults.albums.map((album) => (
          <button
            key={album._id}
            type="button"
            onClick={() => navigate(`/album-details/${album._id}`)}
            className="mb-2 block w-full rounded-lg bg-zinc-900 p-4 text-left transition hover:bg-zinc-800"
          >
            <p className="font-semibold">{album.title}</p>

            <p className="text-sm text-zinc-400">
              {album.artist?.username || "Unknown Artist"}
            </p>
          </button>
        ))}

        {/* No Results */}
        {searchQuery &&
          searchResults.songs.length === 0 &&
          searchResults.artists.length === 0 &&
          searchResults.albums.length === 0 && (
            <p className="mt-10 text-center text-zinc-400">
              No results found for "{searchQuery}"
            </p>
          )}
      </div>
    </DashboardLayout>
  );
}
