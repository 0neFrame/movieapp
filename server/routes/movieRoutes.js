const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");
const express = require("express");
const routerS = express.Router();

routerS.use(authController.protect);

routerS
  .route("/")
  .get(movieController.getAllMovies)
  .post(authController.restrictTo("user"), movieController.createMovie);

routerS
  .route("/:id")
  .get(movieController.getMovie)
  .patch(authController.restrictTo("user"), movieController.updateMovie)
  .delete(
    authController.restrictTo("user", "admin"),
    movieController.deleteMovie
  );

module.exports = routerS;
