// cypress/integration/auth_spec.js

describe("Authentication Tests", () => {
  it("should allow educator to log in", () => {
    cy.visit("http://localhost:4000");
    cy.get("a").eq(0).click({ force: true });
    cy.url().should("include", "/edusignup");
    cy.get('input[name="eduname"]').type("edu");
    cy.get('input[name="eduemail"]').type("edu@gmail.com");
    cy.get('input[name="edupwd"]').type("edu");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/educator");
  });

  it("should allow student to log in", () => {
    cy.visit("http://localhost:4000");
    cy.get("a").eq(1).click({ force: true });
    cy.url().should("include", "/stusignup");
    cy.get('input[name="stuname"]').type("stu");
    cy.get('input[name="stuemail"]').type("stu@gmail.com");
    cy.get('input[name="stupwd"]').type("stu");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/student");
  });
});
