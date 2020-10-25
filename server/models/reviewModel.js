const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    review: {
      type: String,
      default: "no comment",
    },

    poster: String,

    title: String,

    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "Movie",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "movie",
    select: "title",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
