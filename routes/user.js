const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
   .get(userController.signupRenderForm)
   .post(wrapAsync(userController.signup));

router.route("/login")
   .get(userController.loginRenderForm)
   .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;