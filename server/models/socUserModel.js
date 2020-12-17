const mongoose = require("mongoose");
// const crypto = require("crypto");

const socUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },

    token: String,

    provider: String,

    name: String,

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    role: {
      type: String,
      default: "user",
    },

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

    // passwordChangedAt: Date,

    // passwordResetToken: String,

    // passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

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
