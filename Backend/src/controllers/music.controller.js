const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const userModel = require("../models/user.model");
const historyModel = require("../models/history.model");
const { uploadFile } = require("../services/storage.service");

// music api controller/code/design/how it works
async function createMusic(req, res) {
  try {
    const { title } = req.body;

    const musicFile = req.files?.music?.[0];
    const coverFile = req.files?.coverImage?.[0];

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required.",
      });
    }

    if (!musicFile || !musicFile.buffer) {
      return res.status(400).json({
        message: "Music file is required.",
      });
    }

    // Upload audio
    const musicResult = await uploadFile(
      musicFile.buffer.toString("base64")
    );

    if (!musicResult?.url) {
      return res.status(502).json({
        message: "Music storage did not return a file URL.",
      });
    }

    // Upload cover image if provided
    let coverImage;

    if (coverFile) {
      if (coverFile.size > 5 * 1024 * 1024) {
        return res.status(413).json({
          message: "Cover image must be 5 MB or smaller.",
        });
      }

      const coverResult = await uploadFile(
        coverFile.buffer.toString("base64")
      );

      if (!coverResult?.url) {
        return res.status(502).json({
          message: "Cover image storage did not return a file URL.",
        });
      }

      coverImage = coverResult.url;
    }

    const music = await musicModel.create({
      uri: musicResult.url,
      title: title.trim(),
      artist: req.user.id,
      coverImage,
    });

    return res.status(201).json({
      message: "Music created successfully",
      music,
    });
  } catch (error) {
    console.error("Music upload failed:", error);

    return res.status(502).json({
      message: "Music upload failed.",
    });
  }
}
async function getArtistMusics(req, res) {
  const musics = await musicModel
    .find({ artist: req.user.id })
    .sort({ createdAt: -1 })
    .populate("artist", "username email profileImage");

  return res.status(200).json({
    message: "Artist music fetched successfully",
    musics,
  });
}

async function updateMusic(req, res) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required." });
  }

  const music = await musicModel.findOneAndUpdate(
    { _id: req.params.musicId, artist: req.user.id },
    { title: title.trim() },
    { new: true, runValidators: true },
  ).populate("artist", "username email profileImage");

  if (!music) {
    return res.status(404).json({ message: "Song not found for this artist." });
  }

  return res.status(200).json({ message: "Music updated successfully", music });
}

async function deleteMusic(req, res) {
  const music = await musicModel.findOneAndDelete({
    _id: req.params.musicId,
    artist: req.user.id,
  });

  if (!music) {
    return res.status(404).json({ message: "Song not found for this artist." });
  }

  await albumModel.updateMany(
    { artist: req.user.id },
    { $pull: { musics: music._id } },
  );

  return res.status(200).json({ message: "Music deleted successfully" });
}

// album api controller/code/design/how it works
async function createAlbum(req, res) {
  const { title, musicId } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Album title is required." });
  }

  if (!musicId) {
    return res.status(400).json({ message: "Please select a song for this album." });
  }

  const music = await musicModel.findOne({ _id: musicId, artist: req.user.id });

  if (!music) {
    return res.status(404).json({ message: "Selected song was not found for this artist." });
  }

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: [musicId],
  });

  const populatedAlbum = await albumModel
    .findById(album._id)
    .populate("artist", "username email profileImage")
    .populate({
      path: "musics",
      populate: { path: "artist", select: "username email profileImage" },
    });

  res.status(201).json({
    message: "Album created successfully",
    album: populatedAlbum,
  });
}

async function getArtistAlbums(req, res) {
  const albums = await albumModel
    .find({ artist: req.user.id })
    .sort({ _id: -1 })
    .populate("artist", "username email profileImage")
    .populate({
      path: "musics",
      populate: { path: "artist", select: "username email profileImage" },
    });

  return res.status(200).json({
    message: "Artist albums fetched successfully",
    albums,
  });
}

async function updateAlbum(req, res) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Album title is required." });
  }

  const album = await albumModel.findOneAndUpdate(
    { _id: req.params.albumId, artist: req.user.id },
    { title: title.trim() },
    { new: true, runValidators: true },
  )
    .populate("artist", "username email profileImage")
    .populate({
      path: "musics",
      populate: { path: "artist", select: "username email profileImage" },
    });

  if (!album) {
    return res.status(404).json({ message: "Album not found for this artist." });
  }

  return res.status(200).json({ message: "Album updated successfully", album });
}

async function deleteAlbum(req, res) {
  const album = await albumModel.findOneAndDelete({
    _id: req.params.albumId,
    artist: req.user.id,
  });

  if (!album) {
    return res.status(404).json({ message: "Album not found for this artist." });
  }

  return res.status(200).json({ message: "Album deleted successfully" });
}


async function populateHomeMusic(items) {
  return musicModel.populate(items, [
    { path: "artist", select: "username email profileImage" },
    { path: "comments.user", select: "username email profileImage" },
  ]);
}

async function getHomeSections(req) {
  const popularRadioQuery = musicModel
    .find()
    .sort({ playCount: -1, updatedAt: -1 })
    .limit(10)
    .lean();

  const chartQuery = musicModel.aggregate([
    {
      $addFields: {
        popularityScore: {
          $add: [
            { $ifNull: ["$playCount", 0] },
            { $multiply: [{ $size: { $ifNull: ["$likes", []] } }, 5] },
            { $multiply: [{ $size: { $ifNull: ["$comments", []] } }, 3] },
          ],
        },
      },
    },
    { $sort: { popularityScore: -1, createdAt: -1 } },
    { $limit: 10 },
  ]);

  const editorQuery = musicModel
    .find()
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  const freshQuery = musicModel
    .find()
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const hiddenGemsQuery = musicModel
    .find({ playCount: { $lte: 25 } })
    .sort({ createdAt: -1, updatedAt: -1 })
    .limit(20)
    .lean();

  const likedArtists = await musicModel.find({ likes: req.user._id }).distinct("artist");
  const recommendationQuery = likedArtists.length
    ? musicModel.find({ artist: { $in: likedArtists } }).sort({ createdAt: -1 }).limit(10).lean()
    : musicModel.find().sort({ playCount: -1, createdAt: -1 }).limit(10).lean();

  const historyQuery = historyModel.find({ user: req.user._id })
    .sort({ playedAt: -1 })
    .limit(20)
    .populate({ path: "music", populate: { path: "artist", select: "username email profileImage" } });

  const [popularRadio, charts, editorCandidates, freshCandidates, hiddenCandidates, recommendations, history] = await Promise.all([
    popularRadioQuery,
    chartQuery,
    editorQuery,
    freshQuery,
    hiddenGemsQuery,
    recommendationQuery,
    historyQuery,
  ]);

  const diverseEditors = [];
  const seenArtists = new Set();
  for (const item of editorCandidates) {
    const artistId = String(item.artist);
    if (!seenArtists.has(artistId) || diverseEditors.length >= 8) {
      diverseEditors.push(item);
      seenArtists.add(artistId);
    }
    if (diverseEditors.length === 8) break;
  }

    const diverseFreshDrops = [];
    const freshArtists = new Set();
    for (const item of freshCandidates) {
      const artistId = String(item.artist);
      if (!freshArtists.has(artistId) || diverseFreshDrops.length >= 8) {
        diverseFreshDrops.push(item);
        freshArtists.add(artistId);
      }
      if (diverseFreshDrops.length === 8) break;
    }

    const hiddenGems = hiddenCandidates
      .filter((item) => (item.likes?.length || 0) + (item.comments?.length || 0) > 0)
      .slice(0, 8);

    const spotlightArtistIds = [...new Set(editorCandidates.map((item) => String(item.artist)))].slice(0, 8);
    const spotlightArtists = await userModel.find({ _id: { $in: spotlightArtistIds } })
      .select("username profileImage role")
      .lean();
    const spotlightTracks = editorCandidates.reduce((groups, track) => {
      const artistId = String(track.artist);
      if (spotlightArtistIds.includes(artistId)) {
        groups[artistId] = groups[artistId] || [];
        if (groups[artistId].length < 2) groups[artistId].push(track);
      }
      return groups;
    }, {});

  const [populatedRadio, populatedCharts, populatedEditors, populatedRecommendations, populatedFresh, populatedGems] = await Promise.all([
    populateHomeMusic(popularRadio),
    populateHomeMusic(charts),
    populateHomeMusic(diverseEditors),
    populateHomeMusic(recommendations),
    populateHomeMusic(diverseFreshDrops),
    populateHomeMusic(hiddenGems),
  ]);

  return {
    popularRadio: populatedRadio,
    featuredCharts: populatedCharts,
    editorPicks: populatedEditors,
    recommended: populatedRecommendations,
    trendingNow: populatedRadio,
    orbeatCharts: populatedCharts,
    freshDrops: populatedFresh,
    hiddenGems: populatedGems,
    creatorSpotlight: spotlightArtists.map((artist) => ({
      artist,
      tracks: (spotlightTracks[String(artist._id)] || []).map((track) => ({
        ...track,
        artist,
      })),
    })),
    recentlyPlayed: history.map((entry) => entry.music).filter(Boolean),
  };
}

// api design for fetching all music
async function getAllMusics(req, res){

    const [musics, sections] = await Promise.all([
      musicModel
        .find()
        .skip(0)
        .limit(1000)
        .populate("artist", "username email profileImage")
        .populate("comments.user", "username email profileImage"),
      getHomeSections(req),
    ])
    
    res.status(200).json({
        message:"Musics fetched successfully",
        musics: musics,        
        sections,
    })
}

async function toggleLike(req, res){
  const musicId = req.params.musicId;
  const music = await musicModel.findById(musicId);

  if (!music) {
    return res.status(404).json({ message: "Song not found" });
  }

  const userId = req.user.id;
  const alreadyLiked = music.likes.some((id) => String(id) === String(userId));

  if (alreadyLiked) {
    music.likes = music.likes.filter((id) => String(id) !== String(userId));
  } else {
    music.likes.push(userId);
  }

  await music.save();
  const updatedMusic = await musicModel
    .findById(musicId)
    .populate("artist", "username email profileImage")
    .populate("comments.user", "username email");

  return res.status(200).json({
    message: alreadyLiked ? "Like removed" : "Song liked",
    music: updatedMusic,
  });
}

async function addComment(req, res){
  const musicId = req.params.musicId;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment is required." });
  }

  const music = await musicModel.findById(musicId);

  if (!music) {
    return res.status(404).json({ message: "Song not found" });
  }

  music.comments.push({
    user: req.user.id,
    text: text.trim(),
  });

  await music.save();
  const updatedMusic = await musicModel
    .findById(musicId)
    .populate("artist", "username email profileImage")
    .populate("comments.user", "username email");

  return res.status(201).json({
    message: "Comment added",
    music: updatedMusic,
  });
}

async function recordPlay(req, res){
  const musicId = req.params.musicId;
  const music = await musicModel
    .findByIdAndUpdate(musicId, { $inc: { playCount: 1 } }, { new: true })
    .populate("artist", "username email profileImage")
    .populate("comments.user", "username email");

  if (!music) {
    return res.status(404).json({ message: "Song not found" });
  }

  return res.status(200).json({
    message: "Play recorded",
    music,
  });
}


//  api design for fetching allAlbums
async function getAllAlbums(req, res){
  const albums = await albumModel
    .find()
    .populate("artist", "username email profileImage")
    .populate({
      path: "musics",
      populate: { path: "artist", select: "username email profileImage" },
    })

  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  })
}

//
async function getAlbumById(req, res){
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email profileImage")
    .populate({
      path: "musics",
      populate: { path: "artist", select: "username email profileImage" },
    })

  if (!album) {
    return res.status(404).json({ message: "Album not found" });
  }

  return res.status(200).json({
    message: "album fetched successfully",
    album: album,
  })
}

module.exports = {
  createMusic,
  getArtistMusics,
  updateMusic,
  deleteMusic,
  createAlbum,
  getArtistAlbums,
  updateAlbum,
  deleteAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
  toggleLike,
  addComment,
  recordPlay,
};
