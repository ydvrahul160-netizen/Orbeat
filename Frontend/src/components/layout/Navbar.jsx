import { FaSearch, FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSparklesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const goToLogin = (destination) => {
    navigate("/login", {
      state: {
        from: destination,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#09090b]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-3 px-3 sm:h-[68px] sm:gap-5 sm:px-5 lg:px-8 xl:px-10">

        {/* ================= BRAND ================= */}
        <button
          onClick={() => navigate("/")}
          className="group flex shrink-0 items-center gap-2.5 rounded-xl outline-none"
          aria-label="Go to Orbeat home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-cyan-400/10 text-sm font-black text-violet-100 shadow-lg shadow-violet-500/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-violet-400/40 sm:h-10 sm:w-10">
            O

            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-cyan-300/60 blur-[6px]" />
          </span>

          <div className="hidden sm:block">
            <span className="block text-lg font-bold leading-none tracking-tight text-white lg:text-xl">
              Orbeat
            </span>

            <span className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-600 lg:block">
              Your sound space
            </span>
          </div>
        </button>

        {/* ================= DESKTOP SEARCH ================= */}
        <button
          onClick={() => goToLogin("/search")}
          className="group relative mx-auto hidden w-full max-w-[520px] lg:block"
          aria-label="Search Orbeat"
        >
          <FaSearch className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs text-zinc-600 transition duration-300 group-hover:text-violet-300" />

          <div className="flex h-10 w-full items-center rounded-full border border-white/[0.07] bg-white/[0.035] pl-11 pr-20 text-left text-sm text-zinc-600 shadow-inner transition duration-300 group-hover:border-violet-400/20 group-hover:bg-white/[0.055] group-hover:text-zinc-400">
            Search songs, artists and albums
          </div>

          <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/[0.07] bg-white/[0.04] px-2 py-1 text-[9px] font-medium tracking-wider text-zinc-600 xl:block">
            SEARCH
          </span>
        </button>

        {/* ================= TABLET SEARCH ================= */}
        <button
          onClick={() => goToLogin("/search")}
          className="ml-auto hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-zinc-500 transition duration-300 hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-violet-300 md:flex lg:hidden"
          aria-label="Search"
        >
          <FaSearch className="text-sm" />
        </button>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:ml-0">

          {/* Mobile / Tablet Search */}
          <button
            onClick={() => goToLogin("/search")}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition duration-300 hover:bg-white/[0.05] hover:text-violet-300 active:scale-95 md:hidden"
            aria-label="Search"
          >
            <FaSearch className="text-sm" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => goToLogin("/notifications")}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition duration-300 hover:bg-white/[0.05] hover:text-cyan-300 active:scale-95 sm:h-10 sm:w-10"
            aria-label="Notifications"
          >
            <FaBell className="text-sm sm:text-[15px]" />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-70" />
          </button>

          {/* Divider */}
          <span className="mx-1 hidden h-6 w-px bg-white/[0.07] sm:block" />

          {/* Profile */}
          <button
            onClick={() => goToLogin("/profile")}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-xl text-zinc-400 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-200 active:scale-95 sm:h-10 sm:w-10"
            aria-label="Profile"
          >
            <CgProfile className="transition duration-300 group-hover:scale-105" />
          </button>
        </div>
      </div>

      {/* ================= MOBILE SEARCH BAR ================= */}
      <div className="border-t border-white/[0.04] px-3 pb-3 pt-2 md:hidden">
        <button
          onClick={() => goToLogin("/search")}
          className="group flex h-10 w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 text-left text-sm text-zinc-600 transition duration-300 hover:border-violet-400/20 hover:bg-white/[0.05]"
          aria-label="Search Orbeat"
        >
          <FaSearch className="shrink-0 text-xs text-zinc-600 transition group-hover:text-violet-300" />

          <span className="truncate">
            Search songs, artists and albums
          </span>

          <IoSparklesOutline className="ml-auto shrink-0 text-sm text-violet-400/50" />
        </button>
      </div>
    </header>
  );
}