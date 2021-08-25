const elements = require("./elements").ELEMENTS;

class newIncident {
  fillNewIncident() {
    cy.get(elements.title).type("Animal abandonado");
    cy.get(elements.description).type("Animais precisando de apoio.");
    cy.get(elements.value).type(200);

    cy.route("POST", "**/incidents").as("newIncident");

    cy.get(elements.buttonSave).click();
  }

  validateNewIncident() {
    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new newIncident();
