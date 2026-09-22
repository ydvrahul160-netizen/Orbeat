const historyModel = require("../models/history.model");
const musicModel = require("../models/music.model");

async function createHistory(req, res) {
  const { musicId, listenedDuration = 0 } = req.body;
  if (!musicId) return res.status(400).json({ message: "Music ID is required" });

  const music = await musicModel.findById(musicId).select("_id");
  if (!music) return res.status(404).json({ message: "Song not found" });

  const recentDuplicate = await historyModel.findOne({
    user: req.user._id,
    music: music._id,
    playedAt: { $gte: new Date(Date.now() - 60 * 1000) },
  });
  if (recentDuplicate) return res.status(200).json({ history: recentDuplicate, duplicate: true });

  const history = await historyModel.create({
    user: req.user._id,
    music: musicId,
    listenedDuration: Math.max(0, Number(listenedDuration) || 0),
  });
  const populated = await history.populate({
    path: "music",
    populate: { path: "artist", select: "username profileImage" },
  });
  return res.status(201).json({ history: populated });
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
