import { FaPlay } from "react-icons/fa";

const songs = [
  "Blinding Lights",
  "Believer",
  "Shape of You",
  "Levitating",
];

export default function TrendingSongs() {
  return (
    <section className="px-8 py-20">

      <h2 className="mb-10 text-4xl font-bold text-white">
        Trending Songs
      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {songs.map((song) => (
          <div
            key={song}
            className="group rounded-2xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
          >
            <div className="mb-6 flex h-44 items-center justify-center rounded-xl bg-zinc-800">
              🎵
            </div>

            <h3 className="font-semibold text-white">
              {song}
            </h3>

            <p className="mb-4 text-zinc-400">
              Unknown Artist
            </p>

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black opacity-0 transition group-hover:opacity-100">
              <FaPlay />
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}