const express = require("express");
const router = express.Router();
const passport = require("passport");
const i18n = require("i18n");
const User = require("../models").User;
const bcrypt = require("bcryptjs");
const Sentry = require("@sentry/node");
const saltRounds = 10;

router.get("/", async (request, response) => {
  console.log("App started");
  console.log(i18n.getLocale());
  response.render("index", {
    signInEducator: i18n.__("Sign in as Educator"),
    signInStudent: i18n.__("Sign in as Student"),
    email: i18n.__("Email"),
    password: i18n.__("Password"),
  });
});

router.get("/login", async (request, response) => {
  response.render("index", {
    signInEducator: i18n.__("Sign in as Educator"),
    signInStudent: i18n.__("Sign in as Student"),
    email: i18n.__("Email"),
    password: i18n.__("Password"),
  });
});

router.get("/edusignup", async (request, response) => {
  response.render("auth/edusignup", {
    signUpAsEducator: i18n.__("Sign up as Educator"),
    nameLabel: i18n.__("Name"),
    emailLabel: i18n.__("Email"),
    passwordLabel: i18n.__("Password"),
    submitButton: i18n.__("Sign up"),
  });
});

router.get("/stusignup", async (request, response) => {
  response.render("auth/stusignup", {
    signUpAsStudent: i18n.__("Sign up as Student"),
    nameLabel: i18n.__("Name"),
    emailLabel: i18n.__("Email"),
    passwordLabel: i18n.__("Password"),
    submitButton: i18n.__("Sign up"),
  });
});

router.get("/signout", async (request, response, next) => {
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    response.redirect("/");
  });
});

//change lang
router.get("/set-language/:lang", (req, res) => {
  try {
    const lang = req.params.lang;
    res.cookie("i18n", lang); // Set the language in a cookie
    i18n.setLocale(lang); // Set the language for the current session
    console.log(i18n.getLocale());
    res.redirect("back"); // Redirect to the previous page
    // Manually throw an error to test Sentry integration
    //throw new Error("This is a test error to send to Sentry!");
  } catch (err) {
    // Capture the error in Sentry
    Sentry.captureException(err);
    console.error(err);
    res.status(500).send("An error occurred while setting the language.");
  }
});

//changepassword
router.get("/changepassedu", async (request, response) => {
  const userid = request.user.id;
  const user = await User.findByPk(userid);
  response.render("auth/changepass", { user, role: "e" });
});

router.get("/changepassstu", async (request, response) => {
  const userid = request.user.id;
  const user = await User.findByPk(userid);
  response.render("auth/changepass", { user, role: "s" });
});

router.post("/change-password/:role", async (req, res) => {
  console.log("changepassword");
  const userId = req.user.id; // Assuming you have authenticated the user and set up the user object
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  try {
    const user = await User.findByPk(userId);
    // Check if the old password provided matches the one stored in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      req.flash("error", "Incorrect Old Password");
      return res.redirect("/changepassedu");
    }

    // Check if the new password matches the confirmation password
    if (newPassword !== confirmPassword) {
      req.flash("error", "New and Confrimation passwords do not match ");
      return res.redirect("/changepassedu");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    if (req.params.role === "e") {
      res.redirect("/educator");
    }
    if (req.params.role === "s") {
      res.redirect("/student");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//login
router.post(
  "/edulog",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (request, response) => {
    const user = await User.findByPk(request.user.id);
    if (user.role === "e") {
      console.log("Educator login successful");
      response.redirect("/educator");
    } else {
      request.flash("error", "You are not an educator");
      return response.redirect("/");
    }
  },
);

router.post(
  "/stulog",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (request, response) => {
    const user = await User.findByPk(request.user.id);
    if (user.role === "s") {
      console.log("Student login successful");
      response.redirect("/student");
    } else {
      request.flash("error", "You are not a student");
      return response.redirect("/");
    }
  },
);

router.post("/educator", async (request, response) => {
  console.log("Creating an educator");
  const hashpwd = await bcrypt.hash(request.body.edupwd, saltRounds);
  try {
    const educator = await User.create({
      name: request.body.eduname,
      email: request.body.eduemail,
      password: hashpwd,
      role: "e",
    });
    //const eduId = educator.id;
    request.login(educator, (error) => {
      if (error) {
        console.log(error);
      }
      response.redirect("/educator");
    });
  } catch (error) {
    console.error(error);
    request.flash("error", "E-mail provided is already in use!");
    response.redirect("/edusignup");
  }
});

router.post("/student", async (request, response) => {
  console.log("Creating a student");
  const hashpwd = await bcrypt.hash(request.body.stupwd, saltRounds);
  try {
    const student = await User.create({
      name: request.body.stuname,
      email: request.body.stuemail,
      password: hashpwd,
      role: "s",
    });
    //const eduId = educator.id;
    request.login(student, (error) => {
      if (error) {
        console.log(error);
      }
      response.redirect("/student");
    });
  } catch (error) {
    console.error(error);
    request.flash("error", "E-mail provided is already in use!");
    response.redirect("/stusignup");
  }
});

module.exports = router;
