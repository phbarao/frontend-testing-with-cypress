const elements = require("./elements").ELEMENTS;

class Profile {
  logoutButtonClick() {
    cy.get(elements.logoutButton).click();
  }

  createNewIncidentButtonClick() {
    cy.get(elements.createNewIncidentButton).click();
  }

  removeIncidentButtonClick() {
    cy.route("DELETE", "**/incidents/*").as("deleteIncident");

    cy.get(elements.buttonRemove).click();
  }

  validateRemoveIncidentSuccess() {
    cy.wait("@deleteIncident").then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.response.body).to.be.empty;
    });
  }
}

export default new Profile();
