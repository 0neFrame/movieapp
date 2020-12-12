// const appS = express();
// const tls = require("tls");

const passport = require("passport");
const express = require("express");
const routerS = express.Router();

const socUserController = require("../controllers/socUserController");
const authController = require("../controllers/authController");
const socUser = require("../models/socUserModel");

passport.serializeUser((user, cb) => {
  console.log("serializeUser:", user);
  console.log("serializeUserID:", user.id);
  return cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  socUser.findById(id, (err, user) => {
    console.log("deserializeId:", id);
    console.log("deserializeErr:", err);
    console.log("deserializeUser:", user);
    cb(err, user);
  });
});

routerS.route("/facebook").get(passport.authenticate("facebook"));

routerS.route("/return").get(
  passport.authenticate("facebook", {
    successRedirect: "/api/v1/auth/profile",
    // failureRedirect: "/api/v1/auth/failed",
  }),
  (err, user, info) => {
    console.log("err -", err);
    console.log("user -", user);
    console.log("info -", info);
  }
);
routerS.route("/profile").get(
  /*require("connect-ensure-login").ensureLoggedIn(),*/ (req, res) => {
    console.log("success /profile:", this.user);
    console.log("body:", req.body);

    res.status(200).json({
      status: "success",
      data: { user: req.user },
    });
    // res.render("profile", { user: req.user });
  }
);
// routerS.route("/failed").get((req, res) => {
//   // console.log("success /:", req.user);

//   res.status(400).json({
//     msg: "login failed",
//   });
// });

routerS.use(authController.protect);

routerS.get("/me", socUserController.getMe, socUserController.getSocUser);
routerS.patch("/deleteMe", socUserController.deleteMe);

// routerS.use(authController.restrictTo("admin"));

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
