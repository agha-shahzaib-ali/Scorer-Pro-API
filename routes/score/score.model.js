// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema(
  {
    gameId: String, // String is shorthand for {type: String}
    userId: String,
    score: Number,
  },
  {
    autoIndex: true,
  }
);
scoreSchema.index({ userId: 1, gameId: 1 }, { unique: true });
//E11000 duplicate key error collection

const Score = mongoose.model("Score", scoreSchema);
// Score.ensureIndexes();
mongoose.set("debug", true);
module.exports = Score;
