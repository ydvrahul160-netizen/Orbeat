export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-700 border-t-green-500"></div>

      <p className="mt-5 text-zinc-400">
        {text}
      </p>

    </div>
  );
}