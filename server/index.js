/* eslint-disable no-undef */
const rateLimit = require("express-rate-limit");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");
const appS = express();
// appS.use(require("connect-history-api-fallback")());

const gErrorHandler = require("./controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./utils/AppError");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

// appS.set('views', path.join(__dirname, 'views'));
// appS.set("view engine", "pug");
appS.use(express.static(path.join(__dirname, "src")));

appS.use(helmet());

if (process.env.NODE_ENV === "development") {
  appS.use(morgan("dev"));
}

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
  next();
});

// appS.get("/", (req, res) => {
//   res.status(200).render("App");
// });

appS.use("/api/v1/reviews", reviewRoutes);
appS.use("/api/v1/movies", movieRoutes);
appS.use("/api/v1/users", userRoutes);

appS.all("*", (req, res, next) => {
  next(new AppError(`Yo! Cant find - ${req.originalUrl}`, 404));
});
appS.use((req, res, next) => {
  console.log("MIDDLEWARE! IT WORKS");
  next();
});

appS.use(gErrorHandler);

module.exports = appS;
