const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const path = require("path");
app.set("views", path.join(__dirname, "views"));
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const session = require('express-session');
const flash = require("connect-flash");
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
app.use(flash());
app.use(function(request, response, next) {
    response.locals.messages = request.flash();
    next();
});
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
}, (username, password, done) => {
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
}));

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user ID and role
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            done(null, user)
        })
        .catch(error => {
            done(error, null)
        });
});

const {Course, Chapter, Page, User, studentcourse, pagecomp} = require('./models');

const isUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is a student
    }
    res.status(403).send('Unauthorized'); // User is not a student
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
    console.log('a',totalPages,courseId)

    const completedPages = await pagecomp.count({
        include: {
            model: Page,
            include: {
                model: Chapter,
                where: { courseId },
            },
        },
        where: {
            '$page.chapter.courseId$': courseId,
            studentId: studentId,
        },
    });
    console.log('b',completedPages)
    const completionPercentage = (completedPages / totalPages) * 100;
    return completionPercentage;
}

app.get("/", async (request, response) => {
    console.log("App started");
    response.render("index");
});

app.get("/login", async (request, response) => {
    response.render("index");
});

app.get("/edusignup", async (request, response) => {
    response.render("edusignup");
});

app.get("/stusignup", async (request, response) => {
    response.render("stusignup");
});

app.get("/educator", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const courses = await Course.findAll({
        where: {
            eduId: request.user.id
        }
    });
    response.render("educator", {
        courses,
    });
});

app.get("/student", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const studentId = request.user.id;
    const enrolledCourses = await studentcourse.findAll({
        where: {
            studentId: studentId
        },
        attributes: ['courseId']
    });
    const enrolledCourseIds = enrolledCourses.map(enrolledCourse => enrolledCourse.courseId);
    const courses = await Course.findAll({
        where: {
            id: {
                [Sequelize.Op.notIn]: enrolledCourseIds
            }
        }
    });
    response.render("student", {
        courses,
    });
});

app.get("/changepassedu", async (request, response) => {
    const userid = request.user.id;
    const user = await User.findByPk(userid);
    response.render("changepass", { user, role:"e" })
})

app.get("/changepassstu", async (request, response) => {
    const userid = request.user.id;
    const user = await User.findByPk(userid);
    response.render("changepass", { user, role:"s" })
})

app.get("/viewreports", isUser, async (request, response) => {
    try {
        const educatorId = request.user.id;
        const courses = await Course.findAll({
            where: {
                eduId: educatorId
            },
            include: [{
                model: studentcourse,
                attributes: ['studentId']
            }]
        });
        console.log(educatorId);
        //total number of students enrolled
        const stu = await User.findAll({
            where: { role: 's' }
        });
        const totalStudents = stu.length

        // Calculate the popularity score for each course based on the enrollment rate
        const courseReports = courses.map(course => {
            const enrollmentRate = course.studentcourses.length / totalStudents;
            // Adjust the score as needed, e.g., multiplying by a factor to make the numbers more readable
            const popularityScore = enrollmentRate * 100;
            return {
                courseId: course.id,
                courseName: course.name,
                totalStudents: course.studentcourses.length,
                popularityScore: popularityScore.toFixed(2) // Round the score to 2 decimal places
            };
        });

        // Sort the courseReports by popularity score in descending order
        courseReports.sort((a, b) => b.popularityScore - a.popularityScore);

        response.render("viewreport", {
            courseReports
        });
    } catch(error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

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
        where: { courseId: courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await User.findByPk(course.eduId);
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
        where: { courseId: courseId },
    });
    const course = await Course.findByPk(courseId);
    console.log(course.id);
    const edu = await User.findByPk(course.eduId);
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
        where: { chapterId: chapterId },
    });
    response.render("viewchap", {
        chapname: chaps.name,
        chapdesc: chaps.desc,
        pages,
    })
});

app.get("/mycourses", connectEnsureLogin.ensureLoggedIn(), isUser, async (request, response) => {
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
                const completionPercentage = await calculateCompletionPercentage(courseId, studentId);
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
        const studentId = request.user.id; 
        const pageCompletion = await pagecomp.findOne({
            where: {
                pageId: page.id,
                studentId: studentId
            }
        });
        response.render("viewpage", {
            pagetitle: page.title,
            pagecont: page.content,
            pageid: page.id,
            chap: page.chapterId,
            completed: pageCompletion ? true : false,
        })
    } else{
        response.redirect("/student");
        
    }
});

app.get("/educourse/:courseId", connectEnsureLogin.ensureLoggedIn(), isUser, async (request, response) => {
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
});

app.get("/createchapter/:chapterId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    const chapid = request.params.chapterId;
    const chapter = await Chapter.findByPk(chapid);
    const courseId = chapter.courseId;
    response.render("createchapter", { courseId });
});

app.post("/edulog", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true 
}), async (request, response) => {
    const user = await User.findByPk(request.user.id);
    if (user.role === 'e'){
        console.log("Educator login successful");
        response.redirect("/educator");
    }
    else {
        request.flash("error", "You are not an educator");
        return response.redirect("/");
    }
});

app.post("/stulog", passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true 
}), async (request, response) => {
    const user = await User.findByPk(request.user.id);
    if (user.role === 's'){
        console.log("Student login successful");
        response.redirect("/student");
    }
    else {
        request.flash("error", "You are not a student");
        return response.redirect("/");
    }
});

app.post("/educator", async (request, response) => {
    console.log("Creating an educator");
    const hashpwd = await bcrypt.hash(request.body.edupwd, saltRounds)
    try {
        const educator = await User.create({
            name: request.body.eduname,
            email: request.body.eduemail,
            password: hashpwd,
            role: 'e'
        });
        //const eduId = educator.id;
        request.login(educator, (error) => {
            if (error) {
              console.log(error)
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
    const hashpwd = await bcrypt.hash(request.body.stupwd, saltRounds)
    try {
        const student = await User.create({
            name: request.body.stuname,
            email: request.body.stuemail,
            password: hashpwd,
            role: 's'
        });
        //const eduId = educator.id;
        request.login(student, (error) => {
            if (error) {
              console.log(error)
            }
            response.redirect("/student")
        });
    } catch (error) {
        console.error(error);
        request.flash("error", "E-mail provided is already in use!");
        response.redirect("/stusignup");
    }
});

app.post('/change-password/:role', async (req, res) => {
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

            if (req.params.role === 'e'){
                // Redirect the user to a success page or send a success response
                res.redirect('/educator');
            } else {
                res.redirect('/student');
            }

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/courses", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
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
            where: { chapterId: chapterid },
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

app.post("/enroll/:courseId", connectEnsureLogin.ensureLoggedIn(), isUser, async (request, response) => {
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

app.put("/pages/:pageId/markAsCompleted", connectEnsureLogin.ensureLoggedIn(), isUser, async (request, response) => {
    console.log("Marking a page as completed");
    const page = await Page.findByPk(request.params.pageId);
    try {
        const markstatus = await page.markcomplete(request.body.completed);
        await pagecomp.create({
            pageId: page.id,
            studentId: request.user.id,
        })
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
});

app.delete("/courses/:courseId", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
    console.log("Deleting a course");
    try {
        const courseId = request.params.courseId;
        const course = await Course.findByPk(courseId);
        if (course) {
            // Delete the course from the database
            const chapters = await Chapter.findAll({ where: { courseId: courseId } });
            // Delete associated pages
            await Page.destroy({ where: { chapterId: chapters.map(chapter => chapter.id) } });

            //delete associated chapters
            await Chapter.destroy({ where: { courseId: courseId } });
            await studentcourse.destroy({ where: { courseId: courseId}});
            await course.destroy();
            return response.json({ success: true });
        } else {
            response.status(404).json({ error: "Course not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;
