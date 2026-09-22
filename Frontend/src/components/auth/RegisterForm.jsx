import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMusic } from "react-icons/fa";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm({ onRegister, error }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      username,
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl transition duration-500 sm:p-8"
    >
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
              <FaMusic className="text-sm" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Orbeat
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Join Orbeat and discover music made for your mood.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="mt-7">
          <Button type="submit">
            <span className="flex items-center justify-center gap-2">
              Create Account
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Sign in
          </Link>
        </p>

        {/* Small footer */}
        <p className="mt-7 text-center text-[11px] leading-5 text-zinc-600">
          By creating an account, you can build your personal listening space
          on Orbeat.
        </p>
      </div>
    </form>
  );
}