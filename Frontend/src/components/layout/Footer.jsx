import { FaGithub, FaLinkedin, FaMusic } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.07] bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/10">
              <FaMusic className="text-sm" />
            </div>

            <div>
              <h2 className="font-bold tracking-tight text-white">
                Orbeat
              </h2>

              <p className="mt-0.5 text-sm text-zinc-500">
                A modern space for music, creators and discovery.
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Orbeat. All rights reserved.
          </p>

          <p>
            Designed for listeners. Built for creators.
          </p>
        </div>
      </div>
    </footer>
  );
}