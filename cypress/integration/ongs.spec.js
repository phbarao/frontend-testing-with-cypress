/// <reference types="cypress"/>

describe("Ongs", () => {
  it("should be able to register", () => {
    cy.visit("http://localhost:3000/register");
    // cy.get = find an element
    // .type = insert text
    cy.get("[data-cy=name]").type("Dogs Queridos");
    cy.get("[data-cy=email]").type("dog@teste.com");
    cy.get("[data-cy=whatsapp]").type("42998999898");
    cy.get("[data-cy=city]").type("Ponta Grossa");
    cy.get("[data-cy=state]").type("PR");

    // routing:
    // start server with cy.server()
    // create route with cy.route()
    // assign alias to route
    // wait with cy.wait and validate

    cy.route("POST", "**/ongs").as("postOng");

    cy.get("[data-cy=submit]").click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("should be able to sign in", () => {
    cy.visit("http://localhost:3000");
    cy.get("input").type(Cypress.env("createdOngId"));
    cy.get(".button").click();
  });
});
