/* eslint-disable no-undef */
const rateLimit = require("express-rate-limit");
const serveStatic = require("serve-static");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");
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

// FACEBOOK STAGE 1 - START
require("dotenv").config();
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const cookieSession = require("cookie-session");
const socUser = require("./models/socUserModel");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// FACEBOOK STAGE 1 - END

// MAIN STAGE
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
  console.log(req.requestTime);
  next();
});

// appS.use(express.static(__dirname + "../dist"));
// appS.get(/.*/, (req, res) => {
//   res.sendFile(__dirname + "../dist/index.html");
// });
appS.use("/", serveStatic(path.join(__dirname, "../dist")));

// FACEBOOK STAGE 2 - START
appS.use(bodyParser.json());
appS.use(bodyParser.urlencoded({ extended: false }));
// appS.use(
//   session({
//     store: new MongoStore({ url: process.env.MONGO_DATABASE_LOCAL }),
//   })
// );
appS.use(
  cookieSession({
    name: "bla-bla-land",
    keys: ["key1", "key2"],
  })
);

passport.serializeUser((user, done) => {
  console.log("serializeUser:", user);
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log("deserializeUser:", user);
  return done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/v1/auth/return",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("refreshToken", refreshToken);
      // console.log("accessToken", accessToken);
      // console.log("profile", profile);

      process.nextTick(() => {
        socUser.findOne({ idFb: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          } else {
            let newUser = new socUser();
            newUser.idFb = profile.id;
            newUser.tokenFb = accessToken;
            newUser.name = profile.displayName;
            newUser.provider = profile.provider;
            newUser.save((err) => {
              console.log("create NEW user:", newUser);
              if (err) console.log(err);
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

appS.use(passport.initialize());
appS.use(passport.session());
appS.use("/api/v1/auth", fbRoutes);
// FACEBOOK STAGE 2 - END

appS.use("/api/v1/users", userRoutes);
appS.use("/api/v1/movies", movieRoutes);
appS.use("/api/v1/reviews", reviewRoutes);
appS.use("/api/v1/search", getMovie, getRandomMovie, delMovie);

appS.all("*", (req, res, next) => {
  next(new AppError(`Yo! Cant find - ${req.originalUrl}`, 404));
});

appS.use((req, res, next) => {
  console.log("MIDDLEWARE! IT WORKS");
  next();
});

appS.use(gErrorHandler);

module.exports = appS;
