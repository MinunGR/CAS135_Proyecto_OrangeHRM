describe('Bloquear usuario', () => {
  it('bloquea un usuario desde la tabla de System Users', () => {
    cy.viewport(1009, 873);

    // Asume que ya estás autenticado o que tu sesión está activa por cookies
    cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/admin/systemUsers');

    // Verificar que estamos en la pantalla correcta
    cy.url().should('include', '/admin/systemUsers');

    // Seleccionar el checkbox de la fila 4 de la tabla
    cy.get('tr:nth-of-type(4) label')
      .should('be.visible')
      .click();

    // Click en el ícono de editar de la fila seleccionada
    cy.get('tr.grey i')
      .should('be.visible')
      .click();

    // Guardar cambios en el modal (por ejemplo, bloquear/cambiar estado)
    cy.get('#modal-save-button')
      .should('be.visible')
      .click();

    // Validar que hubo algún mensaje de éxito (ajusta el texto si es diferente)
    cy.contains(/success|saved|guardado|creado/i, { timeout: 10000 })
      .should('exist');
  });
});
