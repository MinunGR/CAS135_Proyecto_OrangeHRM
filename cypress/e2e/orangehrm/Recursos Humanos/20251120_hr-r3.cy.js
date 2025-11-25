// HR-R3- Baja de empleado y cambio de estado.
describe('HHRR – Baja de empleado y cambio de estado', () => {
  it('Debe terminar un empleado correctamente', () => {
    // Cerrar sidebar
    /*cy.get('#sidebar-toggle').click();*/

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

    // Abrir pestaña Job
    cy.contains('Job', { timeout: 25000 }).should('be.visible').click();

    // Abrir dialog de terminación
    cy.contains('Terminate Employment', { timeout: 25000 }).should('be.visible').click();

    // Seleccionamos la razón
    cy.get('#terminate-employment-modal button[data-id="reason"]', { timeout: 15000 }).click();
    cy.get('#terminate-employment-modal li[data-item-id="11"]')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Marcar terminate now
    cy.get('#terminate_now').check({ force: true });

    // Escribimos las notas
    cy.get('#note').clear().type('Finalización de contrato');

    // Seleccionar valor en dropdown
    /*cy.get('#terminate-employment-modal .filter-option-inner-inner', { timeout: 15000 }).click();
    cy.get('#bs-select-1-1')
      .scrollIntoView()
      .should('be.visible')
      .click();*/

    // Hacemos clic al botón de guardado
    cy.get('#modal-save-button', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Detectar notificación de éxito
    cy.get('#toast-container .toast.toast-success', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Successfully Saved');

    // Esperar refresh
    cy.wait(2000);

    // Busca dentro del selector un elemento que contenga el texto
    cy.contains('#employement_details_tab', 'Terminated', { timeout: 15000 })
      .should('be.visible');

  });
});
