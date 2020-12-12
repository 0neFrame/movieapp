/* eslint-disable no-unused-vars */
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const socUser = require("../models/socUserModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("THIS ROUTE FOR UPDATE DATA", 400));
  }
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await socUser.findByIdAndUpdate(
    req.body.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await socUser.findByIdAndUpdate(req.body.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// exports.getUser = factory.getOne(User, { path: "reviews" });
exports.getSocUser = factory.getOne(socUser);
exports.getAllSocUsers = factory.getAll(socUser);
exports.createSocUser = factory.createOne(socUser);
exports.updateSocUser = factory.updateOne(socUser);
exports.deleteSocUser = factory.deleteOne(socUser);
