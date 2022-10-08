const express = require("express");
// const  Score  = require("./score.model");
const {
  addScoreDTO,
  deleteScoreDTO,
  updateScoreDTO,
  scoreDTOValidator,
} = require("../../validators/score.validator.js");
const router = express.Router();
const {
  getScores,
  addScore,
  updateScore,
  deleteScore,
} = require("./score.service.js");

// API Calls
// http://localhost:3000/score
// GET http://localhost:3000/score/{gameId}
// POST http://localhost:3000/score
// PUT http://localhost:3000/score/{gameId}
// DELETE http://localhost:3000/score/{gameId}

/* http://localhost:3000/score */
/* Get Scores by Game ID */
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to scores API",
  });
});
router.get("/:gameId", async (req, res, next) => {
  const { gameId } = req.params;
  console.log(req.params);
  const score = await getScores(gameId);
  res.json({
    data: score,
    length: score?.length,
  });
});

router.post("/", scoreDTOValidator(addScoreDTO), async (req, res, next) => {
  const { gameId, userId, score } = req.body;
  try {
    const savedScore = await addScore({ gameId, userId, score });
    res.json({
      data: savedScore,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:gameId",
  scoreDTOValidator(updateScoreDTO),
  async (req, res, next) => {
    const { userId, score } = req.body; // gives an object
    const { gameId } = req.params; // gives an object => Hence, Object destructuring can be used.
    // console.log([req.params, req.body]);
    try {
      const updatedScore = await updateScore({ gameId, userId, score });
      if (updatedScore === null) {
        return res.status(404).json({
          error: "Score Not Found",
        });
      }
      res.json({
        data: updatedScore,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:gameId",
  scoreDTOValidator(deleteScoreDTO),
  async (req, res, next) => {
    const { gameId } = req.params;
    const { userId } = req.body;
    console.log({ gameId, userId });
    try {
      const deletedScore = await deleteScore({ gameId, userId });
      if (deletedScore === null) {
        return res.status(404).json({
          error: "Score Not Found",
        });
      }
      res.json({
        data: deletedScore,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
