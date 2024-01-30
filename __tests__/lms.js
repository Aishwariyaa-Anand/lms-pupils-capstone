const request = require('supertest');

const app = require('../app');
const db = require('../models/index');

let server, agent;

describe('Learning Management System', () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        server = app.listen(3000, () => {});
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
});

test("Creates a course", async () => {
    //create course code
});

test("Creates a chapter for a course", async () => {
    //chapter creation code
});

test("Creates a page for a chapter", async () => {
    //page creation code
});

test("Marks a page as completed", async () => {
    //mark as completed code
});

test("Deletes a page", async () => {
    //page deletion code
});

test("Deletes a chapter", async () => {
    //chapter deletion code
});

test("Deletes a course", async () => {
    //course deletion code
});