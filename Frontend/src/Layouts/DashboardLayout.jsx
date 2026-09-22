import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLayerGroup,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaUpload,
  FaUserCircle,
  FaCompactDisc,
} from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { useApp } from "../contexts/AppContext";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const {
    user,
    currentTrack,
    query,
    setQuery,
    handleLogout,
    handleTrackStarted,
    handleTrackEnded,
    setIsPlaying,
    audioRef,
  } = useApp();
  const [playerState, setPlayerState] = useState("idle");
  const [playerError, setPlayerError] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setPlayerError("");
    if (!currentTrack?.uri) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    audio.load();
    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        setPlayerState("paused");
        setPlayerError(
          "Unable to start this audio. Use the player controls to try again.",
        );
      }
    });
  }, [currentTrack?._id, currentTrack?.uri]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // const handleLogoutClick = async () => {
  //   await handleLogout();
  //   navigate("/login");
  // };

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* Main Grid */}
      <div className="grid h-[calc(100vh-112px)] grid-cols-1 gap-2 p-2 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="hidden rounded-lg bg-zinc-950 p-4 lg:flex lg:flex-col">
          <h1 className="mb-6 text-2xl font-black text-green-500">Orbeat</h1>

          <nav className="grid gap-2">
            <button
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
              onClick={scrollToTop}
            >
              <FaHome /> Home Dashboard
            </button>

            <button
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle /> Profile
            </button>

            {user?.role === "artist" && (
              <>
                <button
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
                  onClick={() => navigate("/upload")}
                >
                  <FaUpload /> Upload Song
                </button>
                <button
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
                  onClick={() => navigate("/create-album")}
                >
                  <FaPlus /> Create Album
                </button>
              </>
            )}

            {user?.role !== "artist" && (
              <button
                className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-green-300 transition hover:bg-green-500/10"
                onClick={() => navigate("/artist-register")}
              >
                <FaPlus /> Register Artist
              </button>
            )}
          </nav>

          <div className="mt-6 min-h-0 flex-1 rounded-lg bg-zinc-900 p-4">
            <h2 className="mb-4 flex items-center gap-2 font-bold text-zinc-200">
              <FaLayerGroup /> Your Library
            </h2>
            <div className="grid gap-3">
              <div className="rounded-md bg-zinc-800/80 p-4">
                <p className="font-semibold">Your Songs</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Swipe shelves to explore
                </p>
              </div>
              <div className="rounded-md bg-zinc-800/80 p-4">
                <p className="font-semibold">Your Albums</p>
                <p className="mt-1 text-sm text-zinc-400">Made by artists</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="mt-4 flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="overflow-y-auto rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-950 to-black">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-zinc-950/90 p-3 backdrop-blur md:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Mobile Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                <button
                  className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                  onClick={scrollToTop}
                >
                  Home
                </button>
                <button
                  className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                {user?.role === "artist" && (
                  <button
                    className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                    onClick={() => navigate("/upload")}
                  >
                    Upload
                  </button>
                )}
                {user?.role !== "artist" && (
                  <button
                    className="shrink-0 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black"
                    onClick={() => navigate("/artist-register")}
                  >
                    Artist
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <label className="relative m-0 block w-full md:max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query.trim()) {
                      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                    }
                  }}
                  className="w-full rounded-full border border-transparent bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white"
                  placeholder="Search songs, artists or albums..."
                />
              </label>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <button
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold capitalize"
                  onClick={() => navigate("/profile")}
                >
                  {user?.username}
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="rounded-full bg-zinc-900 p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white lg:hidden"
                  aria-label="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 pb-8 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Player Footer */}
      <footer className="grid h-28 grid-cols-[1fr_auto] items-center gap-4 border-t border-zinc-800 bg-zinc-950 px-4 md:grid-cols-[1fr_520px_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-zinc-800">
            {currentTrack ? (
              <IoMusicalNotes className="text-2xl text-black" />
            ) : (
              <FaCompactDisc className="text-green-300" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">
              {currentTrack?.title || "Choose a song"}
            </p>
            <p className="truncate text-sm text-zinc-400">
              {currentTrack?.artist?.username || "Nothing playing yet"}
            </p>
          </div>
        </div>

        <div className="min-w-0 md:col-auto">
          <audio
            ref={audioRef}
            controls
            autoPlay={Boolean(currentTrack)}
            src={currentTrack?.uri || undefined}
            className="w-44 max-w-full md:w-full md:max-w-[520px]"
            onLoadStart={() => {
              setPlayerError("");
              setPlayerState("loading");
            }}
            onCanPlay={() => {
              setPlayerError("");
              setPlayerState("ready");
            }}
            onWaiting={() => setPlayerState("loading")}
            onPlay={() => {
              setPlayerError("");
              setPlayerState("playing");
              setIsPlaying(true);
              handleTrackStarted(currentTrack);
            }}
            onPause={() => {
              setPlayerState("paused");
              setIsPlaying(false);
            }}
            onEnded={() => {
              setPlayerState("ended");
              setIsPlaying(false);
              handleTrackEnded(currentTrack);
            }}
            onError={() => {
              setPlayerState("error");
              setIsPlaying(false);
              setPlayerError("Unable to play this audio file.");
            }}
          />
          <p className="mt-1 min-h-4 text-xs text-red-300" aria-live="polite">
            {playerError ||
              (playerState === "loading" ? "Loading audio..." : "")}
          </p>
        </div>

        <div className="hidden justify-end gap-4 text-sm text-zinc-400 md:flex">
          <span>{currentTrack?.likes?.length || 0} likes</span>
          <span>{currentTrack?.comments?.length || 0} comments</span>
        </div>
      </footer>
            {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white">
              Logout?
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Are you sure you want to logout from Orbeat?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleLogout();
                  setShowLogoutConfirm(false);
                  navigate("/login");
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
