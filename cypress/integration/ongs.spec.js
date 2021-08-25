/// <reference types="cypress"/>

import Logon from "../support/pages/Logon";
import Register from "../support/pages/Register";
import Profile from "../support/pages/Profile";
import NewIncident from "../support/pages/NewIncident";

describe("Ongs", () => {
  it("should be able to register", () => {
    Register.accessRegister();
    Register.fillRegister();
    Register.validateRegisterSuccess();
  });

  it("should be able to sign in", () => {
    Logon.accessLogin();
    Logon.fillLogin();
  });

  it("sould be able to sign out", () => {
    cy.login();

    Profile.logoutButtonClick();
  });

  it("should be able to create new cases", () => {
    cy.login();

    Profile.createNewIncidentButtonClick();

    NewIncident.fillNewIncident();
    NewIncident.validateNewIncident();
  });

  it("should be able to remove a case", () => {
    cy.createNewIncident();
    cy.login();

    Profile.removeIncidentButtonClick();
    Profile.validateRemoveIncidentSuccess();
  });
});
