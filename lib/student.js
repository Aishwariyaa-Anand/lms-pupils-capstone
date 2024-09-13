/* eslint-disable no-constant-condition */
/* eslint-disable no-fallthrough */
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return e;
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
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
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
/* eslint-disable no-unused-vars */
var express = require("express");
var router = express.Router();
var connectEnsureLogin = require("connect-ensure-login");
var i18n = require("i18n");
var _require = require("../models"),
  Course = _require.Course,
  studentcourse = _require.studentcourse,
  Page = _require.Page,
  Chapter = _require.Chapter,
  pagecomp = _require.pagecomp,
  User = _require.User;
var Sequelize = require("sequelize");
var Sentry = require("@sentry/node");
var isUser = function isUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is a student
  }
  res.status(403).send("Unauthorized"); // User is not a student
};
function calculateCompletionPercentage(_x, _x2) {
  return _calculateCompletionPercentage.apply(this, arguments);
} //student
function _calculateCompletionPercentage() {
  _calculateCompletionPercentage = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(
      function _callee10(courseId, studentId) {
        var totalPages, completedPages, completionPercentage;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1)
            switch ((_context10.prev = _context10.next)) {
              case 0:
                _context10.next = 2;
                return Page.count({
                  include: {
                    model: Chapter,
                    where: {
                      courseId: courseId,
                    },
                  },
                });
              case 2:
                totalPages = _context10.sent;
                console.log("a", totalPages, courseId);
                _context10.next = 6;
                return pagecomp.count({
                  include: [
                    {
                      model: Page,
                      include: {
                        model: Chapter,
                        where: {
                          courseId: courseId,
                        },
                      },
                      required: true, // Ensures that only completed pages are considered
                    },
                  ],
                  where: {
                    studentId: studentId,
                  },
                });
              case 6:
                completedPages = _context10.sent;
                console.log("b", completedPages);
                completionPercentage = (completedPages / totalPages) * 100;
                return _context10.abrupt("return", completionPercentage);
              case 10:
              case "end":
                return _context10.stop();
            }
        }, _callee10);
      },
    ),
  );
  return _calculateCompletionPercentage.apply(this, arguments);
}
router.get(
  "/student",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee(request, response) {
          var studentId, enrolledCourses, enrolledCourseIds, courses;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
              switch ((_context.prev = _context.next)) {
                case 0:
                  studentId = request.user.id;
                  _context.next = 3;
                  return studentcourse.findAll({
                    where: {
                      studentId: studentId,
                    },
                    attributes: ["courseId"],
                  });
                case 3:
                  enrolledCourses = _context.sent;
                  enrolledCourseIds = enrolledCourses.map(
                    function (enrolledCourse) {
                      return enrolledCourse.courseId;
                    },
                  );
                  _context.next = 7;
                  return Course.findAll({
                    where: {
                      id: _defineProperty(
                        {},
                        Sequelize.Op.notIn,
                        enrolledCourseIds,
                      ),
                    },
                  });
                case 7:
                  courses = _context.sent;
                  response.render("stu/student", {
                    courses: courses,
                    availCourses: i18n.__("Available Courses"),
                    myCourses: i18n.__("My courses"),
                    viewCourse: i18n.__("View Course"),
                    enroll: i18n.__("Enroll"),
                  });
                case 9:
                case "end":
                  return _context.stop();
              }
          }, _callee);
        },
      ),
    );
    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  })(),
);

//viewcourse
router.get(
  "/viewcourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee2(request, response) {
          var courseId,
            chapters,
            course,
            edu,
            userLocale,
            dateFormatter,
            formattedDate;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1)
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  courseId = request.params.courseId;
                  console.log(
                    "Fetching chapters for courseId: ".concat(courseId),
                  );
                  _context2.next = 4;
                  return Chapter.findAll({
                    where: {
                      courseId: courseId,
                    },
                  });
                case 4:
                  chapters = _context2.sent;
                  _context2.next = 7;
                  return Course.findByPk(courseId);
                case 7:
                  course = _context2.sent;
                  if (course) {
                    _context2.next = 10;
                    break;
                  }
                  throw new Error(
                    "Course with id ".concat(courseId, " not found"),
                  );
                case 10:
                  console.log(
                    "Course found: "
                      .concat(course.name, " (ID: ")
                      .concat(course.id, ")"),
                  );
                  _context2.next = 13;
                  return User.findByPk(course.eduId);
                case 13:
                  edu = _context2.sent;
                  if (edu) {
                    _context2.next = 16;
                    break;
                  }
                  throw new Error(
                    "Educator with id ".concat(course.eduId, " not found"),
                  );
                case 16:
                  console.log("Educator found: ".concat(edu.name));

                  // Get the locale from i18n
                  userLocale = i18n.getLocale(); // Get the current locale
                  console.log("Current locale: ".concat(userLocale));

                  // Create a date formatter for the user's locale
                  dateFormatter = new Intl.DateTimeFormat(userLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // Set to true for 12-hour format
                  }); // Format the createdAt date
                  formattedDate = dateFormatter.format(
                    new Date(course.createdAt),
                  );
                  console.log("Formatted Date: ".concat(formattedDate));
                  if (course) {
                    _context2.next = 24;
                    break;
                  }
                  return _context2.abrupt(
                    "return",
                    response.status(404).send("Course not found."),
                  );
                case 24:
                  if (edu) {
                    _context2.next = 26;
                    break;
                  }
                  return _context2.abrupt(
                    "return",
                    response.status(404).send("Educator not found."),
                  );
                case 26:
                  if (chapters) {
                    _context2.next = 28;
                    break;
                  }
                  return _context2.abrupt(
                    "return",
                    response.status(404).send("Chapters not found."),
                  );
                case 28:
                  console.log("abc");
                  response.render("stu/viewing/viewcourse", {
                    coursename: course.name,
                    courseid: course.id,
                    date: formattedDate,
                    chapters: chapters,
                    eduname: edu.name,
                    enrollButton: i18n.__("Enroll"),
                    chapterTitle: i18n.__("Chapters"),
                  });
                case 30:
                case "end":
                  return _context2.stop();
              }
          }, _callee2);
        },
      ),
    );
    return function (_x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  })(),
);

//viewencourse
router.get(
  "/viewencourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee3(request, response) {
          var courseId,
            chapters,
            course,
            edu,
            userLocale,
            dateFormatter,
            formattedDate;
          return _regeneratorRuntime().wrap(
            function _callee3$(_context3) {
              while (1)
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    _context3.prev = 0;
                    courseId = request.params.courseId;
                    console.log(
                      "Fetching chapters for courseId: ".concat(courseId),
                    );
                    _context3.next = 5;
                    return Chapter.findAll({
                      where: {
                        courseId: courseId,
                      },
                    });
                  case 5:
                    chapters = _context3.sent;
                    _context3.next = 8;
                    return Course.findByPk(courseId);
                  case 8:
                    course = _context3.sent;
                    if (course) {
                      _context3.next = 11;
                      break;
                    }
                    throw new Error(
                      "Course with id ".concat(courseId, " not found"),
                    );
                  case 11:
                    console.log(
                      "Course found: "
                        .concat(course.name, " (ID: ")
                        .concat(course.id, ")"),
                    );
                    _context3.next = 14;
                    return User.findByPk(course.eduId);
                  case 14:
                    edu = _context3.sent;
                    if (edu) {
                      _context3.next = 17;
                      break;
                    }
                    throw new Error(
                      "Educator with id ".concat(course.eduId, " not found"),
                    );
                  case 17:
                    console.log("Educator found: ".concat(edu.name));

                    // Get the locale from i18n
                    userLocale = i18n.getLocale(); // Get the current locale
                    console.log("Current locale: ".concat(userLocale));

                    // Create a date formatter for the user's locale
                    dateFormatter = new Intl.DateTimeFormat(userLocale, {
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
                    formattedDate = dateFormatter.format(
                      new Date(course.createdAt),
                    );
                    console.log("Formatted Date: ".concat(formattedDate));
                    response.render("stu/viewing/viewencourse", {
                      coursename: course.name,
                      courseid: course.id,
                      date: formattedDate,
                      chapters: chapters,
                      eduname: edu.name,
                      chapterTitle: i18n.__("Chapters"),
                    });
                    _context3.next = 32;
                    break;
                  case 27:
                    _context3.prev = 27;
                    _context3.t0 = _context3["catch"](0);
                    // Capture the error in Sentry
                    Sentry.captureException(_context3.t0);
                    console.error(
                      "Error: ".concat(_context3.t0.message),
                      _context3.t0,
                    );
                    response
                      .status(500)
                      .send("An error occurred while setting the language.");
                  case 32:
                  case "end":
                    return _context3.stop();
                }
            },
            _callee3,
            null,
            [[0, 27]],
          );
        },
      ),
    );
    return function (_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  })(),
);

//viewchap
router.get(
  "/viewchap/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee4(request, response) {
          var chapterId, chaps, pages;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1)
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  chapterId = request.params.chapterId;
                  _context4.next = 3;
                  return Chapter.findByPk(chapterId);
                case 3:
                  chaps = _context4.sent;
                  _context4.next = 6;
                  return Page.findAll({
                    where: {
                      chapterId: chapterId,
                    },
                  });
                case 6:
                  pages = _context4.sent;
                  response.render("stu/viewing/viewchap", {
                    chapname: chaps.name,
                    chapdesc: chaps.desc,
                    pages: pages,
                  });
                case 8:
                case "end":
                  return _context4.stop();
              }
          }, _callee4);
        },
      ),
    );
    return function (_x9, _x10) {
      return _ref4.apply(this, arguments);
    };
  })(),
);

//mycourses
router.get(
  "/mycourses",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee6(request, response) {
          var studentId, courses, coursesWithProgress;
          return _regeneratorRuntime().wrap(
            function _callee6$(_context6) {
              while (1)
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    _context6.prev = 0;
                    studentId = request.user.id; // Assuming the student ID is stored in the user object
                    _context6.next = 4;
                    return Course.findAll({
                      include: {
                        model: studentcourse,
                        where: {
                          studentId: studentId,
                        }, // Filter by studentId
                      },
                    });
                  case 4:
                    courses = _context6.sent;
                    _context6.next = 7;
                    return Promise.all(
                      courses.map(
                        /*#__PURE__*/ (function () {
                          var _ref6 = _asyncToGenerator(
                            /*#__PURE__*/ _regeneratorRuntime().mark(
                              function _callee5(course) {
                                var courseId, completionPercentage;
                                return _regeneratorRuntime().wrap(
                                  function _callee5$(_context5) {
                                    while (1)
                                      switch (
                                        (_context5.prev = _context5.next)
                                      ) {
                                        case 0:
                                          courseId = course.id; // Replace with the actual studentId
                                          _context5.next = 3;
                                          return calculateCompletionPercentage(
                                            courseId,
                                            studentId,
                                          );
                                        case 3:
                                          completionPercentage = _context5.sent;
                                          return _context5.abrupt(
                                            "return",
                                            _objectSpread(
                                              _objectSpread(
                                                {},
                                                course.toJSON(),
                                              ),
                                              {},
                                              {
                                                completionPercentage:
                                                  completionPercentage,
                                              },
                                            ),
                                          );
                                        case 5:
                                        case "end":
                                          return _context5.stop();
                                      }
                                  },
                                  _callee5,
                                );
                              },
                            ),
                          );
                          return function (_x13) {
                            return _ref6.apply(this, arguments);
                          };
                        })(),
                      ),
                    );
                  case 7:
                    coursesWithProgress = _context6.sent;
                    response.render("stu/mycourses", {
                      courses: coursesWithProgress,
                    });
                    _context6.next = 15;
                    break;
                  case 11:
                    _context6.prev = 11;
                    _context6.t0 = _context6["catch"](0);
                    console.error(_context6.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 15:
                  case "end":
                    return _context6.stop();
                }
            },
            _callee6,
            null,
            [[0, 11]],
          );
        },
      ),
    );
    return function (_x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  })(),
);

//viewpage
router.get(
  "/viewpage/:pageId/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  /*#__PURE__*/ (function () {
    var _ref7 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee7(request, response) {
          var pageId, chapterId, page, studentId, pageCompletion;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1)
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  pageId = request.params.pageId;
                  chapterId = request.params.chapterId;
                  _context7.next = 4;
                  return Page.findByPk(pageId);
                case 4:
                  page = _context7.sent;
                  if (!(page && chapterId == page.chapterId)) {
                    _context7.next = 13;
                    break;
                  }
                  studentId = request.user.id;
                  _context7.next = 9;
                  return pagecomp.findOne({
                    where: {
                      pageId: page.id,
                      studentId: studentId,
                    },
                  });
                case 9:
                  pageCompletion = _context7.sent;
                  response.render("stu/viewing/viewpage", {
                    pagetitle: page.title,
                    pagecont: page.content,
                    pageid: page.id,
                    chap: page.chapterId,
                    completed: pageCompletion ? true : false,
                  });
                  _context7.next = 14;
                  break;
                case 13:
                  response.redirect("/student");
                case 14:
                case "end":
                  return _context7.stop();
              }
          }, _callee7);
        },
      ),
    );
    return function (_x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  })(),
);

//enrollcourse
router.post(
  "/enroll/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  /*#__PURE__*/ (function () {
    var _ref8 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee8(request, response) {
          var courseId, course, edu, chapters, studentId;
          return _regeneratorRuntime().wrap(
            function _callee8$(_context8) {
              while (1)
                switch ((_context8.prev = _context8.next)) {
                  case 0:
                    console.log("Enrolling in a course");
                    _context8.prev = 1;
                    courseId = request.params.courseId;
                    _context8.next = 5;
                    return Course.findByPk(courseId);
                  case 5:
                    course = _context8.sent;
                    _context8.next = 8;
                    return User.findByPk(course.eduId);
                  case 8:
                    edu = _context8.sent;
                    _context8.next = 11;
                    return Chapter.findAll({
                      where: {
                        courseId: courseId,
                      },
                    });
                  case 11:
                    chapters = _context8.sent;
                    _context8.next = 14;
                    return Course.isenrolled(course.id);
                  case 14:
                    studentId = request.user.id;
                    _context8.next = 17;
                    return studentcourse.create({
                      studentId: studentId,
                      courseId: courseId,
                    });
                  case 17:
                    response.redirect("/viewencourse/".concat(courseId));
                    _context8.next = 24;
                    break;
                  case 20:
                    _context8.prev = 20;
                    _context8.t0 = _context8["catch"](1);
                    console.error(_context8.t0);
                    response.status(500).json({
                      error: "Internal Server Error",
                    });
                  case 24:
                  case "end":
                    return _context8.stop();
                }
            },
            _callee8,
            null,
            [[1, 20]],
          );
        },
      ),
    );
    return function (_x16, _x17) {
      return _ref8.apply(this, arguments);
    };
  })(),
);

//mark as completed
router.put(
  "/pages/:pageId/markAsCompleted",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  /*#__PURE__*/ (function () {
    var _ref9 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(
        function _callee9(request, response) {
          var page, markstatus;
          return _regeneratorRuntime().wrap(
            function _callee9$(_context9) {
              while (1)
                switch ((_context9.prev = _context9.next)) {
                  case 0:
                    console.log("Marking a page as completed");
                    _context9.next = 3;
                    return Page.findByPk(request.params.pageId);
                  case 3:
                    page = _context9.sent;
                    _context9.prev = 4;
                    _context9.next = 7;
                    return page.markcomplete(request.body.completed);
                  case 7:
                    markstatus = _context9.sent;
                    _context9.next = 10;
                    return pagecomp.create({
                      pageId: page.id,
                      studentId: request.user.id,
                    });
                  case 10:
                    console.log(request.body.completed);
                    response.json(markstatus);
                    _context9.next = 18;
                    break;
                  case 14:
                    _context9.prev = 14;
                    _context9.t0 = _context9["catch"](4);
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
            [[4, 14]],
          );
        },
      ),
    );
    return function (_x18, _x19) {
      return _ref9.apply(this, arguments);
    };
  })(),
);
module.exports = router;
