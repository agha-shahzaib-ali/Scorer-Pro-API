const createError = require("http-errors");
const express = require("express");
// const path = require("path");
const cors = require("cors");

const logger = require("morgan");

const routes = require("./routes/index.js");
const { error } = require("console");

const app = express();
//Using cors
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Static usage not needed
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", routes);
routes(app);
require("./db");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;
