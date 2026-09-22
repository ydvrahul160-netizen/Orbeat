import {
  FaCompass,
  FaWaveSquare,
  FaUserAstronaut,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: FaCompass,
    number: "01",
    title: "Discover Your Sound",
    desc: "Explore trending releases, hidden gems, fresh drops and curated picks from the Orbeat community.",
    accent: "from-violet-400 to-fuchsia-400",
  },
  {
    icon: FaWaveSquare,
    number: "02",
    title: "A Player That Follows You",
    desc: "Keep listening while you explore. Your active track stays synced across cards and the persistent player.",
    accent: "from-cyan-300 to-blue-500",
  },
  {
    icon: FaUserAstronaut,
    number: "03",
    title: "Built for Creators",
    desc: "Artists can publish music, manage releases, build their presence and understand how listeners engage.",
    accent: "from-emerald-300 to-teal-500",
  },
  {
    icon: FaChartLine,
    number: "04",
    title: "Community Shapes Discovery",
    desc: "Plays, likes and conversations help surface music people are actually listening to and enjoying.",
    accent: "from-orange-300 to-pink-500",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Made for the way you listen
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            More than a place to
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              press play.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
            Orbeat brings discovery, listening and creator tools together in
            one focused music experience.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-zinc-950/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-zinc-900/80 sm:p-7"
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${feature.accent} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                {/* Top row */}
                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-zinc-950 shadow-lg`}
                  >
                    <Icon className="text-lg" />
                  </div>

                  <span className="text-xs font-semibold tracking-widest text-zinc-600">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="relative mt-7 h-px overflow-hidden bg-white/[0.06]">
                  <div
                    className={`h-full w-0 bg-gradient-to-r ${feature.accent} transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}