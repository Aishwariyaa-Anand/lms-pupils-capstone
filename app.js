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

const {
  Course,
  Chapter,
  Page,
  User,
  studentcourse,
  pagecomp,
} = require("./models");

const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is a student
  }
  res.status(403).send("Unauthorized"); // User is not a student
};

app.set("view engine", "ejs");

// Example function to calculate completion percentage
async function calculateCompletionPercentage(courseId, studentId) {
  const totalPages = await Page.count({
    include: {
      model: Chapter,
      where: { courseId },
    },
  });
  console.log("a", totalPages, courseId);

  const completedPages = await pagecomp.count({
    include: [
      {
        model: Page,
        include: {
          model: Chapter,
          where: { courseId },
        },
        required: true, // Ensures that only completed pages are considered
      },
    ],
    where: {
      studentId: studentId,
    },
  });
  console.log("b", completedPages);
  const completionPercentage = (completedPages / totalPages) * 100;
  return completionPercentage;
}

Sentry.setupExpressErrorHandler(app);

app.get("/set-language/:lang", (req, res) => {
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

app.get("/", async (request, response) => {
  console.log("App started");
  console.log(i18n.getLocale());
  response.render("index", {
    signInEducator: i18n.__("Sign in as Educator"),
    signInStudent: i18n.__("Sign in as Student"),
    email: i18n.__("Email"),
    password: i18n.__("Password"),
  });
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("/login", async (request, response) => {
  response.render("index", {
    signInEducator: i18n.__("Sign in as Educator"),
    signInStudent: i18n.__("Sign in as Student"),
    email: i18n.__("Email"),
    password: i18n.__("Password"),
  });
});

app.get("/edusignup", async (request, response) => {
  response.render("edusignup", {
    signUpAsEducator: i18n.__("Sign up as Educator"),
    nameLabel: i18n.__("Name"),
    emailLabel: i18n.__("Email"),
    passwordLabel: i18n.__("Password"),
    submitButton: i18n.__("Sign up"),
  });
});

app.get("/stusignup", async (request, response) => {
  response.render("stusignup", {
    signUpAsStudent: i18n.__("Sign up as Student"),
    nameLabel: i18n.__("Name"),
    emailLabel: i18n.__("Email"),
    passwordLabel: i18n.__("Password"),
    submitButton: i18n.__("Sign up"),
  });
});

app.get(
  "/educator",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const courses = await Course.findAll({
      where: {
        eduId: request.user.id,
      },
    });
    response.render("educator", {
      courses,
      myCourse: i18n.__("My Courses"),
      createCourse: i18n.__("Create course"),
      viewCourse: i18n.__("View Course"),
    });
  },
);

app.get(
  "/student",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const studentId = request.user.id;
    const enrolledCourses = await studentcourse.findAll({
      where: {
        studentId: studentId,
      },
      attributes: ["courseId"],
    });
    const enrolledCourseIds = enrolledCourses.map(
      (enrolledCourse) => enrolledCourse.courseId,
    );
    const courses = await Course.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: enrolledCourseIds,
        },
      },
    });
    response.render("student", {
      courses,
      availCourses: i18n.__("Available Courses"),
      myCourses: i18n.__("My courses"),
      viewCourse: i18n.__("View Course"),
      enroll: i18n.__("Enroll"),
    });
  },
);

app.get("/changepassedu", async (request, response) => {
  const userid = request.user.id;
  const user = await User.findByPk(userid);
  response.render("changepass", { user, role: "e" });
});

app.get("/changepassstu", async (request, response) => {
  const userid = request.user.id;
  const user = await User.findByPk(userid);
  response.render("changepass", { user, role: "s" });
});

app.get("/viewreports", isUser, async (request, response) => {
  try {
    const educatorId = request.user.id;
    const courses = await Course.findAll({
      where: {
        eduId: educatorId,
      },
      include: [
        {
          model: studentcourse,
          attributes: ["studentId"],
        },
      ],
    });
    console.log(educatorId);
    //total number of students enrolled
    const stu = await User.findAll({
      where: { role: "s" },
    });
    const totalStudents = stu.length;

    // Calculate the popularity score for each course based on the enrollment rate
    const courseReports = courses.map((course) => {
      const enrollmentRate = course.studentcourses.length / totalStudents;
      // Adjust the score as needed, e.g., multiplying by a factor to make the numbers more readable
      const popularityScore = enrollmentRate * 100;
      return {
        courseId: course.id,
        courseName: course.name,
        totalStudents: course.studentcourses.length,
        popularityScore: popularityScore.toFixed(2), // Round the score to 2 decimal places
      };
    });

    // Sort the courseReports by popularity score in descending order
    courseReports.sort((a, b) => b.popularityScore - a.popularityScore);

    response.render("viewreport", {
      courseReports,
      welcomeMessage: i18n.__("Welcome!"),
      changePassword: i18n.__("Change Password"),
      signOut: i18n.__("Signout"),
      totalStudents: i18n.__("Total Students Enrolled"),
      popularity: i18n.__("Popularity"),
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/signout", async (request, response, next) => {
  request.logout((error) => {
    if (error) {
      return next(error);
    }
    response.redirect("/");
  });
});

app.get(
  "/createcourse",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    response.render("createcourse", {
      createCourseTitle: i18n.__("Create new course"),
      courseNameLabel: i18n.__("What is the name of the course?"),
      submitButton: i18n.__("Submit"),
    });
  },
);

app.get(
  "/newpage/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const chapterId = request.params.chapterId;
    response.render("newpage", { chapterId });
  },
);

app.get(
  "/viewcourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const courseId = request.params.courseId;
    const chapters = await Chapter.findAll({
      where: { courseId: courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await User.findByPk(course.eduId);

    // Get the locale from i18n
    const userLocale = i18n.getLocale(); // Get the current locale

    // Create a date formatter for the user's locale
    const dateFormatter = new Intl.DateTimeFormat(userLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    });

    // Format the createdAt date
    const formattedDate = dateFormatter.format(new Date(course.createdAt));

    response.render("viewcourse", {
      coursename: course.name,
      courseid: course.id,
      date: formattedDate,
      chapters,
      eduname: edu.name,
      enrollButton: i18n.__("Enroll"),
      chapterTitle: i18n.__("Chapters"),
    });
  },
);

app.get(
  "/viewencourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const courseId = request.params.courseId;
    const chapters = await Chapter.findAll({
      where: { courseId: courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await User.findByPk(course.eduId);

    // Get the locale from i18n
    const userLocale = i18n.getLocale(); // Get the current locale
    console.log(userLocale);
    // Create a date formatter for the user's locale
    const dateFormatter = new Intl.DateTimeFormat(userLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    });
    console.log(dateFormatter);
    // Format the createdAt date
    const formattedDate = dateFormatter.format(new Date(course.createdAt));

    response.render("viewencourse", {
      coursename: course.name,
      courseid: course.id,
      date: formattedDate,
      chapters,
      eduname: edu.name,
      chapterTitle: i18n.__("Chapters"),
    });
  },
);

app.get(
  "/viewchap/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const chapterId = request.params.chapterId;
    const chaps = await Chapter.findByPk(chapterId);
    const pages = await Page.findAll({
      where: { chapterId: chapterId },
    });
    response.render("viewchap", {
      chapname: chaps.name,
      chapdesc: chaps.desc,
      pages,
    });
  },
);

app.get(
  "/mycourses",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    try {
      const studentId = request.user.id; // Assuming the student ID is stored in the user object
      const courses = await Course.findAll({
        include: {
          model: studentcourse,
          where: { studentId: studentId }, // Filter by studentId
        },
      });
      // to Calculate progress for each course
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          const courseId = course.id;
          // Replace with the actual studentId
          const completionPercentage = await calculateCompletionPercentage(
            courseId,
            studentId,
          );
          return {
            ...course.toJSON(),
            completionPercentage,
          };
        }),
      );

      response.render("mycourses", {
        courses: coursesWithProgress,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.get(
  "/viewpage/:pageId/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const pageId = request.params.pageId;
    const chapterId = request.params.chapterId;
    const page = await Page.findByPk(pageId);

    if (page && chapterId == page.chapterId) {
      const studentId = request.user.id;
      const pageCompletion = await pagecomp.findOne({
        where: {
          pageId: page.id,
          studentId: studentId,
        },
      });
      response.render("viewpage", {
        pagetitle: page.title,
        pagecont: page.content,
        pageid: page.id,
        chap: page.chapterId,
        completed: pageCompletion ? true : false,
      });
    } else {
      response.redirect("/student");
    }
  },
);

app.get(
  "/educourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    const courseId = request.params.courseId;
    const course = await Course.findByPk(courseId);
    const chapters = await Chapter.findAll({
      where: { courseId: courseId },
    });
    const pages = await Page.findAll();
    response.render("educourse", {
      coursename: course.name,
      chapters,
      pages,
    });
  },
);

app.get(
  "/createchapter/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const chapid = request.params.chapterId;
    const chapter = await Chapter.findByPk(chapid);
    const courseId = chapter.courseId;
    response.render("createchapter", { courseId });
  },
);

app.post(
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

app.post(
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

app.post("/educator", async (request, response) => {
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

app.post("/student", async (request, response) => {
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

app.post("/change-password/:role", async (req, res) => {
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

app.post(
  "/courses",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Creating a course");
    try {
      if (!request.body.coursename) {
        request.flash("error", "Course name cannot be empty");
        return response.redirect("/createcourse");
      }
      const createdCourse = await Course.create({
        name: request.body.coursename,
        eduId: request.user.id,
      });
      const courseId = createdCourse.id;
      response.render("createchapter", { courseId });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.post(
  "/courses/:courseId/chapters",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Creating a chapter for a course");
    try {
      const courseId = request.params.courseId;
      const createdChapter = await Chapter.create({
        name: request.body.chaptername,
        desc: request.body.desc,
        courseId,
      });
      const chapterid = createdChapter.id;
      const chapter = await Chapter.findByPk(chapterid);
      const pages = await Page.findAll({
        where: { chapterId: chapterid },
      });
      response.render("createpage", { chapter, pages });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.post(
  "/chapters/:chapterId/pages",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Creating a page for a chapter");
    try {
      const chapterId = request.params.chapterId;
      await Page.create({
        title: request.body.title,
        content: request.body.content,
        chapterId,
      });
      const chapter = await Chapter.findByPk(chapterId);
      const pages = await Page.findAll({
        where: { chapterId },
      });
      response.render("createpage", { chapter, pages });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.post(
  "/enroll/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    console.log("Enrolling in a course");
    try {
      const courseId = request.params.courseId;
      const course = await Course.findByPk(courseId);
      const edu = await User.findByPk(course.eduId);
      const chapters = await Chapter.findAll({
        where: { courseId: courseId },
      });
      await Course.isenrolled(course.id);
      const studentId = request.user.id;
      await studentcourse.create({
        studentId: studentId,
        courseId: courseId,
      });
      response.render("viewencourse", {
        courseId,
        coursename: course.name,
        eduname: edu.name,
        chapters,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.put(
  "/pages/:pageId/markAsCompleted",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    console.log("Marking a page as completed");
    const page = await Page.findByPk(request.params.pageId);
    try {
      const markstatus = await page.markcomplete(request.body.completed);
      await pagecomp.create({
        pageId: page.id,
        studentId: request.user.id,
      });
      console.log(request.body.completed);
      response.json(markstatus);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.delete(
  "/pages/:pageId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Deleting a page");
    try {
      const pageId = request.params.pageId;
      const page = await Page.findByPk(pageId);
      if (page) {
        // Delete the page from the database
        await page.destroy();
        response.status(200).json({ message: "Page deleted successfully" });
      } else {
        response.status(404).json({ error: "Page not found" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.delete(
  "/chapters/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Deleting a chapter");
    try {
      const chapterId = request.params.chapterId;
      const chapter = await Chapter.findByPk(chapterId);
      if (chapter) {
        // Delete the chapter from the database
        await Page.destroy({ where: { chapterId } });
        await chapter.destroy();
        response.status(200).json({ message: "Chapter deleted successfully" });
      } else {
        response.status(404).json({ error: "Chapter not found" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.delete(
  "/courses/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    console.log("Deleting a course");
    try {
      const courseId = request.params.courseId;
      const course = await Course.findByPk(courseId);
      if (course) {
        // Delete the course from the database
        const chapters = await Chapter.findAll({
          where: { courseId: courseId },
        });
        // Delete associated pages
        await Page.destroy({
          where: { chapterId: chapters.map((chapter) => chapter.id) },
        });

        //delete associated chapters
        await Chapter.destroy({ where: { courseId: courseId } });
        await studentcourse.destroy({ where: { courseId: courseId } });
        await course.destroy();
        return response.json({ success: true });
      } else {
        response.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

module.exports = app;
