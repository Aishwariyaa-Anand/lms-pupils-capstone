/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const i18n = require("i18n");
const {
  Course,
  studentcourse,
  Page,
  Chapter,
  pagecomp,
  User,
} = require("../models");
const Sequelize = require("sequelize");
const Sentry = require("@sentry/node");

const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is a student
  }
  res.status(403).send("Unauthorized"); // User is not a student
};

async function calculateCompletionPercentage(courseId, studentId) {
  const totalPages = await Page.count({
    include: {
      model: Chapter,
      where: { courseId },
    },
  });
  console.log("a", totalPages, courseId);

  const completedPages = await pagecomp.count({
    include: [
      {
        model: Page,
        include: {
          model: Chapter,
          where: { courseId },
        },
        required: true, // Ensures that only completed pages are considered
      },
    ],
    where: {
      studentId: studentId,
    },
  });
  console.log("b", completedPages);
  const completionPercentage = (completedPages / totalPages) * 100;
  return completionPercentage;
}

//student
router.get(
  "/student",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const studentId = request.user.id;
    const enrolledCourses = await studentcourse.findAll({
      where: {
        studentId: studentId,
      },
      attributes: ["courseId"],
    });
    const enrolledCourseIds = enrolledCourses.map(
      (enrolledCourse) => enrolledCourse.courseId,
    );
    const courses = await Course.findAll({
      where: {
        id: {
          [Sequelize.Op.notIn]: enrolledCourseIds,
        },
      },
    });
    response.render("stu/student", {
      courses,
      availCourses: i18n.__("Available Courses"),
      myCourses: i18n.__("My courses"),
      viewCourse: i18n.__("View Course"),
      enroll: i18n.__("Enroll"),
    });
  },
);

//viewcourse
router.get(
  "/viewcourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const courseId = request.params.courseId;
    console.log(`Fetching chapters for courseId: ${courseId}`);
    const chapters = await Chapter.findAll({
      where: { courseId: courseId },
    });
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error(`Course with id ${courseId} not found`);
    }
    console.log(`Course found: ${course.name} (ID: ${course.id})`);
    const edu = await User.findByPk(course.eduId);
    if (!edu) {
      throw new Error(`Educator with id ${course.eduId} not found`);
    }
    console.log(`Educator found: ${edu.name}`);

    // Get the locale from i18n
    const userLocale = i18n.getLocale(); // Get the current locale
    console.log(`Current locale: ${userLocale}`);

    // Create a date formatter for the user's locale
    const dateFormatter = new Intl.DateTimeFormat(userLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    });

    // Format the createdAt date
    const formattedDate = dateFormatter.format(new Date(course.createdAt));
    console.log(`Formatted Date: ${formattedDate}`);
    if (!course) {
      return response.status(404).send("Course not found.");
    }
    if (!edu) {
      return response.status(404).send("Educator not found.");
    }
    if (!chapters) {
      return response.status(404).send("Chapters not found.");
    }
    console.log("abc");
    response.render("stu/viewing/viewcourse", {
      coursename: course.name,
      courseid: course.id,
      date: formattedDate,
      chapters,
      eduname: edu.name,
      enrollButton: i18n.__("Enroll"),
      chapterTitle: i18n.__("Chapters"),
    });
  },
);

//viewencourse
router.get(
  "/viewencourse/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    try {
      const courseId = request.params.courseId;
      console.log(`Fetching chapters for courseId: ${courseId}`);
      const chapters = await Chapter.findAll({
        where: { courseId: courseId },
      });
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error(`Course with id ${courseId} not found`);
      }
      console.log(`Course found: ${course.name} (ID: ${course.id})`);
      const edu = await User.findByPk(course.eduId);
      if (!edu) {
        throw new Error(`Educator with id ${course.eduId} not found`);
      }
      console.log(`Educator found: ${edu.name}`);

      // Get the locale from i18n
      const userLocale = i18n.getLocale(); // Get the current locale
      console.log(`Current locale: ${userLocale}`);

      // Create a date formatter for the user's locale
      const dateFormatter = new Intl.DateTimeFormat(userLocale, {
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
      const formattedDate = dateFormatter.format(new Date(course.createdAt));
      console.log(`Formatted Date: ${formattedDate}`);

      response.render("stu/viewing/viewencourse", {
        coursename: course.name,
        courseid: course.id,
        date: formattedDate,
        chapters,
        eduname: edu.name,
        chapterTitle: i18n.__("Chapters"),
      });
    } catch (err) {
      // Capture the error in Sentry
      Sentry.captureException(err);
      console.error(`Error: ${err.message}`, err);
      response
        .status(500)
        .send("An error occurred while setting the language.");
    }
  },
);

//viewchap
router.get(
  "/viewchap/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const chapterId = request.params.chapterId;
    const chaps = await Chapter.findByPk(chapterId);
    const pages = await Page.findAll({
      where: { chapterId: chapterId },
    });
    response.render("stu/viewing/viewchap", {
      chapname: chaps.name,
      chapdesc: chaps.desc,
      pages,
    });
  },
);

//mycourses
router.get(
  "/mycourses",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    try {
      const studentId = request.user.id; // Assuming the student ID is stored in the user object
      const courses = await Course.findAll({
        include: {
          model: studentcourse,
          where: { studentId: studentId }, // Filter by studentId
        },
      });
      // to Calculate progress for each course
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          const courseId = course.id;
          // Replace with the actual studentId
          const completionPercentage = await calculateCompletionPercentage(
            courseId,
            studentId,
          );
          return {
            ...course.toJSON(),
            completionPercentage,
          };
        }),
      );

      response.render("stu/mycourses", {
        courses: coursesWithProgress,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

//viewpage
router.get(
  "/viewpage/:pageId/:chapterId",
  connectEnsureLogin.ensureLoggedIn(),
  async (request, response) => {
    const pageId = request.params.pageId;
    const chapterId = request.params.chapterId;
    const page = await Page.findByPk(pageId);

    if (page && chapterId == page.chapterId) {
      const studentId = request.user.id;
      const pageCompletion = await pagecomp.findOne({
        where: {
          pageId: page.id,
          studentId: studentId,
        },
      });
      response.render("stu/viewing/viewpage", {
        pagetitle: page.title,
        pagecont: page.content,
        pageid: page.id,
        chap: page.chapterId,
        completed: pageCompletion ? true : false,
      });
    } else {
      response.redirect("/student");
    }
  },
);

//enrollcourse
router.post(
  "/enroll/:courseId",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
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
      response.redirect(`/viewencourse/${courseId}`);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

//mark as completed
router.put(
  "/pages/:pageId/markAsCompleted",
  connectEnsureLogin.ensureLoggedIn(),
  isUser,
  async (request, response) => {
    console.log("Marking a page as completed");
    const page = await Page.findByPk(request.params.pageId);
    try {
      const markstatus = await page.markcomplete(request.body.completed);
      await pagecomp.create({
        pageId: page.id,
        studentId: request.user.id,
      });
      console.log(request.body.completed);
      response.json(markstatus);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  },
);

module.exports = router;
