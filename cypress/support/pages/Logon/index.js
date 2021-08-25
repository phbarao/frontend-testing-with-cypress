// Ações de interação com a página

const element = require("./elements").ELEMENTS;

class Logon {
  accessLogin() {
    cy.visit("http://localhost:3000");
  }

  fillLogin() {
    cy.get(element.id).type(Cypress.env("createdOngId"));
    cy.get(element.buttonLogin).click();
  }
}

export default new Logon();
