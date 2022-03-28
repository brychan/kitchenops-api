const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const authHelpers = require("../utilities/_authHelpers");

router.post("/signup", (req, res, next) => {
  authController.create(req, res);
});

router.post("/login", (req, res, next) => {
  authController.login(req, res);
});

router.get("/logout", (req, res, next) => {
  authController.logout(req, res);
});

router.get("/user", authHelpers.loginRequired, (req, res, next) => {
  if (req.user) {
    delete req.user.password;
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.get("/activate/:key", (req, res, next) => {
  authController.activate(req, res);
});

module.exports = router;
