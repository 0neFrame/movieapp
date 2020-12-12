/* eslint-disable no-unused-vars */
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        docs,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let quary = Model.findById(req.params.id);
    if (popOptions) quary.populate(popOptions);
    const doc = await quary;

    if (!doc) {
      return next(new AppError("No document with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.movieId && req.params.userId)
      filter = {
        movie: req.params.movieId,
        user: req.params.userId,
      };

    await Model.find(filter)
      .sort("title")
      .exec((err, docs) => {
        // console.log("err", err); 
        // console.log("docs", docs);

        res.status(200).json({
          status: "success",
          results: docs.length,
          docs,
        });
      });

    // const doc = await Model.find(filter)

    // res.status(200).json({
    //   status: "success",
    //   results: docs.length,
    //   docs,
    // });
  });
