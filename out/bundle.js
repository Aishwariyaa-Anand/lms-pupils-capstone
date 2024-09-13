/******/
// eslint-disable-next-line no-empty
!(function () {
  try {
    var e =
        "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
      n = new Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = "1b38228e-7a5e-5547-b2d2-f9761fab95a0"));
  } catch (e) {}
})();
(() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./models sync recursive":
      /*!**********************!*\
  !*** ./models/ sync ***!
  \**********************/
      /***/ (module) => {
        function webpackEmptyContext(req) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = "MODULE_NOT_FOUND";
          throw e;
        }
        webpackEmptyContext.keys = () => [];
        webpackEmptyContext.resolve = webpackEmptyContext;
        webpackEmptyContext.id = "./models sync recursive";
        module.exports = webpackEmptyContext;

        /***/
      },

    /***/ "./app.js":
      /*!****************!*\
  !*** ./app.js ***!
  \****************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        /* eslint-disable no-unused-vars */
        __webpack_require__(/*! ./instrument.js */ "./instrument.js");
        const Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        const express = __webpack_require__(/*! express */ "express");
        const app = express();
        const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        const bodyParser = __webpack_require__(
          /*! body-parser */ "body-parser",
        );
        const path = __webpack_require__(/*! path */ "path");
        app.set("views", path.join(__dirname, "views"));
        const passport = __webpack_require__(/*! passport */ "passport");
        const connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        const session = __webpack_require__(
          /*! express-session */ "express-session",
        );
        const flash = __webpack_require__(/*! connect-flash */ "connect-flash");
        const LocalStrategy = __webpack_require__(
          /*! passport-local */ "passport-local",
        );
        const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
        const saltRounds = 10;
        const authRoutes = __webpack_require__(
          /*! ./routes/auth */ "./routes/auth.js",
        );
        const studentRoutes = __webpack_require__(
          /*! ./routes/student */ "./routes/student.js",
        );
        const educatorRoutes = __webpack_require__(
          /*! ./routes/educator */ "./routes/educator.js",
        );
        app.use(bodyParser.json());
        app.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );

        //translations
        const i18n = __webpack_require__(/*! i18n */ "i18n");

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
          locales: ["en", "fr"],
          // Add your supported locales
          defaultLocale: "en",
          cookie: "lang",
          queryParameter: "lang",
          // Allows switching languages via query parameter
          directory: __dirname + "/locale",
          // Path to your translation files
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
              User.findOne({
                where: {
                  email: username,
                },
              })
                .then(async (user) => {
                  if (!user) {
                    return done(null, false, {
                      message: "Invalid email",
                    });
                  }
                  const result = await bcrypt.compare(password, user.password);
                  if (result) {
                    return done(null, user);
                  } else {
                    return done(null, false, {
                      message: "Invalid password",
                    });
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
        const { User } = __webpack_require__(
          /*! ./models */ "./models/index.js",
        );
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

        /***/
      },

    /***/ "./instrument.js":
      /*!***********************!*\
  !*** ./instrument.js ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        /* eslint-enable no-unused-vars */
        // Import with `import * as Sentry from "@sentry/node"` if you are using ESM
        const Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        const { nodeProfilingIntegration } = __webpack_require__(
          /*! @sentry/profiling-node */ "@sentry/profiling-node",
        );
        Sentry.init({
          dsn: "https://32502b7076f34328e34578dd4eb59d04@o4507844351229952.ingest.de.sentry.io/4507844384325712",
          integrations: [nodeProfilingIntegration()],
          // Tracing
          tracesSampleRate: 1.0,
          //  Capture 100% of the transactions

          // Set sampling rate for profiling - this is relative to tracesSampleRate
          profilesSampleRate: 1.0,
          debug: true,
        });

        /***/
      },

    /***/ "./models/index.js":
      /*!*************************!*\
  !*** ./models/index.js ***!
  \*************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";

        const fs = __webpack_require__(/*! fs */ "fs");
        const path = __webpack_require__(/*! path */ "path");
        const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        const process = __webpack_require__(/*! process */ "process");
        const basename = path.basename(__filename);
        const env = process.env.NODE_ENV || "development";
        const config = __webpack_require__(
          /*! ./config/config.json */ "./config/config.json",
        )[env];
        const db = {};
        let sequelize;
        if (config.use_env_variable) {
          sequelize = new Sequelize(
            process.env[config.use_env_variable],
            config,
          );
        } else {
          sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config,
          );
        }
        fs.readdirSync(__dirname)
          .filter((file) => {
            return (
              file.indexOf(".") !== 0 &&
              file !== basename &&
              file.slice(-3) === ".js" &&
              file.indexOf(".test.js") === -1
            );
          })
          .forEach((file) => {
            const model = __webpack_require__("./models sync recursive")(
              path.join(__dirname, file),
            )(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
          });
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db);
          }
        });
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        module.exports = db;

        /***/
      },

    /***/ "./routes/auth.js":
      /*!************************!*\
  !*** ./routes/auth.js ***!
  \************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        const express = __webpack_require__(/*! express */ "express");
        const router = express.Router();
        const passport = __webpack_require__(/*! passport */ "passport");
        const i18n = __webpack_require__(/*! i18n */ "i18n");
        const User = __webpack_require__(
          /*! ../models */ "./models/index.js",
        ).User;
        const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
        const Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
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
            res
              .status(500)
              .send("An error occurred while setting the language.");
          }
        });

        //changepassword
        router.get("/changepassedu", async (request, response) => {
          const userid = request.user.id;
          const user = await User.findByPk(userid);
          response.render("auth/changepass", {
            user,
            role: "e",
          });
        });
        router.get("/changepassstu", async (request, response) => {
          const userid = request.user.id;
          const user = await User.findByPk(userid);
          response.render("auth/changepass", {
            user,
            role: "s",
          });
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
              req.flash(
                "error",
                "New and Confrimation passwords do not match ",
              );
              return res.redirect("/changepassedu");
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            user.password = hashedPassword;
            await user.save();
            console.log("x");
            if (user.role === "e") {
              res.redirect("/");
            }
            if (user.role === "s") {
              res.redirect("/");
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

        /***/
      },

    /***/ "./routes/educator.js":
      /*!****************************!*\
  !*** ./routes/educator.js ***!
  \****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        const express = __webpack_require__(/*! express */ "express");
        const router = express.Router();
        const connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        const i18n = __webpack_require__(/*! i18n */ "i18n");
        const { Course, studentcourse, Page, Chapter, User } =
          __webpack_require__(/*! ../models */ "./models/index.js");
        const isUser = (req, res, next) => {
          if (req.isAuthenticated()) {
            return next(); // User is a student
          }
          res.status(403).send("Unauthorized"); // User is not a student
        };

        //educator
        router.get(
          "/educator",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            const courses = await Course.findAll({
              where: {
                eduId: request.user.id,
              },
            });
            response.render("edu/educator", {
              courses,
              myCourse: i18n.__("My Courses"),
              createCourse: i18n.__("Create course"),
              viewCourse: i18n.__("View Course"),
            });
          },
        );

        //viewreports
        router.get("/viewreports", isUser, async (request, response) => {
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
              where: {
                role: "s",
              },
            });
            const totalStudents = stu.length;

            // Calculate the popularity score for each course based on the enrollment rate
            const courseReports = courses.map((course) => {
              const enrollmentRate =
                course.studentcourses.length / totalStudents;
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
            response.render("edu/viewreport", {
              courseReports,
              welcomeMessage: i18n.__("Welcome!"),
              changePassword: i18n.__("Change Password"),
              signOut: i18n.__("Signout"),
              totalStudents: i18n.__("Total Students Enrolled"),
              popularity: i18n.__("Popularity"),
            });
          } catch (error) {
            console.error(error);
            response.status(500).json({
              error: "Internal Server Error",
            });
          }
        });

        //createcourse
        router.get(
          "/createcourse",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            response.render("edu/creation/createcourse", {
              createCourseTitle: i18n.__("Create new course"),
              courseNameLabel: i18n.__("What is the name of the course?"),
              submitButton: i18n.__("Submit"),
            });
          },
        );

        //newpage
        router.get(
          "/newpage/:chapterId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            const chapterId = request.params.chapterId;
            console.log(chapterId);
            response.render("edu/creation/newpage", {
              chapterId,
              newPageTitle: i18n.__("New Page"),
              titleLabel: i18n.__("Title"),
              contentLabel: i18n.__("Content"),
              submitButton: i18n.__("Submit"),
            });
          },
        );

        //edu course
        router.get(
          "/educourse/:courseId",
          connectEnsureLogin.ensureLoggedIn(),
          isUser,
          async (request, response) => {
            const courseId = request.params.courseId;
            const course = await Course.findByPk(courseId);
            const chapters = await Chapter.findAll({
              where: {
                courseId: courseId,
              },
            });
            const pages = await Page.findAll();
            response.render("edu/educourse", {
              coursename: course.name,
              chapters,
              pages,
            });
          },
        );

        //createchapter
        router.get(
          "/createchapter/:chapterId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            const chapid = request.params.chapterId;
            const chapter = await Chapter.findByPk(chapid);
            const courseId = chapter.courseId;
            response.render("edu/creation/createchapter", {
              courseId,
            });
          },
        );

        //create course
        router.post(
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
              response.render("edu/creation/createchapter", {
                courseId,
              });
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //creating chapter
        router.post(
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
                where: {
                  chapterId: chapterid,
                },
              });
              response.render("edu/creation/createpage", {
                chapter,
                pages,
              });
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //creating page
        router.post(
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
                where: {
                  chapterId,
                },
              });
              response.render("edu/creation/createpage", {
                chapter,
                pages,
              });
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //delete page
        router.delete(
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
                response.status(200).json({
                  message: "Page deleted successfully",
                });
              } else {
                response.status(404).json({
                  error: "Page not found",
                });
              }
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //delete chapter
        router.delete(
          "/chapters/:chapterId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            console.log("Deleting a chapter");
            try {
              const chapterId = request.params.chapterId;
              const chapter = await Chapter.findByPk(chapterId);
              if (chapter) {
                // Delete the chapter from the database
                await Page.destroy({
                  where: {
                    chapterId,
                  },
                });
                await chapter.destroy();
                response.status(200).json({
                  message: "Chapter deleted successfully",
                });
              } else {
                response.status(404).json({
                  error: "Chapter not found",
                });
              }
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //delete course
        router.delete(
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
                  where: {
                    courseId: courseId,
                  },
                });
                // Delete associated pages
                await Page.destroy({
                  where: {
                    chapterId: chapters.map((chapter) => chapter.id),
                  },
                });

                //delete associated chapters
                await Chapter.destroy({
                  where: {
                    courseId: courseId,
                  },
                });
                await studentcourse.destroy({
                  where: {
                    courseId: courseId,
                  },
                });
                await course.destroy();
                return response.json({
                  success: true,
                });
              } else {
                response.status(404).json({
                  error: "Course not found",
                });
              }
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );
        module.exports = router;

        /***/
      },

    /***/ "./routes/student.js":
      /*!***************************!*\
  !*** ./routes/student.js ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        /* eslint-disable no-unused-vars */
        const express = __webpack_require__(/*! express */ "express");
        const router = express.Router();
        const connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        const i18n = __webpack_require__(/*! i18n */ "i18n");
        const { Course, studentcourse, Page, Chapter, pagecomp, User } =
          __webpack_require__(/*! ../models */ "./models/index.js");
        const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        const Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        const isUser = (req, res, next) => {
          if (req.isAuthenticated()) {
            return next(); // User is a student
          }
          res.status(403).send("Unauthorized"); // User is not a student
        };
        async function calculateCompletionPercentage(courseId, studentId) {
          const totalPages = await Page.count({
            include: {
              model: Chapter,
              where: {
                courseId,
              },
            },
          });
          console.log("a", totalPages, courseId);
          const completedPages = await pagecomp.count({
            include: [
              {
                model: Page,
                include: {
                  model: Chapter,
                  where: {
                    courseId,
                  },
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

        //student
        router.get(
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
            response.render("stu/student", {
              courses,
              availCourses: i18n.__("Available Courses"),
              myCourses: i18n.__("My courses"),
              viewCourse: i18n.__("View Course"),
              enroll: i18n.__("Enroll"),
            });
          },
        );

        //viewcourse
        router.get(
          "/viewcourse/:courseId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            const courseId = request.params.courseId;
            console.log(`Fetching chapters for courseId: ${courseId}`);
            const chapters = await Chapter.findAll({
              where: {
                courseId: courseId,
              },
            });
            const course = await Course.findByPk(courseId);
            if (!course) {
              throw new Error(`Course with id ${courseId} not found`);
            }
            console.log(`Course found: ${course.name} (ID: ${course.id})`);
            const edu = await User.findByPk(course.eduId);
            if (!edu) {
              throw new Error(`Educator with id ${course.eduId} not found`);
            }
            console.log(`Educator found: ${edu.name}`);

            // Get the locale from i18n
            const userLocale = i18n.getLocale(); // Get the current locale
            console.log(`Current locale: ${userLocale}`);

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
            const formattedDate = dateFormatter.format(
              new Date(course.createdAt),
            );
            console.log(`Formatted Date: ${formattedDate}`);
            if (!course) {
              return response.status(404).send("Course not found.");
            }
            if (!edu) {
              return response.status(404).send("Educator not found.");
            }
            if (!chapters) {
              return response.status(404).send("Chapters not found.");
            }
            console.log("abc");
            response.render("stu/viewing/viewcourse", {
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

        //viewencourse
        router.get(
          "/viewencourse/:courseId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            try {
              const courseId = request.params.courseId;
              console.log(`Fetching chapters for courseId: ${courseId}`);
              const chapters = await Chapter.findAll({
                where: {
                  courseId: courseId,
                },
              });
              const course = await Course.findByPk(courseId);
              if (!course) {
                throw new Error(`Course with id ${courseId} not found`);
              }
              console.log(`Course found: ${course.name} (ID: ${course.id})`);
              const edu = await User.findByPk(course.eduId);
              if (!edu) {
                throw new Error(`Educator with id ${course.eduId} not found`);
              }
              console.log(`Educator found: ${edu.name}`);

              // Get the locale from i18n
              const userLocale = i18n.getLocale(); // Get the current locale
              console.log(`Current locale: ${userLocale}`);

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
              const formattedDate = dateFormatter.format(
                new Date(course.createdAt),
              );
              console.log(`Formatted Date: ${formattedDate}`);
              response.render("stu/viewing/viewencourse", {
                coursename: course.name,
                courseid: course.id,
                date: formattedDate,
                chapters,
                eduname: edu.name,
                chapterTitle: i18n.__("Chapters"),
              });
            } catch (err) {
              // Capture the error in Sentry
              Sentry.captureException(err);
              console.error(`Error: ${err.message}`, err);
              response
                .status(500)
                .send("An error occurred while setting the language.");
            }
          },
        );

        //viewchap
        router.get(
          "/viewchap/:chapterId",
          connectEnsureLogin.ensureLoggedIn(),
          async (request, response) => {
            const chapterId = request.params.chapterId;
            const chaps = await Chapter.findByPk(chapterId);
            const pages = await Page.findAll({
              where: {
                chapterId: chapterId,
              },
            });
            response.render("stu/viewing/viewchap", {
              chapname: chaps.name,
              chapdesc: chaps.desc,
              pages,
            });
          },
        );

        //mycourses
        router.get(
          "/mycourses",
          connectEnsureLogin.ensureLoggedIn(),
          isUser,
          async (request, response) => {
            try {
              const studentId = request.user.id; // Assuming the student ID is stored in the user object
              const courses = await Course.findAll({
                include: {
                  model: studentcourse,
                  where: {
                    studentId: studentId,
                  }, // Filter by studentId
                },
              });
              // to Calculate progress for each course
              const coursesWithProgress = await Promise.all(
                courses.map(async (course) => {
                  const courseId = course.id;
                  // Replace with the actual studentId
                  const completionPercentage =
                    await calculateCompletionPercentage(courseId, studentId);
                  return {
                    ...course.toJSON(),
                    completionPercentage,
                  };
                }),
              );
              response.render("stu/mycourses", {
                courses: coursesWithProgress,
              });
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //viewpage
        router.get(
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
              response.render("stu/viewing/viewpage", {
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

        //enrollcourse
        router.post(
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
                where: {
                  courseId: courseId,
                },
              });
              await Course.isenrolled(course.id);
              const studentId = request.user.id;
              await studentcourse.create({
                studentId: studentId,
                courseId: courseId,
              });
              response.redirect(`/viewencourse/${courseId}`);
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );

        //mark as completed
        router.put(
          "/pages/:pageId/markAsCompleted",
          connectEnsureLogin.ensureLoggedIn(),
          isUser,
          async (request, response) => {
            console.log("Marking a page as completed");
            const page = await Page.findByPk(request.params.pageId);
            try {
              const markstatus = await page.markcomplete(
                request.body.completed,
              );
              await pagecomp.create({
                pageId: page.id,
                studentId: request.user.id,
              });
              console.log(request.body.completed);
              response.json(markstatus);
            } catch (error) {
              console.error(error);
              response.status(500).json({
                error: "Internal Server Error",
              });
            }
          },
        );
        module.exports = router;

        /***/
      },

    /***/ "@sentry/node":
      /*!*******************************!*\
  !*** external "@sentry/node" ***!
  \*******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("@sentry/node");

        /***/
      },

    /***/ "@sentry/profiling-node":
      /*!*****************************************!*\
  !*** external "@sentry/profiling-node" ***!
  \*****************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("@sentry/profiling-node");

        /***/
      },

    /***/ bcryptjs:
      /*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("bcryptjs");

        /***/
      },

    /***/ "body-parser":
      /*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("body-parser");

        /***/
      },

    /***/ "connect-ensure-login":
      /*!***************************************!*\
  !*** external "connect-ensure-login" ***!
  \***************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("connect-ensure-login");

        /***/
      },

    /***/ "connect-flash":
      /*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("connect-flash");

        /***/
      },

    /***/ dotenv:
      /*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("dotenv");

        /***/
      },

    /***/ express:
      /*!**************************!*\
  !*** external "express" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("express");

        /***/
      },

    /***/ "express-session":
      /*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("express-session");

        /***/
      },

    /***/ i18n:
      /*!***********************!*\
  !*** external "i18n" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("i18n");

        /***/
      },

    /***/ passport:
      /*!***************************!*\
  !*** external "passport" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("passport");

        /***/
      },

    /***/ "passport-local":
      /*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("passport-local");

        /***/
      },

    /***/ process:
      /*!**************************!*\
  !*** external "process" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("process");

        /***/
      },

    /***/ sequelize:
      /*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("sequelize");

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("fs");

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("path");

        /***/
      },

    /***/ "./config/config.json":
      /*!****************************!*\
  !*** ./config/config.json ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = /*#__PURE__*/ JSON.parse(
          '{"development":{"username":"lmsdb","password":"lmsdb","database":"lmsdb_development","host":"127.0.0.1","dialect":"mysql"},"test":{"username":"lmsdb","password":"lmsdb","database":"lmsdb_test","host":"127.0.0.1","dialect":"mysql"},"production":{"username":"root","password":null,"database":"lmsdb_production","host":"127.0.0.1","dialect":"mysql"}}',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /************************************************************************/
  /*!******************!*\
  !*** ./index.js ***!
  \******************/
  __webpack_require__(/*! dotenv */ "dotenv").config();
  const app = __webpack_require__(/*! ./app */ "./app.js");
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Started express server at port 4000");
  });
  /******/
})();
//# sourceMappingURL=bundle.js.map
//# debugId=1b38228e-7a5e-5547-b2d2-f9761fab95a0
