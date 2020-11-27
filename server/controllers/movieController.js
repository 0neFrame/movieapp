/* eslint-disable no-undef */
const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movieModel");
const factory = require("../controllers/handlerFactory");

exports.createMovie = catchAsync(async (req, res, next) => {
  const userUnqID = req.body.userUnqID;
  const findMovie = await Movie.find({ id: req.body.id });
  let idUsers = [];
  let movieID;

  findMovie.forEach((e) => {
    movieID = e.id;
    e.userUnqID.forEach((el) => {
      if (el === userUnqID) idUsers.push(el);
    });
  });

  if (movieID === req.body.id && idUsers != userUnqID) {
    const doc = await Movie.findOneAndUpdate(
      { id: movieID },
      { id: movieID, $push: { userUnqID } },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } else {
    const docs = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        docs,
      },
    });
  }
});

exports.getMovie = factory.getOne(Movie, { path: "users" });
exports.getAllMovies = factory.getAll(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);
