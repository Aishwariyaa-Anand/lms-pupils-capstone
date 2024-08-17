// cypress/integration/course_spec.js

describe("Course Management Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
    // Log in as educator
    cy.get("body").should("be.visible");

    // Log in as educator
    cy.get("h3")
      .contains("Sign in as Educator")
      .parents("td")
      .find("form")
      .within(() => {
        cy.get('input[name="email"]').type("edu@gmail.com");
        cy.get('input[name="pwd"]').type("edu");
        cy.get('button[type="submit"]').click();
      });
    cy.url().should("include", "/educator");
  });

  it("should create a new course", () => {
    cy.visit("http://localhost:4000/createcourse");
    cy.get("body").then((body) => {
      console.log(body.html());
    });
    // Fill the form and submit
    cy.get('input[name="coursename"]').type("New Course");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/courses");
  });

  it("should delete a course", () => {
    cy.visit("http://localhost:4000/educator");
    cy.get(".card")
      .first()
      .within(() => {
        cy.get("a").eq(1).click({ force: true }); // Adjust selector if needed
      });
  });
});
