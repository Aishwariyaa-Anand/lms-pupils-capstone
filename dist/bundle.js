/******/ (() => {
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
                  ? r.then(
                      callInvokeWithMethodAndArg,
                      callInvokeWithMethodAndArg,
                    )
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
                "throw" === p.type &&
                  ((o = s), (n.method = "throw"), (n.arg = p.arg));
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
              return (
                (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y
              );
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
                      if (!u)
                        throw Error("try statement without catch or finally");
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
                    return (
                      this.complete(r.completion, r.afterLoc),
                      resetTryEntry(r),
                      y
                    );
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
                  (this.delegate = {
                    iterator: values(e),
                    resultName: r,
                    nextLoc: n,
                  }),
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
        /* eslint-disable no-unused-vars */
        __webpack_require__(/*! ./instrument.js */ "./instrument.js");
        var Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        var express = __webpack_require__(/*! express */ "express");
        var app = express();
        var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
        var path = __webpack_require__(/*! path */ "path");
        app.set("views", path.join(__dirname, "views"));
        var passport = __webpack_require__(/*! passport */ "passport");
        var connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        var session = __webpack_require__(
          /*! express-session */ "express-session",
        );
        var flash = __webpack_require__(/*! connect-flash */ "connect-flash");
        var LocalStrategy = __webpack_require__(
          /*! passport-local */ "passport-local",
        );
        var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
        var saltRounds = 10;
        var authRoutes = __webpack_require__(
          /*! ./routes/auth */ "./routes/auth.js",
        );
        var studentRoutes = __webpack_require__(
          /*! ./routes/student */ "./routes/student.js",
        );
        var educatorRoutes = __webpack_require__(
          /*! ./routes/educator */ "./routes/educator.js",
        );
        app.use(bodyParser.json());
        app.use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );

        //translations
        var i18n = __webpack_require__(/*! i18n */ "i18n");

        // eslint-disable-next-line no-undef
        app.use(express["static"](path.join(__dirname, "public")));
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
            function (username, password, done) {
              User.findOne({
                where: {
                  email: username,
                },
              })
                .then(
                  /*#__PURE__*/ (function () {
                    var _ref = _asyncToGenerator(
                      /*#__PURE__*/ _regeneratorRuntime().mark(
                        function _callee(user) {
                          var result;
                          return _regeneratorRuntime().wrap(function _callee$(
                            _context,
                          ) {
                            while (1)
                              switch ((_context.prev = _context.next)) {
                                case 0:
                                  if (user) {
                                    _context.next = 2;
                                    break;
                                  }
                                  return _context.abrupt(
                                    "return",
                                    done(null, false, {
                                      message: "Invalid email",
                                    }),
                                  );
                                case 2:
                                  _context.next = 4;
                                  return bcrypt.compare(
                                    password,
                                    user.password,
                                  );
                                case 4:
                                  result = _context.sent;
                                  if (!result) {
                                    _context.next = 9;
                                    break;
                                  }
                                  return _context.abrupt(
                                    "return",
                                    done(null, user),
                                  );
                                case 9:
                                  return _context.abrupt(
                                    "return",
                                    done(null, false, {
                                      message: "Invalid password",
                                    }),
                                  );
                                case 10:
                                case "end":
                                  return _context.stop();
                              }
                          }, _callee);
                        },
                      ),
                    );
                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  })(),
                )
                ["catch"](function (error) {
                  return done(error);
                });
            },
          ),
        );
        passport.serializeUser(function (user, done) {
          done(null, user.id); // Serialize user ID and role
        });
        passport.deserializeUser(function (id, done) {
          User.findByPk(id)
            .then(function (user) {
              done(null, user);
            })
            ["catch"](function (error) {
              done(error, null);
            });
        });
        var _require = __webpack_require__(/*! ./models */ "./models/index.js"),
          User = _require.User;
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
        var Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        var _require = __webpack_require__(
            /*! @sentry/profiling-node */ "@sentry/profiling-node",
          ),
          nodeProfilingIntegration = _require.nodeProfilingIntegration;
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

        var fs = __webpack_require__(/*! fs */ "fs");
        var path = __webpack_require__(/*! path */ "path");
        var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        var process = __webpack_require__(/*! process */ "process");
        var basename = path.basename(__filename);
        var env = process.env.NODE_ENV || "development";
        var config = __webpack_require__(
          /*! ./config/config.json */ "./config/config.json",
        )[env];
        var db = {};
        var sequelize;
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
          .filter(function (file) {
            return (
              file.indexOf(".") !== 0 &&
              file !== basename &&
              file.slice(-3) === ".js" &&
              file.indexOf(".test.js") === -1
            );
          })
          .forEach(function (file) {
            var model = __webpack_require__("./models sync recursive")(
              path.join(__dirname, file),
            )(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
          });
        Object.keys(db).forEach(function (modelName) {
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
                  ? r.then(
                      callInvokeWithMethodAndArg,
                      callInvokeWithMethodAndArg,
                    )
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
                "throw" === p.type &&
                  ((o = s), (n.method = "throw"), (n.arg = p.arg));
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
              return (
                (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y
              );
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
                      if (!u)
                        throw Error("try statement without catch or finally");
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
                    return (
                      this.complete(r.completion, r.afterLoc),
                      resetTryEntry(r),
                      y
                    );
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
                  (this.delegate = {
                    iterator: values(e),
                    resultName: r,
                    nextLoc: n,
                  }),
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
        var express = __webpack_require__(/*! express */ "express");
        var router = express.Router();
        var passport = __webpack_require__(/*! passport */ "passport");
        var i18n = __webpack_require__(/*! i18n */ "i18n");
        var User = __webpack_require__(
          /*! ../models */ "./models/index.js",
        ).User;
        var bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
        var Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
        var saltRounds = 10;
        router.get(
          "/",
          /*#__PURE__*/ (function () {
            var _ref = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee(request, response) {
                  return _regeneratorRuntime().wrap(function _callee$(
                    _context,
                  ) {
                    while (1)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          console.log("App started");
                          console.log(i18n.getLocale());
                          response.render("index", {
                            signInEducator: i18n.__("Sign in as Educator"),
                            signInStudent: i18n.__("Sign in as Student"),
                            email: i18n.__("Email"),
                            password: i18n.__("Password"),
                          });
                        case 3:
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
        router.get(
          "/login",
          /*#__PURE__*/ (function () {
            var _ref2 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee2(request, response) {
                  return _regeneratorRuntime().wrap(function _callee2$(
                    _context2,
                  ) {
                    while (1)
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          response.render("index", {
                            signInEducator: i18n.__("Sign in as Educator"),
                            signInStudent: i18n.__("Sign in as Student"),
                            email: i18n.__("Email"),
                            password: i18n.__("Password"),
                          });
                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                  }, _callee2);
                },
              ),
            );
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          })(),
        );
        router.get(
          "/edusignup",
          /*#__PURE__*/ (function () {
            var _ref3 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee3(request, response) {
                  return _regeneratorRuntime().wrap(function _callee3$(
                    _context3,
                  ) {
                    while (1)
                      switch ((_context3.prev = _context3.next)) {
                        case 0:
                          response.render("auth/edusignup", {
                            signUpAsEducator: i18n.__("Sign up as Educator"),
                            nameLabel: i18n.__("Name"),
                            emailLabel: i18n.__("Email"),
                            passwordLabel: i18n.__("Password"),
                            submitButton: i18n.__("Sign up"),
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
        router.get(
          "/stusignup",
          /*#__PURE__*/ (function () {
            var _ref4 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee4(request, response) {
                  return _regeneratorRuntime().wrap(function _callee4$(
                    _context4,
                  ) {
                    while (1)
                      switch ((_context4.prev = _context4.next)) {
                        case 0:
                          response.render("auth/stusignup", {
                            signUpAsStudent: i18n.__("Sign up as Student"),
                            nameLabel: i18n.__("Name"),
                            emailLabel: i18n.__("Email"),
                            passwordLabel: i18n.__("Password"),
                            submitButton: i18n.__("Sign up"),
                          });
                        case 1:
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
        router.get(
          "/signout",
          /*#__PURE__*/ (function () {
            var _ref5 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee5(request, response, next) {
                  return _regeneratorRuntime().wrap(function _callee5$(
                    _context5,
                  ) {
                    while (1)
                      switch ((_context5.prev = _context5.next)) {
                        case 0:
                          request.logout(function (error) {
                            if (error) {
                              return next(error);
                            }
                            response.redirect("/");
                          });
                        case 1:
                        case "end":
                          return _context5.stop();
                      }
                  }, _callee5);
                },
              ),
            );
            return function (_x9, _x10, _x11) {
              return _ref5.apply(this, arguments);
            };
          })(),
        );

        //change lang
        router.get("/set-language/:lang", function (req, res) {
          try {
            var lang = req.params.lang;
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
        router.get(
          "/changepassedu",
          /*#__PURE__*/ (function () {
            var _ref6 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee6(request, response) {
                  var userid, user;
                  return _regeneratorRuntime().wrap(function _callee6$(
                    _context6,
                  ) {
                    while (1)
                      switch ((_context6.prev = _context6.next)) {
                        case 0:
                          userid = request.user.id;
                          _context6.next = 3;
                          return User.findByPk(userid);
                        case 3:
                          user = _context6.sent;
                          response.render("auth/changepass", {
                            user: user,
                            role: "e",
                          });
                        case 5:
                        case "end":
                          return _context6.stop();
                      }
                  }, _callee6);
                },
              ),
            );
            return function (_x12, _x13) {
              return _ref6.apply(this, arguments);
            };
          })(),
        );
        router.get(
          "/changepassstu",
          /*#__PURE__*/ (function () {
            var _ref7 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee7(request, response) {
                  var userid, user;
                  return _regeneratorRuntime().wrap(function _callee7$(
                    _context7,
                  ) {
                    while (1)
                      switch ((_context7.prev = _context7.next)) {
                        case 0:
                          userid = request.user.id;
                          _context7.next = 3;
                          return User.findByPk(userid);
                        case 3:
                          user = _context7.sent;
                          response.render("auth/changepass", {
                            user: user,
                            role: "s",
                          });
                        case 5:
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
        router.post(
          "/change-password/:role",
          /*#__PURE__*/ (function () {
            var _ref8 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee8(req, res) {
                  var userId,
                    oldPassword,
                    newPassword,
                    confirmPassword,
                    user,
                    isMatch,
                    hashedPassword;
                  return _regeneratorRuntime().wrap(
                    function _callee8$(_context8) {
                      while (1)
                        switch ((_context8.prev = _context8.next)) {
                          case 0:
                            console.log("changepassword");
                            userId = req.user.id; // Assuming you have authenticated the user and set up the user object
                            oldPassword = req.body.oldPassword;
                            newPassword = req.body.newPassword;
                            confirmPassword = req.body.confirmPassword;
                            _context8.prev = 5;
                            _context8.next = 8;
                            return User.findByPk(userId);
                          case 8:
                            user = _context8.sent;
                            _context8.next = 11;
                            return bcrypt.compare(oldPassword, user.password);
                          case 11:
                            isMatch = _context8.sent;
                            if (isMatch) {
                              _context8.next = 15;
                              break;
                            }
                            req.flash("error", "Incorrect Old Password");
                            return _context8.abrupt(
                              "return",
                              res.redirect("/changepassedu"),
                            );
                          case 15:
                            if (!(newPassword !== confirmPassword)) {
                              _context8.next = 18;
                              break;
                            }
                            req.flash(
                              "error",
                              "New and Confrimation passwords do not match ",
                            );
                            return _context8.abrupt(
                              "return",
                              res.redirect("/changepassedu"),
                            );
                          case 18:
                            _context8.next = 20;
                            return bcrypt.hash(newPassword, 10);
                          case 20:
                            hashedPassword = _context8.sent;
                            // Update the user's password in the database
                            user.password = hashedPassword;
                            _context8.next = 24;
                            return user.save();
                          case 24:
                            console.log("x");
                            if (user.role === "e") {
                              res.redirect("/");
                            }
                            if (user.role === "s") {
                              res.redirect("/");
                            }
                            _context8.next = 33;
                            break;
                          case 29:
                            _context8.prev = 29;
                            _context8.t0 = _context8["catch"](5);
                            console.error(_context8.t0);
                            res.status(500).send("Internal Server Error");
                          case 33:
                          case "end":
                            return _context8.stop();
                        }
                    },
                    _callee8,
                    null,
                    [[5, 29]],
                  );
                },
              ),
            );
            return function (_x16, _x17) {
              return _ref8.apply(this, arguments);
            };
          })(),
        );

        //login
        router.post(
          "/edulog",
          passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
          }),
          /*#__PURE__*/ (function () {
            var _ref9 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee9(request, response) {
                  var user;
                  return _regeneratorRuntime().wrap(function _callee9$(
                    _context9,
                  ) {
                    while (1)
                      switch ((_context9.prev = _context9.next)) {
                        case 0:
                          _context9.next = 2;
                          return User.findByPk(request.user.id);
                        case 2:
                          user = _context9.sent;
                          if (!(user.role === "e")) {
                            _context9.next = 8;
                            break;
                          }
                          console.log("Educator login successful");
                          response.redirect("/educator");
                          _context9.next = 10;
                          break;
                        case 8:
                          request.flash("error", "You are not an educator");
                          return _context9.abrupt(
                            "return",
                            response.redirect("/"),
                          );
                        case 10:
                        case "end":
                          return _context9.stop();
                      }
                  }, _callee9);
                },
              ),
            );
            return function (_x18, _x19) {
              return _ref9.apply(this, arguments);
            };
          })(),
        );
        router.post(
          "/stulog",
          passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
          }),
          /*#__PURE__*/ (function () {
            var _ref10 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee10(request, response) {
                  var user;
                  return _regeneratorRuntime().wrap(function _callee10$(
                    _context10,
                  ) {
                    while (1)
                      switch ((_context10.prev = _context10.next)) {
                        case 0:
                          _context10.next = 2;
                          return User.findByPk(request.user.id);
                        case 2:
                          user = _context10.sent;
                          if (!(user.role === "s")) {
                            _context10.next = 8;
                            break;
                          }
                          console.log("Student login successful");
                          response.redirect("/student");
                          _context10.next = 10;
                          break;
                        case 8:
                          request.flash("error", "You are not a student");
                          return _context10.abrupt(
                            "return",
                            response.redirect("/"),
                          );
                        case 10:
                        case "end":
                          return _context10.stop();
                      }
                  }, _callee10);
                },
              ),
            );
            return function (_x20, _x21) {
              return _ref10.apply(this, arguments);
            };
          })(),
        );
        router.post(
          "/educator",
          /*#__PURE__*/ (function () {
            var _ref11 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee11(request, response) {
                  var hashpwd, educator;
                  return _regeneratorRuntime().wrap(
                    function _callee11$(_context11) {
                      while (1)
                        switch ((_context11.prev = _context11.next)) {
                          case 0:
                            console.log("Creating an educator");
                            _context11.next = 3;
                            return bcrypt.hash(request.body.edupwd, saltRounds);
                          case 3:
                            hashpwd = _context11.sent;
                            _context11.prev = 4;
                            _context11.next = 7;
                            return User.create({
                              name: request.body.eduname,
                              email: request.body.eduemail,
                              password: hashpwd,
                              role: "e",
                            });
                          case 7:
                            educator = _context11.sent;
                            //const eduId = educator.id;
                            request.login(educator, function (error) {
                              if (error) {
                                console.log(error);
                              }
                              response.redirect("/educator");
                            });
                            _context11.next = 16;
                            break;
                          case 11:
                            _context11.prev = 11;
                            _context11.t0 = _context11["catch"](4);
                            console.error(_context11.t0);
                            request.flash(
                              "error",
                              "E-mail provided is already in use!",
                            );
                            response.redirect("/edusignup");
                          case 16:
                          case "end":
                            return _context11.stop();
                        }
                    },
                    _callee11,
                    null,
                    [[4, 11]],
                  );
                },
              ),
            );
            return function (_x22, _x23) {
              return _ref11.apply(this, arguments);
            };
          })(),
        );
        router.post(
          "/student",
          /*#__PURE__*/ (function () {
            var _ref12 = _asyncToGenerator(
              /*#__PURE__*/ _regeneratorRuntime().mark(
                function _callee12(request, response) {
                  var hashpwd, student;
                  return _regeneratorRuntime().wrap(
                    function _callee12$(_context12) {
                      while (1)
                        switch ((_context12.prev = _context12.next)) {
                          case 0:
                            console.log("Creating a student");
                            _context12.next = 3;
                            return bcrypt.hash(request.body.stupwd, saltRounds);
                          case 3:
                            hashpwd = _context12.sent;
                            _context12.prev = 4;
                            _context12.next = 7;
                            return User.create({
                              name: request.body.stuname,
                              email: request.body.stuemail,
                              password: hashpwd,
                              role: "s",
                            });
                          case 7:
                            student = _context12.sent;
                            //const eduId = educator.id;
                            request.login(student, function (error) {
                              if (error) {
                                console.log(error);
                              }
                              response.redirect("/student");
                            });
                            _context12.next = 16;
                            break;
                          case 11:
                            _context12.prev = 11;
                            _context12.t0 = _context12["catch"](4);
                            console.error(_context12.t0);
                            request.flash(
                              "error",
                              "E-mail provided is already in use!",
                            );
                            response.redirect("/stusignup");
                          case 16:
                          case "end":
                            return _context12.stop();
                        }
                    },
                    _callee12,
                    null,
                    [[4, 11]],
                  );
                },
              ),
            );
            return function (_x24, _x25) {
              return _ref12.apply(this, arguments);
            };
          })(),
        );
        module.exports = router;

        /***/
      },

    /***/ "./routes/educator.js":
      /*!****************************!*\
  !*** ./routes/educator.js ***!
  \****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
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
                  ? r.then(
                      callInvokeWithMethodAndArg,
                      callInvokeWithMethodAndArg,
                    )
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
                "throw" === p.type &&
                  ((o = s), (n.method = "throw"), (n.arg = p.arg));
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
              return (
                (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y
              );
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
                      if (!u)
                        throw Error("try statement without catch or finally");
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
                    return (
                      this.complete(r.completion, r.afterLoc),
                      resetTryEntry(r),
                      y
                    );
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
                  (this.delegate = {
                    iterator: values(e),
                    resultName: r,
                    nextLoc: n,
                  }),
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
        var express = __webpack_require__(/*! express */ "express");
        var router = express.Router();
        var connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        var i18n = __webpack_require__(/*! i18n */ "i18n");
        var _require = __webpack_require__(
            /*! ../models */ "./models/index.js",
          ),
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
                  return _regeneratorRuntime().wrap(function _callee$(
                    _context,
                  ) {
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
                  return _regeneratorRuntime().wrap(function _callee3$(
                    _context3,
                  ) {
                    while (1)
                      switch ((_context3.prev = _context3.next)) {
                        case 0:
                          response.render("edu/creation/createcourse", {
                            createCourseTitle: i18n.__("Create new course"),
                            courseNameLabel: i18n.__(
                              "What is the name of the course?",
                            ),
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
                  return _regeneratorRuntime().wrap(function _callee4$(
                    _context4,
                  ) {
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
                  return _regeneratorRuntime().wrap(function _callee5$(
                    _context5,
                  ) {
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
                  return _regeneratorRuntime().wrap(function _callee6$(
                    _context6,
                  ) {
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
                            request.flash(
                              "error",
                              "Course name cannot be empty",
                            );
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

        /***/
      },

    /***/ "./routes/student.js":
      /*!***************************!*\
  !*** ./routes/student.js ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
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
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(t),
                  )
                : ownKeys(Object(t)).forEach(function (r) {
                    Object.defineProperty(
                      e,
                      r,
                      Object.getOwnPropertyDescriptor(t, r),
                    );
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
                  ? r.then(
                      callInvokeWithMethodAndArg,
                      callInvokeWithMethodAndArg,
                    )
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
                "throw" === p.type &&
                  ((o = s), (n.method = "throw"), (n.arg = p.arg));
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
              return (
                (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y
              );
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
                      if (!u)
                        throw Error("try statement without catch or finally");
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
                    return (
                      this.complete(r.completion, r.afterLoc),
                      resetTryEntry(r),
                      y
                    );
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
                  (this.delegate = {
                    iterator: values(e),
                    resultName: r,
                    nextLoc: n,
                  }),
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
        var express = __webpack_require__(/*! express */ "express");
        var router = express.Router();
        var connectEnsureLogin = __webpack_require__(
          /*! connect-ensure-login */ "connect-ensure-login",
        );
        var i18n = __webpack_require__(/*! i18n */ "i18n");
        var _require = __webpack_require__(
            /*! ../models */ "./models/index.js",
          ),
          Course = _require.Course,
          studentcourse = _require.studentcourse,
          Page = _require.Page,
          Chapter = _require.Chapter,
          pagecomp = _require.pagecomp,
          User = _require.User;
        var Sequelize = __webpack_require__(/*! sequelize */ "sequelize");
        var Sentry = __webpack_require__(/*! @sentry/node */ "@sentry/node");
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
                return _regeneratorRuntime().wrap(function _callee10$(
                  _context10,
                ) {
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
                        completionPercentage =
                          (completedPages / totalPages) * 100;
                        return _context10.abrupt(
                          "return",
                          completionPercentage,
                        );
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
                  return _regeneratorRuntime().wrap(function _callee$(
                    _context,
                  ) {
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
                  return _regeneratorRuntime().wrap(function _callee2$(
                    _context2,
                  ) {
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
                            "Educator with id ".concat(
                              course.eduId,
                              " not found",
                            ),
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
                              "Fetching chapters for courseId: ".concat(
                                courseId,
                              ),
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
                              "Educator with id ".concat(
                                course.eduId,
                                " not found",
                              ),
                            );
                          case 17:
                            console.log("Educator found: ".concat(edu.name));

                            // Get the locale from i18n
                            userLocale = i18n.getLocale(); // Get the current locale
                            console.log("Current locale: ".concat(userLocale));

                            // Create a date formatter for the user's locale
                            dateFormatter = new Intl.DateTimeFormat(
                              userLocale,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false, // Set to true for 12-hour format
                              },
                            );
                            console.log(dateFormatter);
                            // Format the createdAt date
                            formattedDate = dateFormatter.format(
                              new Date(course.createdAt),
                            );
                            console.log(
                              "Formatted Date: ".concat(formattedDate),
                            );
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
                              .send(
                                "An error occurred while setting the language.",
                              );
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
                  return _regeneratorRuntime().wrap(function _callee4$(
                    _context4,
                  ) {
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
                                                (_context5.prev =
                                                  _context5.next)
                                              ) {
                                                case 0:
                                                  courseId = course.id; // Replace with the actual studentId
                                                  _context5.next = 3;
                                                  return calculateCompletionPercentage(
                                                    courseId,
                                                    studentId,
                                                  );
                                                case 3:
                                                  completionPercentage =
                                                    _context5.sent;
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
                  return _regeneratorRuntime().wrap(function _callee7$(
                    _context7,
                  ) {
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
                            response.redirect(
                              "/viewencourse/".concat(courseId),
                            );
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
  var app = __webpack_require__(/*! ./app */ "./app.js");
  var PORT = process.env.PORT || 4000;
  app.listen(PORT, function () {
    console.log("Started express server at port 4000");
  });
  /******/
})();
//# sourceMappingURL=bundle.js.map
