const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const i18n = require("i18n");
const { Course, studentcourse, Page, Chapter, User } = require("../models");

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
      where: { role: "s" },
    });
    const totalStudents = stu.length;

    // Calculate the popularity score for each course based on the enrollment rate
    const courseReports = courses.map((course) => {
      const enrollmentRate = course.studentcourses.length / totalStudents;
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
    response.status(500).json({ error: "Internal Server Error" });
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
      where: { courseId: courseId },
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
    response.render("edu/creation/createchapter", { courseId });
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
      response.render("edu/creation/createchapter", { courseId });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
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
        where: { chapterId: chapterid },
      });
      response.render("edu/creation/createpage", { chapter, pages });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
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
        where: { chapterId },
      });
      response.render("edu/creation/createpage", { chapter, pages });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
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
        response.status(200).json({ message: "Page deleted successfully" });
      } else {
        response.status(404).json({ error: "Page not found" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
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
          where: { courseId: courseId },
        });
        // Delete associated pages
        await Page.destroy({
          where: { chapterId: chapters.map((chapter) => chapter.id) },
        });

        //delete associated chapters
        await Chapter.destroy({ where: { courseId: courseId } });
        await studentcourse.destroy({ where: { courseId: courseId } });
        await course.destroy();
        return response.json({ success: true });
      } else {
        response.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

module.exports = router;
