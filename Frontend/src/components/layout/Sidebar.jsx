import {
  FaHome,
  FaCompactDisc,
  FaHeart,
  FaUpload,
} from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { IoSparklesOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const mainItems = [
  {
    label: "Home",
    icon: FaHome,
    path: "/home",
  },
  {
    label: "Discover",
    icon: MdLibraryMusic,
    path: "/search",
  },
  {
    label: "Albums",
    icon: FaCompactDisc,
    path: "/albums",
  },
  {
    label: "Favorites",
    icon: FaHeart,
    path: "/favorites",
  },
];

const creatorItems = [
  {
    label: "Upload Music",
    icon: FaUpload,
    path: "/upload",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }

    return location.pathname.startsWith(path);
  };

  const renderItem = (item) => {
    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <button
        key={item.label}
        onClick={() => navigate(item.path)}
        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
          active
            ? "bg-violet-500/[0.12] text-white"
            : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
        }`}
      >
        {/* Active indicator */}
        {active && (
          <span className="absolute left-0 h-6 w-0.5 rounded-full bg-gradient-to-b from-violet-400 to-cyan-300" />
        )}

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
            active
              ? "bg-violet-500/15 text-violet-300"
              : "bg-white/[0.03] text-zinc-600 group-hover:bg-white/[0.06] group-hover:text-zinc-300"
          }`}
        >
          <Icon className="text-sm" />
        </span>

        <span>{item.label}</span>

        {active && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
        )}
      </button>
    );
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#09090b] md:flex md:flex-col">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Header */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-sm font-black text-violet-300">
              O
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-wide text-white">
                Orbeat
              </h2>

              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                Your music space
              </p>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div>
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            Explore
          </p>

          <nav className="space-y-1">
            {mainItems.map(renderItem)}
          </nav>
        </div>

        {/* Creator section */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            Creator
          </p>

          <nav className="space-y-1">
            {creatorItems.map(renderItem)}
          </nav>
        </div>

        {/* Bottom identity card */}
        <div className="mt-auto pt-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="relative">
              <IoSparklesOutline className="text-sm text-cyan-300" />

              <p className="mt-3 text-xs font-semibold text-zinc-300">
                Find your next sound.
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                Explore independent creators and discover something unexpected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}