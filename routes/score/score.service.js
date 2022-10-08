const { findOne } = require("./score.model");
const Score = require("./score.model");
const getScores = (gameId) => {
  return Score.find({ gameId });
};
const addScore = ({ gameId, userId, score }) => {
  const newScore = new Score({
    gameId,
    userId,
    score,
  });
  return newScore.save();
};

const updateScore = ({ gameId, userId, score }) => {
  const filter = { gameId, userId };
  const update = { score };
  const updatedScore = Score.findOneAndUpdate(filter, update, {
    new: true,
  });

  return updatedScore;
};
const deleteScore = ({ gameId, userId }) => {
  const filter = { gameId, userId };
  const deletedScore = Score.findOneAndDelete(filter);
  return deletedScore;
};
module.exports = {
  getScores,
  addScore,
  updateScore,
  deleteScore,
};
