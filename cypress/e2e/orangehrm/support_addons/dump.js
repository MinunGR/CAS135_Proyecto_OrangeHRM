/*Cypress.on('uncaught:exception', (err, runnable) => {
  // Evita que Cypress falle por errores de la página
  return false;
});


describe('Apertura de sitio web', () => {
  it('Carga de pantalla login', () => {
    // Iniciamos la página
    cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/', {
      failOnStatusCode: false
    });

    // Verificamos que exista este titulo, una forma de ver que cargo el form
    cy.contains('Advanced Trial').should('be.visible');

    // Verificamos que el form este cargado:
    cy.get('#frmLogin', { timeout: 15000 }).should('be.visible');
    
    // Llenado del formulario
    cy.get('#txtUsername')
      .should('have.value', 'hamiltonaaron');
    cy.get('#txtPassword')
      .should('have.value', '0KKMAeqq1@p3F');

    // Clic al botón de login
    cy.get('#btnLogin').click();

    // Verificamos que estamos en la página inicial
    cy.contains('Employee Management').should('be.visible');

  });
});*/
