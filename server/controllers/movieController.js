/* eslint-disable no-undef */
const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movieModel");
const factory = require("../controllers/handlerFactory");

exports.createMovie = catchAsync(async (req, res, next) => {
  const arrUserID = req.body.arrUserID;
  const findMovie = await Movie.find({ id: req.body.id });
  let idUsers = [];
  let movieID;

  findMovie.forEach((e) => {
    movieID = e.id;
    e.arrUserID.forEach((el) => {
      if (el === arrUserID) idUsers.push(el);
    });
  });

  if (movieID === req.body.id && idUsers != arrUserID) {
    const doc = await Movie.findOneAndUpdate(
      { id: movieID },
      { id: movieID, $push: { arrUserID } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } else {
    const doc = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  }
});

exports.getMovie = factory.getOne(Movie, { path: "users" });
exports.getAllMovies = factory.getAll(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
