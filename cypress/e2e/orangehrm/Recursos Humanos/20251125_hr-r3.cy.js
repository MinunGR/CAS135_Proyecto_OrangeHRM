// HR-R3- Editar datos personales
describe('RRHH – Editar datos personales', () => {
  it('Debe poder editar datos personales sin fallos', () => {
    // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
    cy.viewport(1400, 900);

    // Ir al módulo de empleados
    cy.contains('Employee List', { timeout: 25000 }).should('be.visible').click();

    // Esperar que cambie la URL
    cy.url().should('include', '/pim/employees');

    // Esperamos a que la lista exista
    cy.get('#employeeListTable', { timeout: 15000 }).should('exist');

    // Verifica que hay al menos una fila dentro del <tbody>.
    cy.get('#employeeListTable tbody tr', { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Selecciona la primera fila de la tabla y hace clic en la columna #3.
    cy.get('#employeeListTable tbody tr', { timeout: 15000, waitForAnimations: false })
      .first()
      .find('td:nth-child(3) a')
      .should('be.visible')
      .click();

    // Abrir pestaña Personal Details
    cy.contains('Personal Details', { timeout: 25000 }).should('be.visible').click();

    // Creamos variables para almacenar el nombre
    const first_name = "Nombre Editado";
    const last_name = "Apellido Editado";
    const born_date = "2000-03-26";

    // Editamos algunos campos
    cy.get('#firstName', { timeout: 25000 }).should('be.visible').clear().type(first_name);
    cy.get('#middleName').should('be.visible').clear();
    cy.get('#lastName').should('be.visible').clear().type(last_name);
    cy.get('#emp_birthday').should('be.visible').clear().type(born_date);

    // Guardamos cambios
    cy.get('#pimPersonalDetailsForm button.waves-green').click();

    // Corroboramos que aparezca el mensaje toast de éxito, confirmando que se guardaron los cambios
    cy.get('#toast-container div.toast', { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Successfully Updated');

  });

});
