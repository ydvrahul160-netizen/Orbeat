const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { timestamps: true });

followSchema.index({ follower: 1, artist: 1 }, { unique: true });
followSchema.index({ artist: 1, createdAt: -1 });

module.exports = mongoose.model("follow", followSchema);