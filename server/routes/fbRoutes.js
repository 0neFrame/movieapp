const passport = require("passport");
const express = require("express");
// const appS = express();
const routerS = express.Router();

routerS.get("/auth/facebook", passport.authenticate("facebook"));

routerS.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = routerS;
