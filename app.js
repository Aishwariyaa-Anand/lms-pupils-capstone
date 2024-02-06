const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const path = require("path");
app.set("views", path.join(__dirname, "views"));
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const saltRounds= 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: "my-super-secret-key-21728172615261562",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.use('educator', new LocalStrategy({
    usernameField: 'eduemail',
    passwordField: 'edupwd'
}, (email, password, done) => {
    Educator.findOne({ where: { email: email } })
        .then(async (educator) => {
            if (!educator) {
                return done(null, false, { message: "Invalid email" });
            }

            const result = await bcrypt.compare(password, educator.password);
            if (result) {
                return done(null, educator);
            } else {
                return done(null, false, { message: "Invalid password" });
            }
        })
        .catch((error) => {
            return done(error);
        });
}));

// Passport configuration for Student
passport.use('student', new LocalStrategy({
    usernameField: 'stuemail',
    passwordField: 'stupwd'
}, (username, password, done) => {
    Student.findOne({ where: { email: username } })
        .then(async (student) => {
            if (!student) {
                return done(null, false, { message: "Invalid email" });
            }

            const result = await bcrypt.compare(password, student.password);
            if (result) {
                return done(null, student);
            } else {
                return done(null, false, { message: "Invalid password" });
            }
        })
        .catch((error) => {
            return done(error);
        });
}));

passport.serializeUser((user, done) => {
    done(null, { id: user.id, role: user.role }); // Serialize user ID and role
});

passport.deserializeUser((serializedUser, done) => {
    const { id, role } = serializedUser;
    const model = ( role === 'e' ) ? Educator : Student;

    model.findByPk(id)
        .then(user => {
            done(null, user)
        })
        .catch(error => {
            done(error, null)
        });
});

const {Course, Chapter, Page, Educator, Student, studentcourse} = require('./models');

const isEducator = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is an educator
    }
    res.status(403).send('Unauthorized'); // User is not an educator
};

const isStudent = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is a student
    }
    res.status(403).send('Unauthorized'); // User is not a student
};

app.set("view engine", "ejs");

// Example function to calculate completion percentage
async function calculateCompletionPercentage(courseId) {
    const totalPages = await Page.count({
        include: {
            model: Chapter,
            where: { courseId },
        },
    });

    const completedPages = await Page.count({
        include: {
            model: Chapter,
            where: { courseId },
        },
        where: {
            completed: true,
            // Add condition to check studentId
        },
    });

    const completionPercentage = (completedPages / totalPages) * 100;
    return completionPercentage;
}

app.get("/", async (request, response) => {
    console.log("App started");
    response.render("index");
});

app.get("/login", async (request, response) => {
    console.log("abcd");
    response.render("index");
});

app.get("/edusignup", async (request, response) => {
    response.render("edusignup");
});

app.get("/stusignup", async (request, response) => {
    response.render("stusignup");
});

app.get("/educator", connectEnsureLogin.ensureLoggedIn(), isEducator, async (request, response) => {
    const courses = await Course.findAll();
    response.render("educator", {
        courses,
    });
});

app.get("/student", connectEnsureLogin.ensureLoggedIn(), isStudent, async (request, response) => {
    try {
        const studentId = request.user.id;
        const courses = await Course.findAll({
            where: {
                id: {
                    [Sequelize.Op.notIn]: Sequelize.literal(`(
                        SELECT courseId FROM studentcourses WHERE studentId = ${studentId}
                    )`)
                }
            }
        });
        response.render("student", {
            courses,
        });
    } catch(error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/signout", async (request, response, next) => {
    request.logout((error) => {
        if (error){
            return next(error);
        }
        response.redirect("/");
      })
});

app.get("/createcourse", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    response.render("createcourse");
});

app.get("/newpage/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const chapterId = request.params.chapterId;
    response.render("newpage", { chapterId });
});

app.get("/viewcourse/:courseId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const courseId = request.params.courseId;
    const chapters = await Chapter.findAll({
        where: { courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await Educator.findByPk(course.eduId);
    response.render("viewcourse", {
        coursename: course.name,
        courseid: course.id,
        chapters,
        eduname: edu.name,
    })
});

app.get("/viewencourse/:courseId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const courseId = request.params.courseId;
    const chapters = await Chapter.findAll({
        where: { courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await Educator.findByPk(course.eduId);
    response.render("viewencourse", {
        coursename: course.name,
        courseid: course.id,
        chapters,
        eduname: edu.name,
    })
});

app.get("/viewchap/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const chapterId = request.params.chapterId;
    const chaps = await Chapter.findByPk(chapterId);
    const pages = await Page.findAll({
        where: { chapterId },
    });
    response.render("viewchap", {
        chapname: chaps.name,
        chapdesc: chaps.desc,
        pages,
    })
});

app.get("/mycourses", connectEnsureLogin.ensureLoggedIn(), isStudent, async (request, response) => {
    try {
        const studentId = request.user.id; // Assuming the student ID is stored in the user object
        const courses = await Course.findAll({
            include: {
                model: studentcourse,
                where: { studentId: studentId } // Filter by studentId
            }
        });
        // to Calculate progress for each course
        const coursesWithProgress = await Promise.all(
            courses.map(async (course) => {
                const courseId = course.id;
                // Replace with the actual studentId
                const completionPercentage = await calculateCompletionPercentage(courseId);
                return {
                    ...course.toJSON(),
                    completionPercentage,
                };
            })
        );

        response.render("mycourses", {
            courses: coursesWithProgress,
        });
    } catch(error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/viewpage/:pageId/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const pageId = request.params.pageId;
    const chapterId = request.params.chapterId;
    const page = await Page.findByPk(pageId);
    if ((page) && (chapterId == page.chapterId)){
        response.render("viewpage", {
            pagetitle: page.title,
            pagecont: page.content,
            pageid: page.id,
            chap: page.chapterId,
            completed: page.completed,
        })
    } else{
        const courses = await Course.findAll();
        response.render("student", {
            courses,
        })
    }
});

app.get("/educourse/:courseId", connectEnsureLogin.ensureLoggedIn(), isEducator, async (request, response) => {
    const courseId = request.params.courseId;
    const course = await Course.findByPk(courseId);
    const chapters = await Chapter.findAll({
        where: { courseId },
    });
    const pages = await Page.findAll();
    response.render("educourse", {
        coursename: course.name,
        chapters,
        pages,
    });
});

app.get("/createchapter/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const chapid = request.params.chapterId;
    const chapter = await Chapter.findByPk(chapid);
    const courseId = chapter.courseId;
    response.render("createchapter", { courseId });
});

app.post("/edulog", passport.authenticate('educator', {
    failureRedirect: '/login',
    //failureFlash: true 
}), async (request, response) => {
    response.redirect("/educator");
});

app.post("/stulog", passport.authenticate('student', {
    failureRedirect: '/login',
    //failureFlash: true 
}), async (request, response) => {
    console.log("Student login successful");
    response.redirect("/student");
});

app.post("/educator", async (request, response) => {
    console.log("Creating an educator");
    const hashpwd = await bcrypt.hash(request.body.edupwd, saltRounds)
    try {
        const educator = await Educator.create({
            name: request.body.eduname,
            email: request.body.eduemail,
            password: hashpwd,
        });
        const courses = await Course.findAll();
        //const eduId = educator.id;
        request.login(educator, (error) => {
            if (error) {
              console.log(error)
            }
        });
        response.render("educator", {
            courses,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/student", async (request, response) => {
    console.log("Creating a student");
    const hashpwd = await bcrypt.hash(request.body.stupwd, saltRounds)
    try {
        const student = await Student.create({
            name: request.body.stuname,
            email: request.body.stuemail,
            password: hashpwd,
        });
        const courses = await Course.findAll();
        //const eduId = educator.id;
        request.login(student, (error) => {
            if (error) {
              console.log(error)
            }
        });
        response.render("student", {
            courses,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/courses", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    console.log("Creating a course");
    try {
        const createdCourse = await Course.create({
            name: request.body.coursename,
            eduId: 1,
        });
        const courseId = createdCourse.id;
        response.render("createchapter", { courseId });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/courses/:courseId/chapters", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
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
            where: { chapterid },
        });
        response.render("createpage", { chapter, pages });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/chapters/:chapterId/pages", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
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
});

app.post("/enroll/:courseId", connectEnsureLogin.ensureLoggedIn(), isStudent, async (request, response) => {
    console.log("Enrolling in a course");
    try {
        const courseId = request.params.courseId;
        const course = await Course.findByPk(courseId);
        const edu = await Educator.findByPk(course.eduId);
        const chapters = await Chapter.findAll({
            where: { courseId },
        });
        await Course.isenrolled(course.id);
        const studentId = request.user.id;
        await studentcourse.create({
            studentId: studentId,
            courseId: courseId,
        });
        response.render("viewencourse",{
            courseId,
            coursename: course.name,
            eduname: edu.name,
            chapters,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.put("/pages/:pageId/markAsCompleted", connectEnsureLogin.ensureLoggedIn(), isStudent, async (request, response) => {
    console.log("Marking a page as completed");
    const page = await Page.findByPk(request.params.pageId);
    try {
        const markstatus = await page.markcomplete(request.body.completed);
        console.log(request.body.completed);
        response.json(markstatus);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/pages/:pageId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
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
});

app.delete("/chapters/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    console.log("Deleting a chapter");
    try {
        const chapterId = request.params.chapterId;
        const chapter = await Chapter.findByPk(chapterId);
        if (chapter) {
            // Delete the chapter from the database
            await chapter.destroy();
            response.status(200).json({ message: "Chapter deleted successfully" });
        } else {
            response.status(404).json({ error: "Chapter not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/courses/:courseId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    console.log("Deleting a course");
    try {
        const courseId = request.params.courseId;
        const course = await Course.findByPk(courseId);
        if (course) {
            // Delete the course from the database
            await course.destroy();
            response.status(200).json({ message: "Course deleted successfully" });
        } else {
            response.status(404).json({ error: "Course not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;