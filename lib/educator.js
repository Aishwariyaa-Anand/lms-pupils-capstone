/* eslint-disable no-constant-condition */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-func-assign */
"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return e;
    };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (t, e, r) {
        t[e] = r.value;
      },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return (
      Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return (t[e] = r);
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return { type: "normal", arg: t.call(e, r) };
    } catch (t) {
      return { type: "throw", arg: t };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(p));
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await")
          ? e.resolve(h.__await).then(
              function (t) {
                invoke("next", t, i, a);
              },
              function (t) {
                invoke("throw", t, i, a);
              },
            )
          : e.resolve(h).then(
              function (t) {
                (u.value = t), i(u);
              },
              function (t) {
                return invoke("throw", t, i, a);
              },
            );
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return (r = r
          ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return { value: t, done: !0 };
      }
      for (n.method = i, n.arg = a; ; ) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;
        else if ("throw" === n.method) {
          if (o === h) throw ((o = s), n.arg);
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (((o = n.done ? s : l), p.arg === y)) continue;
          return { value: p.arg, done: n.done };
        }
        "throw" === p.type && ((o = s), (n.method = "throw"), (n.arg = p.arg));
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t)
      return (
        (r.delegate = null),
        ("throw" === n &&
          e.iterator["return"] &&
          ((r.method = "return"),
          (r.arg = t),
          maybeInvokeDelegate(e, r),
          "throw" === r.method)) ||
          ("return" !== n &&
            ((r.method = "throw"),
            (r.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method",
            )))),
        y
      );
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type)
      return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y;
    var a = i.arg;
    return a
      ? a.done
        ? ((r[e.resultName] = a.value),
          (r.next = e.nextLoc),
          "return" !== r.method && ((r.method = "next"), (r.arg = t)),
          (r.delegate = null),
          y)
        : a
      : ((r.method = "throw"),
        (r.arg = new TypeError("iterator result is not an object")),
        (r.delegate = null),
        y);
  }
  function pushTryEntry(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function Context(t) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      t.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length; )
              if (n.call(e, o))
                return (next.value = e[o]), (next.done = !1), next;
            return (next.value = t), (next.done = !0), next;
          };
        return (i.next = i);
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      u,
      "GeneratorFunction",
    )),
    (e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return (
        !!e &&
        (e === GeneratorFunction ||
          "GeneratorFunction" === (e.displayName || e.name))
      );
    }),
    (e.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
          : ((t.__proto__ = GeneratorFunctionPrototype),
            define(t, u, "GeneratorFunction")),
        (t.prototype = Object.create(g)),
        t
      );
    }),
    (e.awrap = function (t) {
      return { __await: t };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, c, function () {
      return this;
    }),
    (e.AsyncIterator = AsyncIterator),
    (e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r)
        ? a
        : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
    }),
    defineIteratorMethods(g),
    define(g, u, "Generator"),
    define(g, a, function () {
      return this;
    }),
    define(g, "toString", function () {
      return "[object Generator]";
    }),
    (e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return (
        r.reverse(),
        function next() {
          for (; r.length; ) {
            var t = r.pop();
            if (t in e) return (next.value = t), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (e.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = t),
          this.tryEntries.forEach(resetTryEntry),
          !e)
        )
          for (var r in this)
            "t" === r.charAt(0) &&
              n.call(this, r) &&
              !isNaN(+r.slice(1)) &&
              (this[r] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return (
            (a.type = "throw"),
            (a.arg = e),
            (r.next = n),
            o && ((r.method = "next"), (r.arg = t)),
            !!o
          );
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, "finallyLoc") &&
            this.prev < o.finallyLoc
          ) {
            var i = o;
            break;
          }
        }
        i &&
          ("break" === t || "continue" === t) &&
          i.tryLoc <= e &&
          e <= i.finallyLoc &&
          (i = null);
        var a = i ? i.completion : {};
        return (
          (a.type = t),
          (a.arg = e),
          i
            ? ((this.method = "next"), (this.next = i.finallyLoc), y)
            : this.complete(a)
        );
      },
      complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
          y
        );
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t)
            return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function _catch(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(e, r, n) {
        return (
          (this.delegate = { iterator: values(e), resultName: r, nextLoc: n }),
          "next" === this.method && (this.arg = t),
          y
        );
      },
    }),
    e
  );
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
var express = require("express");
var router = express.Router();
var connectEnsureLogin = require("connect-ensure-login");
var i18n = require("i18n");
var _require = require("../models"),
  Course = _require.Course,
  studentcourse = _require.studentcourse,
  Page = _require.Page,
  Chapter = _require.Chapter,
  User = _require.User;
var isUser = function isUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is a student
  }
  res.status(403).send("Unauthorized"); // User is not a student
};

//educator
router.get(
  "/educator",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee(request, response) {
          var courses;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return Course.findAll({
                    where: {
                      eduId: request.user.id,
                    },
                  });
                case 2:
                  courses = _context.sent;
                  response.render("edu/educator", {
                    courses: courses,
                    myCourse: i18n.__("My Courses"),
                    createCourse: i18n.__("Create course"),
                    viewCourse: i18n.__("View Course"),
                  });
                case 4:
                case "end":
                  return _context.stop();
              }
          }, _callee);
        },
      ),
    );
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })(),
);

//viewreports
router.get(
  "/viewreports",
  isUser,
  /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee2(request, response) {
          var educatorId, courses, stu, totalStudents, courseReports;
          return _regeneratorRuntime().wrap(
            function _callee2$(_context2) {
              while (1)
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.prev = 0;
                    educatorId = request.user.id;
                    _context2.next = 4;
                    return Course.findAll({
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
                  case 4:
                    courses = _context2.sent;
                    console.log(educatorId);
                    //total number of students enrolled
                    _context2.next = 8;
                    return User.findAll({
                      where: {
                        role: "s",
                      },
                    });
                  case 8:
                    stu = _context2.sent;
                    totalStudents = stu.length; // Calculate the popularity score for each course based on the enrollment rate
                    courseReports = courses.map(function (course) {
                      var enrollmentRate =
                        course.studentcourses.length / totalStudents;
                      // Adjust the score as needed, e.g., multiplying by a factor to make the numbers more readable
                      var popularityScore = enrollmentRate * 100;
                      return {
                        courseId: course.id,
                        courseName: course.name,
                        totalStudents: course.studentcourses.length,
                        popularityScore: popularityScore.toFixed(2), // Round the score to 2 decimal places
                      };
                    }); // Sort the courseReports by popularity score in descending order
                    courseReports.sort(function (a, b) {
                      return b.popularityScore - a.popularityScore;
                    });
                    response.render("edu/viewreport", {
                      courseReports: courseReports,
                      welcomeMessage: i18n.__("Welcome!"),
                      changePassword: i18n.__("Change Password"),
                      signOut: i18n.__("Signout"),
                      totalStudents: i18n.__("Total Students Enrolled"),
                      popularity: i18n.__("Popularity"),
                    });
                    _context2.next = 19;
                    break;
                  case 15:
                    _context2.prev = 15;
                    _context2.t0 = _context2["catch"](0);
                    console.error(_context2.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 19:
                  case "end":
                    return _context2.stop();
                }
            },
            _callee2,
            null,
            [[0, 15]],
          );
        },
      ),
    );
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })(),
);

//createcourse
router.get(
  "/createcourse",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee3(request, response) {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1)
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  response.render("edu/creation/createcourse", {
                    createCourseTitle: i18n.__("Create new course"),
                    courseNameLabel: i18n.__("What is the name of the course?"),
                    submitButton: i18n.__("Submit"),
                  });
                case 1:
                case "end":
                  return _context3.stop();
              }
          }, _callee3);
        },
      ),
    );
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  })(),
);

//newpage
router.get(
  "/newpage/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee4(request, response) {
          var chapterId;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  chapterId = request.params.chapterId;
                  console.log(chapterId);
                  response.render("edu/creation/newpage", {
                    chapterId: chapterId,
                    newPageTitle: i18n.__("New Page"),
                    titleLabel: i18n.__("Title"),
                    contentLabel: i18n.__("Content"),
                    submitButton: i18n.__("Submit"),
                  });
                case 3:
                case "end":
                  return _context4.stop();
              }
          }, _callee4);
        },
      ),
    );
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  })(),
);

//edu course
router.get(
  "/educourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee5(request, response) {
          var courseId, course, chapters, pages;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1)
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  courseId = request.params.courseId;
                  _context5.next = 3;
                  return Course.findByPk(courseId);
                case 3:
                  course = _context5.sent;
                  _context5.next = 6;
                  return Chapter.findAll({
                    where: {
                      courseId: courseId,
                    },
                  });
                case 6:
                  chapters = _context5.sent;
                  _context5.next = 9;
                  return Page.findAll();
                case 9:
                  pages = _context5.sent;
                  response.render("edu/educourse", {
                    coursename: course.name,
                    chapters: chapters,
                    pages: pages,
                  });
                case 11:
                case "end":
                  return _context5.stop();
              }
          }, _callee5);
        },
      ),
    );
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  })(),
);

//createchapter
router.get(
  "/createchapter/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref6 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee6(request, response) {
          var chapid, chapter, courseId;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1)
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  chapid = request.params.chapterId;
                  _context6.next = 3;
                  return Chapter.findByPk(chapid);
                case 3:
                  chapter = _context6.sent;
                  courseId = chapter.courseId;
                  response.render("edu/creation/createchapter", {
                    courseId: courseId,
                  });
                case 6:
                case "end":
                  return _context6.stop();
              }
          }, _callee6);
        },
      ),
    );
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  })(),
);

//create course
router.post(
  "/courses",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref7 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee7(request, response) {
          var createdCourse, courseId;
          return _regeneratorRuntime().wrap(
            function _callee7$(_context7) {
              while (1)
                switch ((_context7.prev = _context7.next)) {
                  case 0:
                    console.log("Creating a course");
                    _context7.prev = 1;
                    if (request.body.coursename) {
                      _context7.next = 5;
                      break;
                    }
                    request.flash("error", "Course name cannot be empty");
                    return _context7.abrupt(
                      "return",
                      response.redirect("/createcourse"),
                    );
                  case 5:
                    _context7.next = 7;
                    return Course.create({
                      name: request.body.coursename,
                      eduId: request.user.id,
                    });
                  case 7:
                    createdCourse = _context7.sent;
                    courseId = createdCourse.id;
                    response.render("edu/creation/createchapter", {
                      courseId: courseId,
                    });
                    _context7.next = 16;
                    break;
                  case 12:
                    _context7.prev = 12;
                    _context7.t0 = _context7["catch"](1);
                    console.error(_context7.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 16:
                  case "end":
                    return _context7.stop();
                }
            },
            _callee7,
            null,
            [[1, 12]],
          );
        },
      ),
    );
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  })(),
);

//creating chapter
router.post(
  "/courses/:courseId/chapters",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref8 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee8(request, response) {
          var courseId, createdChapter, chapterid, chapter, pages;
          return _regeneratorRuntime().wrap(
            function _callee8$(_context8) {
              while (1)
                switch ((_context8.prev = _context8.next)) {
                  case 0:
                    console.log("Creating a chapter for a course");
                    _context8.prev = 1;
                    courseId = request.params.courseId;
                    _context8.next = 5;
                    return Chapter.create({
                      name: request.body.chaptername,
                      desc: request.body.desc,
                      courseId: courseId,
                    });
                  case 5:
                    createdChapter = _context8.sent;
                    chapterid = createdChapter.id;
                    _context8.next = 9;
                    return Chapter.findByPk(chapterid);
                  case 9:
                    chapter = _context8.sent;
                    _context8.next = 12;
                    return Page.findAll({
                      where: {
                        chapterId: chapterid,
                      },
                    });
                  case 12:
                    pages = _context8.sent;
                    response.render("edu/creation/createpage", {
                      chapter: chapter,
                      pages: pages,
                    });
                    _context8.next = 20;
                    break;
                  case 16:
                    _context8.prev = 16;
                    _context8.t0 = _context8["catch"](1);
                    console.error(_context8.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 20:
                  case "end":
                    return _context8.stop();
                }
            },
            _callee8,
            null,
            [[1, 16]],
          );
        },
      ),
    );
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  })(),
);

//creating page
router.post(
  "/chapters/:chapterId/pages",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref9 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee9(request, response) {
          var chapterId, chapter, pages;
          return _regeneratorRuntime().wrap(
            function _callee9$(_context9) {
              while (1)
                switch ((_context9.prev = _context9.next)) {
                  case 0:
                    console.log("Creating a page for a chapter");
                    _context9.prev = 1;
                    chapterId = request.params.chapterId;
                    _context9.next = 5;
                    return Page.create({
                      title: request.body.title,
                      content: request.body.content,
                      chapterId: chapterId,
                    });
                  case 5:
                    _context9.next = 7;
                    return Chapter.findByPk(chapterId);
                  case 7:
                    chapter = _context9.sent;
                    _context9.next = 10;
                    return Page.findAll({
                      where: {
                        chapterId: chapterId,
                      },
                    });
                  case 10:
                    pages = _context9.sent;
                    response.render("edu/creation/createpage", {
                      chapter: chapter,
                      pages: pages,
                    });
                    _context9.next = 18;
                    break;
                  case 14:
                    _context9.prev = 14;
                    _context9.t0 = _context9["catch"](1);
                    console.error(_context9.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 18:
                  case "end":
                    return _context9.stop();
                }
            },
            _callee9,
            null,
            [[1, 14]],
          );
        },
      ),
    );
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  })(),
);

//delete page
router["delete"](
  "/pages/:pageId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref10 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee10(request, response) {
          var pageId, page;
          return _regeneratorRuntime().wrap(
            function _callee10$(_context10) {
              while (1)
                switch ((_context10.prev = _context10.next)) {
                  case 0:
                    console.log("Deleting a page");
                    _context10.prev = 1;
                    pageId = request.params.pageId;
                    _context10.next = 5;
                    return Page.findByPk(pageId);
                  case 5:
                    page = _context10.sent;
                    if (!page) {
                      _context10.next = 12;
                      break;
                    }
                    _context10.next = 9;
                    return page.destroy();
                  case 9:
                    response.status(200).json({
                      message: "Page deleted successfully",
                    });
                    _context10.next = 13;
                    break;
                  case 12:
                    response.status(404).json({
                      error: "Page not found",
                    });
                  case 13:
                    _context10.next = 19;
                    break;
                  case 15:
                    _context10.prev = 15;
                    _context10.t0 = _context10["catch"](1);
                    console.error(_context10.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 19:
                  case "end":
                    return _context10.stop();
                }
            },
            _callee10,
            null,
            [[1, 15]],
          );
        },
      ),
    );
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  })(),
);

//delete chapter
router["delete"](
  "/chapters/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref11 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee11(request, response) {
          var chapterId, chapter;
          return _regeneratorRuntime().wrap(
            function _callee11$(_context11) {
              while (1)
                switch ((_context11.prev = _context11.next)) {
                  case 0:
                    console.log("Deleting a chapter");
                    _context11.prev = 1;
                    chapterId = request.params.chapterId;
                    _context11.next = 5;
                    return Chapter.findByPk(chapterId);
                  case 5:
                    chapter = _context11.sent;
                    if (!chapter) {
                      _context11.next = 14;
                      break;
                    }
                    _context11.next = 9;
                    return Page.destroy({
                      where: {
                        chapterId: chapterId,
                      },
                    });
                  case 9:
                    _context11.next = 11;
                    return chapter.destroy();
                  case 11:
                    response.status(200).json({
                      message: "Chapter deleted successfully",
                    });
                    _context11.next = 15;
                    break;
                  case 14:
                    response.status(404).json({
                      error: "Chapter not found",
                    });
                  case 15:
                    _context11.next = 21;
                    break;
                  case 17:
                    _context11.prev = 17;
                    _context11.t0 = _context11["catch"](1);
                    console.error(_context11.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 21:
                  case "end":
                    return _context11.stop();
                }
            },
            _callee11,
            null,
            [[1, 17]],
          );
        },
      ),
    );
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  })(),
);

//delete course
router["delete"](
  "/courses/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref12 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee12(request, response) {
          var courseId, course, chapters;
          return _regeneratorRuntime().wrap(
            function _callee12$(_context12) {
              while (1)
                switch ((_context12.prev = _context12.next)) {
                  case 0:
                    console.log("Deleting a course");
                    _context12.prev = 1;
                    courseId = request.params.courseId;
                    _context12.next = 5;
                    return Course.findByPk(courseId);
                  case 5:
                    course = _context12.sent;
                    if (!course) {
                      _context12.next = 21;
                      break;
                    }
                    _context12.next = 9;
                    return Chapter.findAll({
                      where: {
                        courseId: courseId,
                      },
                    });
                  case 9:
                    chapters = _context12.sent;
                    _context12.next = 12;
                    return Page.destroy({
                      where: {
                        chapterId: chapters.map(function (chapter) {
                          return chapter.id;
                        }),
                      },
                    });
                  case 12:
                    _context12.next = 14;
                    return Chapter.destroy({
                      where: {
                        courseId: courseId,
                      },
                    });
                  case 14:
                    _context12.next = 16;
                    return studentcourse.destroy({
                      where: {
                        courseId: courseId,
                      },
                    });
                  case 16:
                    _context12.next = 18;
                    return course.destroy();
                  case 18:
                    return _context12.abrupt(
                      "return",
                      response.json({
                        success: true,
                      }),
                    );
                  case 21:
                    response.status(404).json({
                      error: "Course not found",
                    });
                  case 22:
                    _context12.next = 28;
                    break;
                  case 24:
                    _context12.prev = 24;
                    _context12.t0 = _context12["catch"](1);
                    console.error(_context12.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 28:
                  case "end":
                    return _context12.stop();
                }
            },
            _callee12,
            null,
            [[1, 24]],
          );
        },
      ),
    );
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  })(),
);
module.exports = router;
