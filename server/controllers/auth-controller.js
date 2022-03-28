const knex = require("../../db/connection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { errorHandler } = require("../utilities/_errorHandler");
const Account = require("../models/account-model");
const passport = require("../utilities/_passport");
const domains = require("../../domains");

// Missing validate inputs
// Missing Email confirmation
const create = async (req, res) => {
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

    const query = await Account.query().insert(newAcc);
    res.json(query);
  } catch (err) {
    errorHandler(err, res);
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      handleResponse(
        res,
        500,
        "There was an error logging in, try again later."
      );
    }
    if (!user) {
      handleResponse(res, 400, "Username or Password is incorrect.");
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          handleResponse(
            res,
            500,
            "There was an error logging in, try again later."
          );
        }

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
      .patch({ active: true, active_hash: null });
    res.json(query);
  } catch (err) {
    errorHandler(err, res);
  }
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json({
    status: statusMsg,
  });
}

module.exports = {
  create,
  login,
  logout,
  activate,
};
