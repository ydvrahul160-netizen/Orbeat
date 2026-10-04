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
    isPlaying,
    audioRef,
  } = useApp();

  const [playerState, setPlayerState] = useState("idle");
  const [playerError, setPlayerError] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [volume, setVolume] = useState(1);

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

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateTime = () => {
    setCurrentTime(audio.currentTime);
  };

  const updateDuration = () => {
    setDuration(audio.duration || 0);
  };

  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("durationchange", updateDuration);

  return () => {
    audio.removeEventListener("timeupdate", updateTime);
    audio.removeEventListener("loadedmetadata", updateDuration);
    audio.removeEventListener("durationchange", updateDuration);
  };
}, [currentTrack]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* Main Grid */}
      <div className="grid h-[calc(100vh-112px)] grid-cols-1 gap-2 p-2 lg:grid-cols-[280px_1fr]">
        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <aside className="hidden rounded-lg bg-zinc-950 p-4 lg:flex lg:flex-col">
          {/* BRAND */}
          <button
            onClick={scrollToTop}
            className="mb-7 w-fit text-left text-2xl font-black text-green-500"
          >
            Orbeat
          </button>

          {/* MAIN NAVIGATION */}
          <nav className="grid gap-2">
            <button
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
              onClick={scrollToTop}
            >
              <FaHome />
              Home
            </button>

            {user ? (
              <>
                <button
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
                  onClick={() => navigate("/profile")}
                >
                  <FaUserCircle />
                  Profile
                </button>

                {user.role === "artist" && (
                  <>
                    <button
                      className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
                      onClick={() => navigate("/upload")}
                    >
                      <FaUpload />
                      Upload Song
                    </button>

                    <button
                      className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-100 transition hover:bg-zinc-900"
                      onClick={() => navigate("/create-album")}
                    >
                      <FaPlus />
                      Create Album
                    </button>
                  </>
                )}

                {user.role !== "artist" && (
                  <button
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-green-300 transition hover:bg-green-500/10"
                    onClick={() => navigate("/artist-register")}
                  >
                    <FaPlus />
                    Register Artist
                  </button>
                )}
              </>
            ) : null}
          </nav>

          {/* =====================================================
              LIBRARY
          ====================================================== */}
          <div className="mt-6 min-h-0 flex-1 rounded-lg bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-bold text-zinc-200">
                <FaLayerGroup />
                Your Library
              </h2>

              {!user && (
                <button
                  onClick={() => navigate("/login")}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                  aria-label="Create playlist"
                >
                  <FaPlus className="text-xs" />
                </button>
              )}
            </div>

            {user ? (
              <div className="grid gap-3">
                <div className="rounded-md bg-zinc-800/80 p-4">
                  <p className="font-semibold">Your Songs</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Swipe shelves to explore
                  </p>
                </div>

                <div className="rounded-md bg-zinc-800/80 p-4">
                  <p className="font-semibold">Your Albums</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Made by artists
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                <div className="rounded-md bg-zinc-800/80 p-4">
                  <p className="font-semibold">Create your first playlist</p>

                  <p className="mt-2 text-sm leading-5 text-zinc-400">
                    It's easy, we'll help you
                  </p>

                  <button
                    onClick={() => navigate("/login")}
                    className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-zinc-200"
                  >
                    Create playlist
                  </button>
                </div>

                <div className="rounded-md bg-zinc-800/80 p-4">
                  <p className="font-semibold">
                    Discover new music
                  </p>

                  <p className="mt-2 text-sm leading-5 text-zinc-400">
                    Explore songs, artists and albums on Orbeat.
                  </p>

                  <button
                    onClick={scrollToTop}
                    className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-zinc-200"
                  >
                    Browse music
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* LOGOUT - ONLY LOGGED IN */}
          {user && (
            <button
              onClick={handleLogoutClick}
              className="mt-4 flex items-center gap-3 rounded-md px-3 py-3 text-left font-semibold text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <main className="overflow-y-auto rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-950 to-black">
          {/* =====================================================
              HEADER
          ====================================================== */}
          <header className="sticky top-0 z-20 bg-zinc-950/90 p-3 backdrop-blur md:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* MOBILE NAVIGATION */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                <button
                  className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                  onClick={scrollToTop}
                >
                  Home
                </button>

                {user ? (
                  <>
                    <button
                      className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>

                    {user.role === "artist" && (
                      <button
                        className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                        onClick={() => navigate("/upload")}
                      >
                        Upload
                      </button>
                    )}

                    {user.role !== "artist" && (
                      <button
                        className="shrink-0 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black"
                        onClick={() => navigate("/artist-register")}
                      >
                        Artist
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>

                    <button
                      className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
                      onClick={() => navigate("/register")}
                    >
                      Create account
                    </button>
                  </>
                )}
              </div>

              {/* SEARCH BAR */}
              <label className="relative m-0 block w-full md:max-w-xl">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query.trim()) {
                      navigate(
                        `/search?q=${encodeURIComponent(query.trim())}`,
                      );
                    }
                  }}
                  className="w-full rounded-full border border-transparent bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/20"
                  placeholder="Search songs, artists or albums..."
                />
              </label>

              {/* RIGHT SIDE */}
              <div className="hidden items-center gap-2 md:flex">
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="rounded-full px-4 py-2 text-sm font-bold text-zinc-300 transition hover:text-white"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => navigate("/register")}
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
                    >
                      Create account
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-bold capitalize transition hover:bg-zinc-800"
                      onClick={() => navigate("/profile")}
                    >
                      <FaUserCircle />
                      {user.username}
                    </button>

                    <button
                      onClick={handleLogoutClick}
                      className="rounded-full bg-zinc-900 p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                      aria-label="Logout"
                    >
                      <FaSignOutAlt />
                    </button>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="p-4 pb-8 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* =====================================================
          PLAYER FOOTER
      ====================================================== */}
<footer className="grid h-24 grid-cols-[1fr_auto] items-center gap-4 border-t border-zinc-800/60 px-4 md:grid-cols-[1fr_520px_1fr] md:px-5">

  {/* Current Song */}
  <div className="flex min-w-0 items-center gap-3">

    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-zinc-900">
      {currentTrack?.coverImage ? (
        <img
          src={currentTrack.coverImage}
          alt={currentTrack.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <IoMusicalNotes className="text-2xl text-zinc-600" />
        </div>
      )}
    </div>

    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-white">
        {currentTrack?.title || "Choose a song"}
      </p>

      <p className="truncate text-xs text-zinc-400">
        {currentTrack?.artist?.username || "Nothing playing yet"}
      </p>
    </div>
  </div>


  {/* CENTER PLAYER */}
  <div className="flex w-full min-w-0 flex-col items-center">

    {/* Controls */}
    <div className="flex items-center gap-5">

      <button
        type="button"
        className="text-zinc-400 transition hover:text-white"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = Math.max(
              0,
              audioRef.current.currentTime - 10
            );
          }
        }}
        aria-label="Previous 10 seconds"
      >
        <span className="text-xs font-bold">-10</span>
      </button>


      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
        onClick={() => {
          if (!audioRef.current || !currentTrack) return;

          if (audioRef.current.paused) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <span className="text-sm">❚❚</span>
        ) : (
          <span className="ml-0.5 text-sm">▶</span>
        )}
      </button>


      <button
        type="button"
        className="text-zinc-400 transition hover:text-white"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
              audioRef.current.duration || 0,
              audioRef.current.currentTime + 10
            );
          }
        }}
        aria-label="Next 10 seconds"
      >
        <span className="text-xs font-bold">+10</span>
      </button>

    </div>


    {/* Progress */}
    <div className="mt-1 flex w-full items-center gap-2">

      <span className="w-8 text-right text-[10px] text-zinc-500">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(e) => {
          const time = Number(e.target.value);

          if (audioRef.current) {
            audioRef.current.currentTime = time;
          }

          setCurrentTime(time);
        }}
        className="h-1 flex-1 cursor-pointer accent-green-500"
        aria-label="Song progress"
      />

      <span className="w-8 text-[10px] text-zinc-500">
        {formatTime(duration)}
      </span>

    </div>

  </div>


  {/* RIGHT SIDE */}
  <div className="hidden items-center justify-end gap-4 md:flex">

    {/* Volume */}
    <div className="flex items-center gap-2">

      <span className="text-sm text-zinc-500">
        🔊
      </span>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          const value = Number(e.target.value);

          setVolume(value);

          if (audioRef.current) {
            audioRef.current.volume = value;
          }
        }}
        className="w-20 cursor-pointer accent-green-500"
        aria-label="Volume"
      />

    </div>


    {/* Stats */}
    <div className="flex items-center gap-3 text-xs text-zinc-500">

      <span>
        {currentTrack?.likes?.length || 0} likes
      </span>

      <span>
        {currentTrack?.comments?.length || 0} comments
      </span>

    </div>

  </div>


  {/* HIDDEN NATIVE AUDIO */}
  <audio
    ref={audioRef}
    autoPlay={Boolean(currentTrack)}
    src={currentTrack?.uri || undefined}
    className="hidden"

    onLoadStart={() => {
      setPlayerError("");
      setPlayerState("loading");
    }}

    onCanPlay={() => {
      setPlayerError("");
      setPlayerState("ready");
    }}

    onWaiting={() => {
      setPlayerState("loading");
    }}

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

</footer>

      {/* =====================================================
          LOGOUT CONFIRMATION
      ====================================================== */}
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
function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}