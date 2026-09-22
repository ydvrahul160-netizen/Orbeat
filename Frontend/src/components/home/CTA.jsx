import { FaArrowRight, FaHeadphones } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-4 my-20 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950 px-6 py-16 sm:mx-8 sm:px-10 sm:py-20 lg:px-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          <FaHeadphones className="text-cyan-300" />
          Your next listen is waiting
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find your sound.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Make it yours.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          Discover new releases, follow creators you enjoy, and build your
          own listening journey with Orbeat.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/register")}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200"
          >
            Create your account
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <FaArrowRight className="text-[10px]" />
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-zinc-200 transition duration-300 hover:border-white/20 hover:bg-white/[0.07]"
          >
            Sign in
          </button>
        </div>

        {/* Small trust/product line */}
        <p className="mt-7 text-xs text-zinc-600">
          Discover • Listen • Connect • Create
        </p>
      </div>
    </section>
  );
}