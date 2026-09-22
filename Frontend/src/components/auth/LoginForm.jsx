import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLock, FaMusic } from "react-icons/fa";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm({ onLogin, error }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      identifier,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-[400px] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0d0d12]/95 px-5 py-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6 sm:py-6"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-violet-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-cyan-400/[0.06] blur-3xl" />

      <div className="relative z-10">

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 text-violet-300 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/40">
            <FaMusic className="text-sm" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[27px]">
            Welcome back
          </h2>

          <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
            Continue where your music left off.
          </p>
        </div>

        {/* Form fields */}
        <div className="mt-5 space-y-3.5">

          <Input
            label="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-600">
              <FaLock className="text-[8px]" />
              <span>Your account stays private and secure.</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/15 bg-red-500/[0.06] px-3 py-2 text-xs leading-5 text-red-300">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="pt-0.5">
            <Button type="submit">
              <span className="flex items-center justify-center gap-2">
                Sign in
                <FaArrowRight className="text-[10px]" />
              </span>
            </Button>
          </div>
        </div>

        {/* Forgot */}
        <div className="mt-3 text-center">
          <Link
            to="/forgot-password"
            className="text-xs text-zinc-500 transition hover:text-violet-300"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.06]" />

          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-700">
            Orbeat
          </span>

          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Register */}
        <p className="text-center text-xs text-zinc-500 sm:text-sm">
          New to Orbeat?{" "}
          <Link
            to="/register"
            className="font-semibold text-violet-300 transition hover:text-cyan-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}