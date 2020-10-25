/* eslint-disable no-undef */
const factory = require("../controllers/handlerFactory");
const Movie = require("../models/movieModel");

exports.getMovie = factory.getOne(Movie);
exports.getAllMovies = factory.getAll(Movie);
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
