Cypress.Commands.add("createOng", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3333/ongs",
    body: {
      name: "Ong Massa",
      email: "ong@teste.com",
      whatsapp: "42999998765",
      city: "Ponta Grossa",
      uf: "PR",
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    cy.log(response.body.id);
    Cypress.env("createdOngId", response.body.id);
  });
});

Cypress.Commands.add("createNewIncident", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3333/incidents",
    headers: { Authorization: `${Cypress.env("createdOngId")}` },
    body: {
      title: "Animal faminto",
      description: "Animais precisando de alimento.",
      value: "500",
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    cy.log(response.body.id);

    Cypress.env("createdIncidentId", response.body.id);
  });
});

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3000/profile", {
    onBeforeLoad: (browser) => {
      browser.localStorage.setItem("ongId", Cypress.env("createdOngId"));
      browser.localStorage.setItem("ongName", "Ong Massa");
    },
  });
});
