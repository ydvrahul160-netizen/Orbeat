const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");

function validObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

async function followArtist(req, res) {
  const artistId = req.params.userId;
  if (!validObjectId(artistId)) return res.status(400).json({ message: "Invalid user ID" });
  if (String(req.user._id) === String(artistId)) return res.status(400).json({ message: "You cannot follow yourself" });

  const artist = await userModel.findOne({ _id: artistId, role: "artist" }).select("_id");
  if (!artist) return res.status(404).json({ message: "Artist not found" });

  try {
    await followModel.create({ follower: req.user._id, artist: artist._id });
    return res.status(201).json({ message: "Artist followed", following: true });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Artist already followed" });
    console.error("Follow failed:", error);
    return res.status(500).json({ message: "Unable to follow artist" });
  }
}

async function unfollowArtist(req, res) {
  const artistId = req.params.userId;
  if (!validObjectId(artistId)) return res.status(400).json({ message: "Invalid user ID" });

  await followModel.deleteOne({ follower: req.user._id, artist: artistId });
  return res.status(200).json({ message: "Artist unfollowed", following: false });
}

async function getFollowStatus(req, res) {
  const artistId = req.params.userId;
  if (!validObjectId(artistId)) return res.status(400).json({ message: "Invalid user ID" });

  const [following, followers] = await Promise.all([
    followModel.exists({ follower: req.user._id, artist: artistId }),
    followModel.countDocuments({ artist: artistId }),
  ]);

  return res.status(200).json({ following: Boolean(following), followers });
}

module.exports = { followArtist, unfollowArtist, getFollowStatus };