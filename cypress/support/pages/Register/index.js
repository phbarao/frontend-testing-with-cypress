const elements = require("./elements").ELEMENTS;

class Register {
  accessRegister() {
    cy.visit("http://localhost:3000/register");
  }

  fillRegister() {
    cy.get(elements.name).type("Dogs Queridos");
    cy.get(elements.email).type("dog@teste.com");
    cy.get(elements.whatsapp).type("42998999898");
    cy.get(elements.city).type("Ponta Grossa");
    cy.get(elements.state).type("PR");

    cy.route("POST", "**/ongs").as("postOng");

    cy.get(elements.submit).click();
  }

  validateRegisterSuccess() {
    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new Register();
