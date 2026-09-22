import { FaArrowRight, FaPlay } from "react-icons/fa";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[88vh] overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-[0.18em] text-cyan-300 uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            Your sound. Your orbit.
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Music that
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              moves with you.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            Discover sounds you will actually remember. Explore new artists,
            follow your favorites, and build a listening space that feels
            completely yours.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() =>
                navigate("/login", {
                  state: { from: "/home" },
                })
              }
              className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-zinc-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition group-hover:scale-105">
                <FaPlay className="ml-0.5 text-[10px]" />
              </span>
              Start Listening
            </button>

            <button
              onClick={() => navigate("/register")}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-zinc-200 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
            >
              Create your account
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-zinc-500">
            <span>Discover new sounds</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Connect with creators</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>Listen your way</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10131d] p-4 shadow-2xl shadow-black/40">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative rounded-[1.5rem] border border-white/[0.07] bg-[#0b0d14] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                    Now drifting
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    Find your frequency
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-300">
                  <IoMusicalNotesOutline className="text-xl" />
                </div>
              </div>

              <div className="mt-8 flex items-end justify-center gap-1.5">
                {[32, 55, 42, 78, 48, 92, 60, 76, 38, 66, 50, 84, 44, 70].map(
                  (height, index) => (
                    <span
                      key={index}
                      className="w-1.5 rounded-full bg-gradient-to-t from-violet-500 to-cyan-300 opacity-80"
                      style={{ height: `${height}px` }}
                    />
                  ),
                )}
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20">
                    <IoMusicalNotesOutline className="text-2xl text-cyan-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">
                      Your next favorite
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Waiting to be discovered
                    </p>
                  </div>

                  <span className="text-xs text-zinc-600">ORBEAT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#11141d]/90 px-5 py-4 shadow-xl backdrop-blur-xl sm:block">
            <p className="text-[10px] tracking-widest text-zinc-500 uppercase">
              Built for
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              listeners & creators
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}