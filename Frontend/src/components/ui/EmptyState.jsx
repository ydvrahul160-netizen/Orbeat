import { FaMusic } from "react-icons/fa";

export default function EmptyState({
  title = "Nothing Here",
  description = "No data found.",
}) {
  return (
    <div className="rounded-3xl bg-zinc-900 py-16 text-center">

      <FaMusic className="mx-auto text-6xl text-green-500" />

      <h2 className="mt-6 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>

    </div>
  );
}