/* eslint-disable no-undef */
const rateLimit = require("express-rate-limit");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const appS = express();

const gErrorHandler = require("./controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const fbRoutes = require("./routes/fbRoutes");
const AppError = require("./utils/AppError");
const getMovie = require("./axios/getMovie");
const delMovie = require("./axios/delMovie");
const getRandomMovie = require("./axios/getRandomMovie");

appS.use(helmet());

if (process.env.NODE_ENV === "development") {
  appS.use(morgan("dev"));
}

appS.use(cors());

const limiter = rateLimit({
  max: 100,
  windowMs: 360000,
  message: "TOO MANY REQUEST, CHILL OUT",
});
appS.use("/api", limiter);
appS.use(express.json({ limit: "10kb" }));
appS.use(mongoSanitize());
appS.use(xss());

appS.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(
    req.requestTime,
    /*req.user.role , req.body.jwt, req.localStorage*/
  );
  next();
});

appS.use("/", fbRoutes);
appS.use("/api/v1/users", userRoutes);
appS.use("/api/v1/movies", movieRoutes);
appS.use("/api/v1/reviews", reviewRoutes);
appS.use("/search", getMovie, getRandomMovie, delMovie);

appS.all("*", (req, res, next) => {
  next(new AppError(`Yo! Cant find - ${req.originalUrl}`, 404));
});

appS.use((req, res, next) => {
  console.log("MIDDLEWARE! IT WORKS");
  next();
});

appS.use(gErrorHandler);

module.exports = appS;
