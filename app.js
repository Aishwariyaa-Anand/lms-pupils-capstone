const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
});

app.post("/courses/:coursesId/chapters", async (request, response) => {
    console.log("Creating a chapter for a course");
});

app.post("/chapters/:chapterId/pages", async (request, response) => {
    console.log("Creating a page for a chapter");
});

app.put("pages/:pageId/markAsCompleted", async (request, response) => {
    console.log("Marking a page as completed");
});

app.delete("/pages/:pageId", async (request, response) => {
    console.log("Deleting a page");
});

app.delete("/chapters/:chapterId", async (request, response) => {
    console.log("Deleting a chapter");
});

app.delete("/courses/:courseId", async (request, response) => {
    console.log("Deleting a course");
});

module.exports = app;