const mongoose = require("mongoose");
// const crypto = require("crypto");

const socUserSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    idFb: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      default: "user",
    },

    provider: String,

    tokenFb: String,

    name: String,

    // active: {
    //   type: Boolean,
    //   default: true,
    //   select: true,
    // },

    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    //   validate: [validator.isEmail, "Email must have!"],
    // },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

socUserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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

// socUserSchema.pre(/^find/, (next) => {
//   this.find({ active: { $ne: false } });
//   next();
// });

// socUserSchema.methods.createPasswordResetToken = () => {
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const socUser = mongoose.model("socUser", socUserSchema);

module.exports = socUser;
