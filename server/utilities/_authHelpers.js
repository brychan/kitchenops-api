const bcrypt = require("bcrypt");

function validateCreateForm(req) {
  let { name, password, email } = req.body;
  let error = null;
  if (!name || !password || !email) {
    error = "Name, e-mail or password fields are empty.";
  } else if (name.length < 6) {
    error = "Name must be longer than 6 characters";
  } else if (password.length < 6) {
    error = "Password must be longer than 6 characters";
  }
  return error;
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(400).send({ status: "Not logged in." }).end();
  }
  if (!req.user.active) {
    return res
      .status(400)
      .send({ status: "Account is not active. Check e-mail." });
  }
  return next();
}

function adminRequired(req, res, next) {
  // Assumes loginRequired middleware is ran first.
  if (!req.user.admin) {
    return res.status(400).send({ status: "Unauthorized access." });
  }
  return next();
}

function loginRedirect(req, res, next) {
  if (req.user) return res.send({ status: "You are already logged in." });
  return next();
}

module.exports = {
  comparePass,
  loginRequired,
  adminRequired,
  loginRedirect,
  validateCreateForm,
};
