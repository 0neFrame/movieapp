const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");
const express = require("express");
const routerS = express.Router();
// const routerS = express.Router({ mergeParams: true });

routerS.route("/").get(movieController.getAllMovies);

routerS.route("/:id").get(movieController.getMovie);

routerS.use(authController.isLoggedIn);

routerS
  .route("/")
  // .get(movieController.getAllMovies)
  .post(
    authController.restrictTo("user", "admin"),
    movieController.createMovie
  );

routerS
  .route("/:id")
  // .get(movieController.getMovie)
  .patch(authController.restrictTo("user"), movieController.updateMovie)
  .delete(authController.restrictTo("user"), movieController.deleteMovie);

module.exports = routerS;
