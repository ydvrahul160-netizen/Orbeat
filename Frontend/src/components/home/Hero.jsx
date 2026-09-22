import { FaArrowRight, FaPlay } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
              <IoMusicalNotes className="text-sm" />
            </span>

            <span className="text-sm font-medium tracking-[0.22em] text-zinc-300 uppercase">
              Orbeat
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your sound.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Your orbit.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Find music that fits your moment, follow the artists you
            discover, and build a listening space that feels completely yours.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                navigate("/login", {
                  state: { from: "/" },
                })
              }
              className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <FaPlay className="ml-0.5 text-[10px]" />
              </span>
              Start Listening
            </button>

            <button
              onClick={() => navigate("/register")}
              className="group flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07]"
            >
              Create your account
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-zinc-500">
            <span>Discover new artists</span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
            <span>Build your collection</span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
            <span>Listen your way</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto flex h-[390px] w-full max-w-[500px] items-center justify-center sm:h-[460px]">
          {/* Outer orbit */}
          <div className="absolute h-[300px] w-[300px] rounded-full border border-violet-400/15 sm:h-[370px] sm:w-[370px]" />

          <div className="absolute h-[220px] w-[220px] rounded-full border border-cyan-400/10 sm:h-[280px] sm:w-[280px]" />

          {/* Orbit dots */}
          <div className="absolute h-[300px] w-[300px] animate-[spin_18s_linear_infinite] sm:h-[370px] sm:w-[370px]">
            <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.7)]" />
          </div>

          <div className="absolute h-[220px] w-[220px] animate-[spin_12s_linear_infinite_reverse] sm:h-[280px] sm:w-[280px]">
            <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.7)]" />
          </div>

          {/* Main visual */}
          <div className="relative flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-400/10 shadow-2xl backdrop-blur-xl sm:h-60 sm:w-60">
            <div className="absolute inset-4 rounded-[2rem] border border-white/[0.06]" />

            <div className="flex items-end gap-1.5">
              <span className="h-8 w-1.5 rounded-full bg-violet-300" />
              <span className="h-14 w-1.5 rounded-full bg-blue-300" />
              <span className="h-20 w-1.5 rounded-full bg-cyan-300" />
              <span className="h-11 w-1.5 rounded-full bg-blue-300" />
              <span className="h-16 w-1.5 rounded-full bg-violet-300" />
            </div>

            <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
              <FaPlay className="ml-0.5 text-[10px]" />
            </div>
          </div>

          {/* Floating music card */}
          <div className="absolute bottom-5 left-1/2 flex w-[230px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 p-3 shadow-xl backdrop-blur-xl sm:bottom-7 sm:left-5 sm:translate-x-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
              <IoMusicalNotes className="text-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Your next favorite
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Waiting to be discovered
              </p>
            </div>

            <div className="ml-auto flex items-end gap-0.5">
              <span className="h-3 w-1 rounded-full bg-violet-400" />
              <span className="h-5 w-1 rounded-full bg-blue-400" />
              <span className="h-3.5 w-1 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}