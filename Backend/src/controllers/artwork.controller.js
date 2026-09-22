const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadArtwork } = require("../services/storage.service");

async function uploadArtworkForOwner(req, res) {
  const { type, id } = req.params;
  const model = type === "music" ? musicModel : type === "album" ? albumModel : null;
  if (!model) return res.status(400).json({ message: "Invalid artwork resource" });
  if (!req.file?.buffer) return res.status(400).json({ message: "Artwork file is required" });

  const resource = await model.findOne({ _id: id, artist: req.user._id });
  if (!resource) return res.status(404).json({ message: "Resource not found for this artist" });

  try {
    const result = await uploadArtwork(req.file.buffer.toString("base64"));
    if (!result?.url) return res.status(502).json({ message: "Artwork storage did not return a file URL" });
    resource.coverImage = result.url;
    await resource.save();
    return res.status(200).json({ message: "Artwork updated", resource });
  } catch (error) {
    console.error("Artwork upload failed:", error);
    return res.status(502).json({ message: "Artwork upload failed" });
  }
}

module.exports = { uploadArtworkForOwner };
