const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Account = require("../models/account-model");
const authHelpers = require("./_authHelpers");

const options = {
  usernameField: "email",
};

passport.use(
  new LocalStrategy(options, (email, password, done) => {
    Account.query()
      .findOne({ email })
      .then((account) => {
        if (!account) {
          return done(null, false);
        }
        if (!account) return done(null, false);
        if (!authHelpers.comparePass(password, account.password))
          return done(null, false);
        return done(null, account);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Account.query()
    .findById(id)
    .then((account) => {
      done(null, account);
    })
    .catch((err) => {
      return done(err);
    });
});

module.exports = passport;
