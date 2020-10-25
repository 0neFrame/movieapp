const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must have!"],
      maxlength: [30, "Max. character - 30"],
      minlength: [2, "Min. character - 2"],
    },

    nickname: {
      type: String,
      unique: true,
      maxlength: [20, "Max. character - 20"],
      minlength: [1, "Min. character - 1"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Email must have!"],
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Password must have!"],
      minlength: 8,
      maxlength: 264,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Password must confirm!"],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: "NOT THE SAME",
      },
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: true,
      select: true,
    },

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


userSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
