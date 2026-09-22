const artists = [
  "Arijit Singh",
  "Ed Sheeran",
  "Taylor Swift",
  "Atif Aslam",
];

export default function TopArtists() {
  return (
    <section className="px-8 py-20">

      <h2 className="mb-12 text-4xl font-bold text-white">
        Popular Artists
      </h2>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">

        {artists.map((artist) => (
          <div
            key={artist}
            className="text-center"
          >
            <div className="mx-auto mb-5 flex h-48 w-48 items-center justify-center rounded-full bg-zinc-800 text-6xl">
              🎤
            </div>

            <h3 className="text-xl font-semibold text-white">
              {artist}
            </h3>

          </div>
        ))}

      </div>

    </section>
  );
}