// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Ignorar errores JS del sitio
Cypress.on('uncaught:exception', () => false);

// Comando personalizado de login
Cypress.Commands.add('login', () => {
  // Iniciamos la página
  cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/', {
    failOnStatusCode: false
  });
  // Verificamos que exista este titulo, una forma de ver que cargo el form
  cy.contains('Advanced Trial').should('be.visible');

  // Verificamos que el form este cargado
  cy.get('#frmLogin', { timeout: 15000 }).should('be.visible');

  // Llenado del formulario

  cy.get('#txtUsername').clear().type('hamiltonaaron');
  cy.get('#txtPassword').clear().type('0KKMAeqq1@p3F');

  // Clic al botón de login
  cy.get('#btnLogin').click();

  // Verificamos que estamos en la página inicial
});
