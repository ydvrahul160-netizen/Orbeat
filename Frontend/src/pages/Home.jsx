import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaPlay,
  FaRegCompass,
  FaStar,
} from "react-icons/fa";
import {
  IoMusicalNotes,
  IoSparklesOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { useApp } from "../contexts/AppContext";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getScore } from "../utils/helpers";
import MusicList from "../components/music/MusicList";
import AlbumList from "../components/album/AlbumList";
import Avatar from "../components/ui/Avatar";
import OrbitTrail from "../components/home/OrbitTrail";

export default function Home() {
  const navigate = useNavigate();

  const {
    user,
    musics,
    albums,
    homeSections,
    query,
    currentTrack,
    handleTogglePlayback,
    handleLike,
    handleComment,
    handleSelectAlbum,
    error,
  } = useApp();

  const selectAlbum = async (albumId) => {
    await handleSelectAlbum(albumId);
    navigate(`/album-details/${albumId}`);
  };

  const isPlaying = (music) =>
    currentTrack?._id && String(currentTrack._id) === String(music?._id);

  const filteredMusics = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return musics;

    return musics.filter((music) => {
      const title = music.title?.toLowerCase() || "";
      const artist = music.artist?.username?.toLowerCase() || "";

      return title.includes(term) || artist.includes(term);
    });
  }, [musics, query]);

  const filteredAlbums = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return albums;

    return albums.filter((album) => {
      const title = album.title?.toLowerCase() || "";
      const artist = album.artist?.username?.toLowerCase() || "";

      return title.includes(term) || artist.includes(term);
    });
  }, [albums, query]);

  const filterSection = (items) => {
    const term = query.trim().toLowerCase();

    if (!term) return items || [];

    return (items || []).filter((music) => {
      const title = music.title?.toLowerCase() || "";
      const artist = music.artist?.username?.toLowerCase() || "";

      return title.includes(term) || artist.includes(term);
    });
  };

  const popularSongs = useMemo(() => {
    return [...filteredMusics]
      .sort((a, b) => getScore(b) - getScore(a))
      .slice(0, 10);
  }, [filteredMusics]);

  const recommendedSongs = filterSection(homeSections.recommended);

  const popularRadio = filterSection(
    homeSections.trendingNow || homeSections.popularRadio,
  );

  const featuredCharts = filterSection(
    homeSections.orbeatCharts || homeSections.featuredCharts,
  );

  const editorPicks = filterSection(homeSections.editorPicks);
  const freshDrops = filterSection(homeSections.freshDrops);
  const hiddenGems = filterSection(homeSections.hiddenGems);

  const searchedArtists = useMemo(() => {
    const seen = new Set();

    return filteredMusics
      .map((music) => music.artist)
      .filter(
        (artist) =>
          artist &&
          !seen.has(String(artist._id)) &&
          seen.add(String(artist._id)),
      );
  }, [filteredMusics]);

  const likedIds = useMemo(() => {
    const userId = user?.id;

    return new Set(
      musics
        .filter((music) =>
          music.likes?.some((like) => String(like) === String(userId)),
        )
        .map((music) => music._id),
    );
  }, [musics, user?.id]);

  const featuredTrack =
    recommendedSongs[0] || popularRadio[0] || popularSongs[0] || null;

  const spotlightCreators = homeSections.creatorSpotlight || [];

  return (
    <DashboardLayout>
      <main className="relative overflow-hidden bg-[#09090b] px-4 pb-20 pt-4 text-white sm:px-6 lg:px-8">
        {/* Ambient background */}
        <div className="pointer-events-none absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute right-[-180px] top-[500px] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />

        <div className="relative mx-auto max-w-[1500px]">
          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* =====================================================
              ORBEAT HERO
          ====================================================== */}
          <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#10101a] px-6 py-8 shadow-2xl sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mb-5 flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-cyan-300 uppercase">
                  <IoSparklesOutline className="text-lg" />
                  Your listening space
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Good vibes,{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {user?.username || "listener"}.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Discover something new, revisit a favorite, and find creators
                  worth following. Your next listen is already somewhere in your
                  orbit.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      featuredTrack && handleTogglePlayback(featuredTrack)
                    }
                    disabled={!featuredTrack}
                    className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                      <FaPlay className="ml-0.5 text-[9px]" />
                    </span>

                    {featuredTrack
                      ? isPlaying(featuredTrack)
                        ? "Playing now"
                        : "Play something"
                      : "Explore music"}
                  </button>

                  <button
                    onClick={() =>
                      document
                        .getElementById("discover")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <FaRegCompass />
                    Explore
                  </button>
                </div>
              </div>

              {/* Featured track */}
              {featuredTrack && (
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20">
                      {featuredTrack.coverImage || featuredTrack.imageUrl ? (
                        <img
                          src={
                            featuredTrack.coverImage || featuredTrack.imageUrl
                          }
                          alt={featuredTrack.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <IoMusicalNotes className="text-3xl text-cyan-300" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">
                        Picked for you
                      </p>

                      <h3 className="mt-1 truncate font-semibold text-white">
                        {featuredTrack.title}
                      </h3>

                      <p className="mt-1 truncate text-sm text-zinc-500">
                        {featuredTrack.artist?.username || "Unknown artist"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTogglePlayback(featuredTrack)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.1]"
                  >
                    <FaPlay className="text-[9px]" />
                    {isPlaying(featuredTrack) ? "Playing" : "Listen now"}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              SEARCH RESULTS
          ====================================================== */}
          {query.trim() && (
            <section className="mb-12 rounded-3xl border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-cyan-300 uppercase">
                    Search
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Results for "{query}"
                  </h2>
                </div>

                <FaRegCompass className="text-2xl text-zinc-700" />
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Songs
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {filteredMusics.length}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">matching tracks</p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Artists
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {searchedArtists.length}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    creators discovered
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Albums
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {filteredAlbums.length}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">releases found</p>
                </div>
              </div>

              {searchedArtists.length > 0 && (
                <div className="mt-7">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Matching creators
                  </p>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {searchedArtists.map((artist) => (
                      <div
                        key={artist._id}
                        className="flex min-w-[190px] items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3"
                      >
                        <Avatar artist={artist} size="h-10 w-10" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {artist.username}
                          </p>
                          <p className="text-xs text-zinc-500">Creator</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <div id="discover">
            {/* =====================================================
                FOR YOUR ORBIT
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Personal discovery"
                title="For Your Orbit"
                description="A mix of tracks worth your attention."
                icon={<IoSparklesOutline />}
              />

              {recommendedSongs.length > 0 ? (
                <MusicList
                  musics={recommendedSongs}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="Keep listening and your recommendations will evolve." />
              )}
            </section>

            {/* =====================================================
                WHAT'S MOVING
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Community pulse"
                title="What's Moving"
                description="Tracks getting attention across Orbeat."
                icon={<IoTrendingUpOutline />}
              />

              {popularRadio.length > 0 ? (
                <MusicList
                  musics={popularRadio}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="There is not enough activity yet." />
              )}
            </section>

            {/* =====================================================
                ORBEAT CHARTS
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="The weekly pulse"
                title="Orbeat Charts"
                description="The tracks rising through community activity."
                icon={<FaChartLine />}
              />

              {featuredCharts.length > 0 ? (
                <MusicList
                  musics={featuredCharts}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                  showRank
                />
              ) : (
                <EmptyShelf text="Charts will appear as listeners discover more music." />
              )}
            </section>

            {/* =====================================================
                FRESH DROPS
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="New arrivals"
                title="Just Released"
                description="Fresh music recently added by creators."
                icon={<IoMusicalNotes />}
              />

              {freshDrops.length > 0 ? (
                <MusicList
                  musics={freshDrops}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="No new releases are available yet." />
              )}
            </section>

            {/* =====================================================
                EDITOR'S PICKS
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Curated discovery"
                title="Curated for You"
                description="Recent additions selected from the Orbeat catalog."
                icon={<FaStar />}
              />

              {editorPicks.length > 0 ? (
                <MusicList
                  musics={editorPicks}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="Curated picks will appear as the catalog grows." />
              )}
            </section>

            {/* =====================================================
                HIDDEN GEMS
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Look beyond the obvious"
                title="Under the Radar"
                description="Less-played tracks that deserve another listen."
                icon={<FaRegCompass />}
              />

              {hiddenGems.length > 0 ? (
                <MusicList
                  musics={hiddenGems}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="Hidden gems will emerge as more creators publish music." />
              )}
            </section>

            {/* =====================================================
                CREATOR SPOTLIGHT
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Meet the creators"
                title="Creator Spotlight"
                description="Independent voices shaping the Orbeat catalog."
                icon={<IoSparklesOutline />}
              />

              {spotlightCreators.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {spotlightCreators.map((spotlight) => {
                    const artist = spotlight.artist;

                    return (
                      <article
                        key={artist?._id}
                        className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-zinc-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20"
                      >
                        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-500/[0.08] blur-3xl" />

                        <div className="relative">
                          <Avatar artist={artist} size="h-20 w-20" />

                          <p className="mt-5 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                            Creator
                          </p>

                          <h3 className="mt-1 truncate text-xl font-bold">
                            {artist?.username || "Unknown artist"}
                          </h3>

                          <p className="mt-2 text-sm text-zinc-500">
                            {spotlight.tracks?.length || 0} featured tracks
                          </p>

                          {spotlight.tracks?.[0] && (
                            <button
                              onClick={() =>
                                handleTogglePlayback(spotlight.tracks[0])
                              }
                              className="mt-5 flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                            >
                              <FaPlay className="text-[9px]" />
                              Play spotlight
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyShelf text="Creator spotlights will appear as the community grows." />
              )}
            </section>

            {/* =====================================================
                RECENTLY PLAYED
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Your listening trail"
                title="Recently Played"
                description="Pick up where you left off."
                icon={<FaArrowRight />}
              />

              {homeSections.recentlyPlayed?.length > 0 ? (
                <MusicList
                  musics={homeSections.recentlyPlayed}
                  onPlay={handleTogglePlayback}
                  onLike={handleLike}
                  onComment={handleComment}
                  currentTrack={currentTrack}
                  likedIds={likedIds}
                />
              ) : (
                <EmptyShelf text="Your listening history will appear here after you start exploring." />
              )}
            </section>

            {/* =====================================================
                ORBIT TRAIL
            ====================================================== */}
            <section className="mb-12">
              <OrbitTrail
                currentTrack={currentTrack}
                recommendations={recommendedSongs}
                hiddenGems={hiddenGems}
              />
            </section>

            {/* =====================================================
                ALBUMS
            ====================================================== */}
            <section className="mb-12">
              <SectionHeader
                eyebrow="Longer listens"
                title="Latest Releases"
                description="Albums and collections from the Orbeat catalog."
                icon={<IoMusicalNotes />}
              />

              {filteredAlbums.length > 0 ? (
                <AlbumList albums={filteredAlbums} onSelect={selectAlbum} />
              ) : (
                <EmptyShelf text="No albums are available yet." />
              )}
            </section>
          </div>

          {/* =====================================================
              FOOTER / PRODUCT STATEMENT
          ====================================================== */}
          <footer className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950">
            <div className="relative overflow-hidden px-6 py-10 sm:px-10">
              <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-3xl" />

              <div className="relative max-w-2xl">
                <div className="flex items-center gap-2 text-cyan-300">
                  <IoMusicalNotes />
                  <span className="text-sm font-semibold tracking-[0.18em] uppercase">
                    Orbeat
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Music discovery should feel personal.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500">
                  Orbeat brings listeners and independent creators together
                  through discovery, conversation, and a focused listening
                  experience.
                </p>
              </div>
            </div>

            <div className="grid border-t border-white/[0.06] sm:grid-cols-3">
              <FooterItem
                title="Discover"
                text="Find tracks, creators and releases beyond your usual rotation."
              />

              <FooterItem
                title="Create"
                text="Give artists a simple space to publish and manage their work."
              />

              <FooterItem
                title="Connect"
                text="Likes, comments and community activity shape the experience."
              />
            </div>
          </footer>
        </div>
      </main>
    </DashboardLayout>
  );
}

function SectionHeader({ eyebrow, title, description, icon }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-5">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase">
          {icon}
          {eyebrow}
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>

      <div className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-zinc-600 sm:flex">
        <FaArrowRight className="text-xs" />
      </div>
    </div>
  );
}

function EmptyShelf({ text }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-10 text-center">
      <IoMusicalNotes className="mx-auto text-2xl text-zinc-700" />

      <p className="mt-3 text-sm text-zinc-500">{text}</p>
    </div>
  );
}

function FooterItem({ title, text }) {
  return (
    <div className="p-6 sm:p-7">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}
