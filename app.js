require("dotenv").config();
const express = require("express");

//Declare Middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const passport = require("passport");

const app = express(); // Initialize Server

/* START KNEX & OBJECTION - ORM & SQL Builder */
const { Model } = require("objection");
const knex = require("./db/connection");
const domains = require("./domains.js")[process.env.NODE_ENV];
Model.knex(knex);
/* END KNEX & OBJECTION  */

/* START CORS MIDDLEWARE - Allow CORS for development */
const whitelist = ["http://localhost:3000", "http://localhost:3000/", "*"];
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: function (origin, callback) {
    callback(null, true);
    /*if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS, origin:')
    }*/
  },
  credentials: true,
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};
app.use(cors(corsOptions));
/* END CORS */

/* START CONNECT-SESSION-KNEX MIDDLEWARE - Handles User sessions between DB and Server. */
const store = new KnexSessionStore({
  knex: knex,
});
app.enable("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      domain: domains[process.env.NODE_ENV],
      maxAge: 100 * 1000 * 360 * 10,
      sameSite: "Lax",
      httpOnly: true,
      secure: process.env.NODE_ENV == "production" ? true : false,
    },
  })
);
/* END CONNECT-SESSION-KNEX */

/* START BODY-PARSER MIDDLEWARE - Parse requests into JSON */
app.use(
  bodyParser.urlencoded({
    limit: "2mb",
    extended: true,
  })
);
app.use(bodyParser.json());
/* END BODY-PARSER */

/* START PASSPORT MIDDLEWARE - Handles Authentication & Authorization */
app.use(passport.initialize());
app.use(passport.session());
/* END PASSPORT */

// Routes
const authRoutes = require("./server/routes/auth-routes");

app.use("/auth", authRoutes);

function logErrors(err, req, res, next) {
  console.error("logErrors MW", err)
  next(err)
}
const { errorHandler } = require("./server/utilities/_errorHandler")
app.use(logErrors)
app.use(errorHandler)

// App Server Connection
app.listen(process.env.PORT || 9001, () => {
  console.log(
    `app is running on port ${process.env.PORT || 9001} - Env: ${
      process.env.NODE_ENV || "development"
    }`
  );
});
