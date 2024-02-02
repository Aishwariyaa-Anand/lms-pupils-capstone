const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname,'public')));

const {Course, Chapter, Page, Educator, Student, studentcourse} = require('./models');

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

app.get("/educator", async (request, response) => {
    await Educator.create({
        name: 'abc',
        email: 'abc',
    });
    const courses = await Course.findAll();
    response.render("educator", {
        courses,
    });
});

app.get("/student", async (request, response) => {
    const courses = await Course.findAll();
    await Student.create({
        name: 'abc',
        email: 'abc',
    });
    response.render("student", {
        courses,
    });
});

app.get("/signout", async (request, response) => {
    response.render("index");
});

app.get("/createcourse", async (request, response) => {
    response.render("createcourse");
});

app.get("/newpage/:chapterId", async (request, response) => {
    const chapterId = request.params.chapterId;
    response.render("newpage", { chapterId });
});

app.get("/viewcourse/:courseId", async (request, response) => {
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

app.get("/viewencourse/:courseId", async (request, response) => {
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

app.get("/viewchap/:chapterId", async (request, response) => {
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

app.get("/mycourses", async (request, response) => {
    try {
        const courses = await Course.findAll();

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

app.get("/viewpage/:pageId/:chapterId", async (request, response) => {
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

app.get("/educourse/:courseId", async (request, response) => {
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

app.get("/createchapter/:chapterId", async (request, response) => {
    const chapid = request.params.chapterId;
    const chapter = await Chapter.findByPk(chapid);
    const courseId = chapter.courseId;
    response.render("createchapter", { courseId });
});

app.post("/courses", async (request, response) => {
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

app.post("/courses/:courseId/chapters", async (request, response) => {
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

app.post("/chapters/:chapterId/pages", async (request, response) => {
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

app.post("/enroll/:courseId", async (request, response) => {
    console.log("Enrolling in a course");
    try {
        const courseId = request.params.courseId;
        const course = await Course.findByPk(courseId);
        const edu = await Educator.findByPk(course.eduId);
        const chapters = await Chapter.findAll({
            where: { courseId },
        });
        await Course.isenrolled(course.id);
        await studentcourse.create({
            studentId: 1,
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

app.put("/pages/:pageId/markAsCompleted", async (request, response) => {
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

app.delete("/pages/:pageId", async (request, response) => {
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

app.delete("/chapters/:chapterId", async (request, response) => {
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

app.delete("/courses/:courseId", async (request, response) => {
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