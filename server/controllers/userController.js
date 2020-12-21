/* eslint-disable no-unused-vars */
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const factory = require("../controllers/handlerFactory");
const User = require("../models/userModel");

const speakeasy = require("speakeasy");

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
  const updatedUser = await User.findByIdAndUpdate(req.body.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const userIdDelete = req.body.id;

  const verified = speakeasy.totp.verify({
    secret: req.body.base32secret,
    encoding: "hex",
    token: req.body.codeQrcode,
  });

  if (!verified) {
    return next(new AppError(`INCORRECT DATA`, 401));
  }

  await User.findByIdAndUpdate(userIdDelete, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
