// HR-R2: Alta de empleado con datos faltantes (negativo)
describe('RRHH: Alta de empleado con datos faltantes (negativo)', () => {
  it('Debe fallar el ingreso de  un empleado', () => {
    // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
    cy.viewport(1400, 900);

    // Ir al módulo de empleados
    cy.contains('Employee List', { timeout: 25000 }).should('be.visible').click();

    // Esperar que cambie la URL
    cy.url().should('include', '/pim/employees');

    // Botón Add Employee
    cy.get('#addEmployeeButton i.material-icons', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click();

    // Si aparece este texto se asume el formulario ha cargado
    cy.contains('* Required', { timeout: 25000 }).should('be.visible');

    // Creamos variables para almacenar el nombre
    const first_name = "Fernando";
    const middle_name = "José";

    // Agregamos los datos iniciales
    cy.get('#first-name-box').should('be.visible').clear().type(first_name);
    cy.get('#middle-name-box').should('be.visible').clear().type(middle_name);

    // Guardamos los datos del empleado
    cy.get('#modal-save-button')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Confirmamos que los label de Required se hacen presentes
    cy.contains('Required').should('be.visible');

    // Nos aseguramos que el tab de Detalles Personales no se hizo presente (Si existe el test fallá en esta parte)
    cy.get('#personal_details_tab').should('not.exist');

  });

});
