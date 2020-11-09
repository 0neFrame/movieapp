/* eslint-disable no-undef */
const Movie = require("../models/movieModel");
const factory = require("../controllers/handlerFactory");

exports.setIds = (req, res, next) => {
  if (!req.body.movie) req.body.movie = req.params.movieId;
  if (!req.body.user) req.body.user = req.params.userId;
  next();
};

exports.getMovie = factory.getOne(Movie, { path: "users" });
exports.getAllMovies = factory.getAll(Movie);
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
