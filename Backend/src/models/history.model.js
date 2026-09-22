const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  music: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "music",
    required: true,
  },
  playedAt: {
    type: Date,
    default: Date.now,
  },
  listenedDuration: {
    type: Number,
    min: 0,
    default: 0,
  },
}, { timestamps: true });

historySchema.index({ user: 1, playedAt: -1 });
historySchema.index({ user: 1, music: 1, playedAt: -1 });

module.exports = mongoose.model("history", historySchema);