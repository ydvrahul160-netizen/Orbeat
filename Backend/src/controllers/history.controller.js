const historyModel = require("../models/history.model");
const musicModel = require("../models/music.model");

async function createHistory(req, res) {
  const { musicId, listenedDuration = 0 } = req.body;

  if (!musicId) {
    return res.status(400).json({ message: "Music ID is required" });
  }

  const music = await musicModel.findById(musicId).select("_id");

  if (!music) {
    return res.status(404).json({ message: "Song not found" });
  }

  const history = await historyModel.findOneAndUpdate(
    {
      user: req.user._id,
      music: music._id,
    },
    {
      $set: {
        playedAt: new Date(),
        listenedDuration: Math.max(
          0,
          Number(listenedDuration) || 0
        ),
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const populated = await history.populate({
    path: "music",
    populate: {
      path: "artist",
      select: "username profileImage",
    },
  });

  return res.status(200).json({
    history: populated,
    updated: true,
  });
}

async function getHistory(req, res) {
  const history = await historyModel.find({ user: req.user._id })
    .sort({ playedAt: -1 })
    .limit(100)
    .populate({ path: "music", populate: { path: "artist", select: "username profileImage" } });
  return res.status(200).json({ history });
}

async function clearHistory(req, res) {
  await historyModel.deleteMany({ user: req.user._id });
  return res.status(200).json({ message: "Listening history cleared" });
}

module.exports = { createHistory, getHistory, clearHistory };
