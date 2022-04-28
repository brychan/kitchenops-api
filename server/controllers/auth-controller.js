const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Account = require("../models/account-model");
const passport = require("../utilities/_passport");
const domains = require("../../domains");

// Missing validate inputs
// Missing Email confirmation
const create = async (req, res, next) => {
  try {
    req.body.admin = req.user && req.user.admin && req.body.admin === "true";
    req.body.active = req.user && req.user.admin && req.body.active === "true";
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAcc = {
      ...req.body,
      password: hash,
      active_hash: crypto.randomBytes(60).toString("hex"),
    };

    const query = await Account.query().insertAndFetch(newAcc).returning("*");

    delete query.password;
    delete query.active_hash;
    res.json(query);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) next(err);
    if (!user)
      next({
        status: 400,
        message: "Username or Password is incorrect.",
        endpoint: "/auth/login",
      });
    if (user) {
      req.logIn(user, function (err) {
        if (err) next(err);
        req.session.user = req.user;
        res.json({ status: "Success", user: user });
      });
    }
  })(req, res, next);
};

const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    res
      .clearCookie("connect.sid", {
        path: "/",
        domain: domains[process.env.NODE_ENV],
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
      })
      .status(200)
      .end();
  });
};

const activate = async (req, res, next) => {
  try {
    const query = await Account.query()
      .findOne("active_hash", req.params.key)
      .patch({ active: true, active_hash: null })
      .returning("*")
      .modify("basicInfo");
    res.json(query);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
  logout,
  activate,
};
