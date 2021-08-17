/// <reference types="cypress"/>

describe("Ongs", () => {
  it("should be able to register", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("[data-cy=name]").type("Dogs Queridos");
    cy.get("[data-cy=email]").type("dog@teste.com");
    cy.get("[data-cy=whatsapp]").type("42998999898");
    cy.get("[data-cy=city]").type("Ponta Grossa");
    cy.get("[data-cy=state]").type("PR");

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

    cy.get("[data-cy=id]").type(Cypress.env("createdOngId"));
    cy.get("[data-cy=button-login]").click();
  });

  it("sould be able to sign out", () => {
    cy.login();

    cy.get("[data-cy=button-sign-out]").click();
  });

  it("should be able to create new cases", () => {
    cy.login();

    cy.get("[data-cy=button-new-incident]").click();
    cy.get("[data-cy=title]").type("Animal abandonado");
    cy.get("[data-cy=description]").type("Animais precisando de apoio.");
    cy.get("[data-cy=value]").type(200);

    cy.route("POST", "**/incidents").as("newIncident");

    cy.get("[data-cy=button-save]").click();

    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("should be able to remove a case", () => {
    cy.createNewIncident();
    cy.login();

    cy.route("DELETE", "**/incidents/*").as("deleteIncident");

    cy.get("[data-cy=button-delete]").click();

    cy.wait("@deleteIncident").then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.response.body).to.be.empty;
    });
  });
});
