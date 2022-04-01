const bcrypt = require("bcrypt");

function validateCreateForm(req, res, next) {
  let { name, password, email } = req.body;
  let message = null;
  if (!name || !password || !email) {
    message = "Name, e-mail or password fields are empty.";
  } else if (name.length < 2) {
    message = "Name must be longer than 6 characters";
  } else if (password.length < 6) {
    message = "Password must be longer than 6 characters";
  } else if (email.length < 6) {
    message = "Email must be longer than 6 characters";
  }
  if (message) 
    return next({
      status: 400,
      message,
    })
  else
    return next();
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next) {
  if (!req.user)
    return next({
      status: 403,
      message: "Unauthorized access."
    })
  if (!req.user.active)
    return next({
      status: 403,
      message: "Account is not active."
    })
  return next();
}

function adminRequired(req, res, next) {
  // Assumes loginRequired middleware is ran first.
  if (!req.user.admin)
    return next({
      status: 403,
      message: "Unauthorized access."
    })
  return next();
}

module.exports = {
  comparePass,
  loginRequired,
  adminRequired,
  validateCreateForm,
};
