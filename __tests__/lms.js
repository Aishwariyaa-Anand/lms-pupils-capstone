const request = require('supertest');

const app = require('../app');
const db = require('../models/index');

let server, agent;

describe('Learning Management System', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        server = app.listen(4000, () => {});
        agent = request.agent(server);
    });
      
    afterAll(async () => {
        try {
            await db.sequelize.close();
            await server.close();
        } catch (error) {
            console.log(error);
        }
    });

    test("Creates a course", async () => {
        //create course code
        const response = await agent.post("/courses").send({
            name: "Basic Mathematics",
        });
        expect(response.statusCode).toBe(201);
    });
    
    test("Creates a chapter for a course", async () => {
        //chapter creation code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const response = await agent.post("/courses/${course.id}/chapters").send({
            name: "1: Playing with Numbers",
            desc: "Introduction to Numbers: Natural numbers, whole numbers, integers, rational numbers, and real numbers."
        });
        expect(response.statusCode).toBe(201);
    });
    
    test("Creates a page for a chapter", async () => {
        //page creation code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const chapter = await db.Chapter.create({ name: "1: Playing with Numbers", desc: "Introduction to Numbers: Natural numbers, whole numbers, integers, rational numbers, and real numbers.", courseId: course.id, });
        const response = await agent.post("/chapters/${chapter.id}/pages").send({
            title: "Natural Number",
            content: "Natural numbers are a set of positive integers starting from 1 and extending indefinitely, used for counting and ordering.",
        });
        expect(response.statusCode).toBe(201);
    });
    
    test("Marks a page as completed", async () => {
        //mark as completed code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const chapter = await db.Chapter.create({ name: "1: Playing with Numbers", desc: "Introduction to Numbers: Natural numbers, whole numbers, integers, rational numbers, and real numbers.", courseId: course.id, });
        const page = await db.Page.create({ title: "Natural Number", content: "Natural numbers are a set of positive integers starting from 1 and extending indefinitely, used for counting and ordering.", chapterId: chapter.id });
        const response = await agent.put('pages/${page.id}/markAsCompleted').send({ completed: true });
        expect(response.statusCode).toBe(201);
    });
    
    test("Deletes a page", async () => {
        //page deletion code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const chapter = await db.Chapter.create({ name: "1: Playing with Numbers", desc: "Introduction to Numbers: Natural numbers, whole numbers, integers, rational numbers, and real numbers.", courseId: course.id, });
        const page = await db.Page.create({ title: "Natural Number", content: "Natural numbers are a set of positive integers starting from 1 and extending indefinitely, used for counting and ordering.", chapterId: chapter.id });
        const response = await agent.delete('/pages/${page.id}');
        expect(response.statusCode).toBe(201);
        
        const deleted = await db.Page.findByPk(page.id);
        expect(deleted).toBeNull();
    });
    
    test("Deletes a chapter", async () => {
        //chapter deletion code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const chapter = await db.Chapter.create({ name: "1: Playing with Numbers", desc: "Introduction to Numbers: Natural numbers, whole numbers, integers, rational numbers, and real numbers.", courseId: course.id, });
        const response = await agent.delete('/chapters/${chapter.id}');
        expect(response.statusCode).toBe(201);
        
        const deleted = await db.Chapter.findByPk(chapter.id);
        expect(deleted).toBeNull();
    });
    
    test("Deletes a course", async () => {
        //course deletion code
        const course = await db.Course.create({ name: "Basic Mathematics", });
        const response = await agent.delete('/courses/${course.id}');
        expect(response.statusCode).toBe(201);

        const deleted = await db.Course.findByPk(course.id);
        expect(deleted).toBeNull();
    });
});