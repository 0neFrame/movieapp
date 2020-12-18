/* eslint-disable no-unused-vars */
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const passport = require("passport");

const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const socUser = require("../models/socUserModel");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 360000
    ),
    httpOnly: true,
    secure: true
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });

  createSendToken(newUser, 201, res);
});

exports.tfauth = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("PROVIDE EMAIL/PASSWORD", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`INCORRECT EMAIL/PASSWORD`, 401));
  }

  const secret = speakeasy.generateSecret({ length: 16 });
  user.two_factor_temp_secret = secret.hex;
  const base32secret = user.two_factor_temp_secret;
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    // console.log(data_url);
    res.status(200).json({
      status: "success",
      data_url,
      base32secret
    });
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("PROVIDE EMAIL/PASSWORD", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`INCORRECT EMAIL/PASSWORD`, 401));
  }

  const verified = speakeasy.totp.verify({
    secret: req.body.base32secret,
    encoding: "hex",
    token: req.body.codeQrcode
  });
  if (!verified) {
    return next(new AppError(`INCORRECT DATA`, 401));
  }

  createSendToken(user, 200, res);
});

exports.facebookLogin = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const user = await socUser.findById(userID);
  // console.log("userFb", user);

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return next(new AppError("YOU ARE NOT LOGGED IN", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser =
    (await User.findById(decoded.id)) || (await socUser.findById(decoded.id));

  if (!currentUser) {
    return next(new AppError("TOKEN DOES NO LONGER EXIST", 401));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("USER CHANGED PASSWORD", 401));
  }

  // console.log("protect user", currentUser);
  req.user = currentUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const decoded = await promisify(jwt.verify)(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // console.log("decoded user", decoded);

    const currentUser =
      (await User.findById(decoded.id)) || (await socUser.findById(decoded.id));

    if (!currentUser) {
      return next();
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    console.log("isLoggedIn user", currentUser);
    req.user = currentUser;
    return next();
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // console.log("restrictTo user", req.user);
    if (!roles.includes(req.user.role)) {
      return next(new AppError("YOU HAVEN'T PERMISSION", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("NO USER WITH EMAIL", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  const resetURL = `${req.protocol}://localhost:3334/resetPassword/${resetToken}`;

  const message = `You forgot password? Press URL => ${resetURL}\nIf you didn't forgot your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message
    });

    res.status(200).json({
      status: "success",
      message: "TOKEN SENT TO EMAIL"
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("ERROR. TRY AGAIN LATER!", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError("BAD TOKEN", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("CURRENT PASSWORD IS WRONG", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
