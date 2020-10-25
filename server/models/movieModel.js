const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },

    plot: String,

    poster: String,

    title: String,

    rating: {
      type: Number,
      max: 5,
      min: 1,
      default: null,
    },

    // review: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Review",
    // },

    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// movieSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: "review",
//     select: "createdAt review",
//   });
//   next();
// });

// movieSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "movie",
//   localField: "_id",
// });

movieSchema.pre(/^find/, function(next) {
  this.start = Date.now();
  next();
});

movieSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms!`);
  next();
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
