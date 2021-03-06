const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const express = require("express");
const routerS = express.Router({ mergeParams: true });

routerS.route("/").get(reviewController.getAllReviews);
routerS.use(authController.protect);
routerS
  .route("/")
  .post(
    authController.restrictTo("user", "admin"),
    reviewController.setIds,
    reviewController.createReview
  );
routerS
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = routerS;
