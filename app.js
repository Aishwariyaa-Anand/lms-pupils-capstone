const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {Course, Chapter, Page} = require('./models');

app.get("/", async (request, response) => {
    console.log("App started");
    response.send("Hello World");
});

app.get("/courses", async (request, response) => {
    console.log("Fetching all courses");
});

app.get("/courses/:courseId", async (request, response) => {
    const courseId = request.params.courseId;
    console.log(`Fetching details for course with ID ${courseId}`);
});

app.get("/courses/:courseId/chapters", async (request, response) => {
    const courseId = request.params.courseId;
    console.log(`Fetching all chapters for course with ID ${courseId}`);
});

app.get("/chapters/:chapterId", async (request, response) => {
    const chapterId = request.params.chapterId;
    console.log(`Fetching details for chapter with ID ${chapterId}`);
});

app.get("/chapters/:chapterId/pages", async (request, response) => {
    const chapterId = request.params.chapterId;
    console.log(`Fetching all pages for chapter with ID ${chapterId}`);
});

app.get("/pages/:pageId", async (request, response) => {
    const pageId = request.params.pageId;
    console.log(`Fetching details for page with ID ${pageId}`);
});

app.post("/courses", async (request, response) => {
    console.log("Creating a course");
    try {
        const { name } = request.body;
        const newCourse = await Course.create({ name });
        response.status(500).json(newCourse);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/courses/:coursesId/chapters", async (request, response) => {
    console.log("Creating a chapter for a course");
    try {
        const courseId = request.params.courseId;
        const { name, desc } = request.body;
        const newChapter = await Chapter.create({ name, desc, courseId });
        response.status(500).json(newChapter);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/chapters/:chapterId/pages", async (request, response) => {
    console.log("Creating a page for a chapter");
    try {
        const chapterId = request.params.chapterId;
        const { title, content } = request.body;
        const newPage = await Page.create({ title, content, chapterId });
        response.status(500).json(newPage);
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