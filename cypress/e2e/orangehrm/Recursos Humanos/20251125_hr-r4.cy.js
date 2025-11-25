// HR-R4- Modificar datos laborales (puesto/departamento)
describe('RRHH – Modificar datos laborales (puesto/departamento)', () => {
  it('Debe poder editar datos laborales sin fallos', () => {
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

    // Cambiamos el trabajo que realiza 
    cy.get('#employement_details_tab button[data-id="job_category_id"]', { timeout: 25000 })
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get('.oxd-dropdown-menu li') 
      .should('be.visible') // Esperamos a que el menú aparezca
      .eq(2) // Seleccionamos el tercer elemento (índice 2)
      .click({ force: true });

    // Cambiamos el departamento al que pertenece
    cy.get('#employement_details_tab button[data-id="subunit_id"]')
      .should('be.visible')
      .click();
    cy.get('.oxd-dropdown-menu li') 
      .should('be.visible') // Esperamos a que el menú aparezca
      .eq(2) // Seleccionamos el tercer elemento (índice 2)
      .click({ force: true });

    // Guardamos cambios
    cy.get('a[ng-click*="onSubmitEmploymentDetails"]')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();

    // Nos aparecera un modal de confirmación

    // Corroboramos que el titulo del dialog aparezca
    cy.contains('Employment Details - Confirm Changes').should('be.visible');

    // Acá seleccionamos el motivo de los cambios
    cy.get('button[data-id="event"]', { timeout: 15000 })
      .should('be.visible')
      .click();
    cy.get('.oxd-dropdown-menu li') 
      .should('be.visible') // Esperamos a que el menú aparezca
      .eq(3) // Seleccionamos el tercer elemento (índice 2)
      .click({ force: true });

    // Hacemos clic al botón Confirmar
    cy.get('#modal-save-button')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();
  });

});
