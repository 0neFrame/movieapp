const passport = require("passport");
const express = require("express");
const routerS = express.Router();

const socUserController = require("../controllers/socUserController");
const authController = require("../controllers/authController");
// const socUser = require("../models/socUserModel");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

routerS.get("/facebook", passport.authenticate("facebook"));
routerS.get(
  "/return",
  passport.authenticate("facebook", {
    successRedirect: "/api/v1/auth/profile",
  })
);
routerS.get(
  "/profile",
  isLoggedIn,
  // authController.facebookLogin,
  (req, res) => {
    // req.body.user = req.user;
    // console.log("req.body.user", req.body.user);
    res.redirect(`welcome/${req.user._id}`);
  },
);
routerS.post("/profile", authController.facebookLogin);

routerS.use(authController.protect);

routerS.get("/me", socUserController.getMe, socUserController.getSocUser);
routerS.patch("/deleteMe", socUserController.deleteMe);

routerS.use(authController.restrictTo("admin"));

routerS
  .route("/")
  .get(socUserController.getAllSocUsers)
  .post(socUserController.createSocUser);

routerS
  .route("/:id")
  .get(socUserController.getSocUser)
  .patch(socUserController.updateSocUser)
  .delete(socUserController.deleteSocUser);

module.exports = routerS;
