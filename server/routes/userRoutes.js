const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewRoutes = require("../routes/reviewRoutes");
const express = require("express");
const routerS = express.Router();
// const routerS = express.Router({ mergeParams: true });

routerS.use("/:userId/movies/:movieId/reviews", reviewRoutes);

routerS.post("/singup", authController.singup);
routerS.post("/login", authController.login);
routerS.post("/forgotPassword", authController.forgotPassword);
routerS.patch("/resetPassword/:token", authController.resetPassword);

// routerS.use(authController.protect);

routerS.get("/me", userController.getMe, userController.getUser);
routerS.patch("/updateMyPassword", authController.updatePassword);
routerS.patch("/updateMe", userController.updateMe);
routerS.patch("/deleteMe", userController.deleteMe);

routerS.use(authController.restrictTo("admin"));

routerS
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

routerS
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = routerS;
