/* eslint-disable no-unused-vars */
require("./instrument.js");

const Sentry = require("@sentry/node");
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const educatorRoutes = require("./routes/educator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//translations
const i18n = require("i18n");

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-super-secret-key-21728172615261562",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(flash());
app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});

// i18n configuration
i18n.configure({
  locales: ["en", "fr"], // Add your supported locales
  defaultLocale: "en",
  cookie: "lang",
  queryParameter: "lang", // Allows switching languages via query parameter
  directory: __dirname + "/locale", // Path to your translation files
  autoReload: true,
  updateFiles: false,
  syncFiles: true,
  parser: JSON,
});

// Middleware to set the locale based on the query parameter
app.use(i18n.init);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    (username, password, done) => {
      User.findOne({ where: { email: username } })
        .then(async (user) => {
          if (!user) {
            return done(null, false, { message: "Invalid email" });
          }

          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        })
        .catch((error) => {
          return done(error);
        });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID and role
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

const { User } = require("./models");

app.set("view engine", "ejs");

Sentry.setupExpressErrorHandler(app);

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(authRoutes);
app.use(studentRoutes);
app.use(educatorRoutes);

module.exports = app;
