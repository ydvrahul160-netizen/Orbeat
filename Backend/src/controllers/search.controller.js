const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const userModel = require("../models/user.model");

async function search(req, res) {
  const query = req.query.q?.trim();
  if (!query) return res.status(200).json({ songs: [], artists: [], albums: [] });

 const expression = new RegExp(
  query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  'i'
)
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 30);
  console.log("SEARCH QUERY:", query);
  const [songs, artists, albums] = await Promise.all([
    musicModel.find({ $or: [{ title: expression }] }).limit(limit)
      .populate("artist", "username profileImage"),
    userModel.find({ role: "artist", $or: [{ username: expression }, { bio: expression }] })
      .select("username profileImage bio").limit(limit),
    albumModel.find({ title: expression }).limit(limit)
      .populate("artist", "username profileImage"),
  ]);
  console.log("ARTISTS FOUND:", artists);

  return res.status(200).json({ songs, artists, albums });
}

module.exports = { search };
