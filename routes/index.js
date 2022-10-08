const scoreRouter = require("./score/score.controller.js");

module.exports = (app) => {
  app.use("/score", scoreRouter);
};

// mongodb+srv://agha-shahzaib-ali:<password>@cluster0.rhra5x8.mongodb.net/?retryWrites=true&w=majority
// euK2zXBuSvoqDJMr
