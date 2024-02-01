const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const {Course, Chapter, Page} = require('./models');

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
    console.log("App started");
    response.render("index");
});

app.get("/educator", async (request, response) => {
    response.render("educator");
});

app.get("/student", async (request, response) => {
    response.render("student");
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
        const chapterId = createdChapter.id;
        const pages = await Page.findAll({
            where: { chapterId },
        });
        response.render("createpage", { chapterId, pages });
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
        const pages = await Page.findAll({
            where: { chapterId },
        });
        response.render("createpage", { chapterId, pages });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("pages/:pageId/markAsCompleted", async (request, response) => {
    console.log("Marking a page as completed");
    try {
        const pageId = request.params.pageId;
        const { completed } = request.body;
        const page = await Page.findByPk(pageId);
        if (page) {
            // Update the 'completed' status in the database
            await page.update({ completed });
            response.status(200).json({ message: "Page marked as completed" });
        } else {
            response.status(404).json({ error: "Page not found" });
        }
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