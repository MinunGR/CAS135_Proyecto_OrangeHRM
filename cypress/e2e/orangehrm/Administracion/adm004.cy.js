describe('Bloquear usuario', () => {
  it('bloquea un usuario desde la tabla de System Users', () => {
    cy.viewport(1009, 873);

    // Asume que ya estás autenticado o que tu sesión está activa por cookies
    cy.contains(' Administra', { timeout: 25000 }).should('be.visible').click();

    // Verificar que estamos en la pantalla correcta
    cy.url().should('include', '/admin/systemUsers');


    cy.get('td.edit_item[data-tooltip="Edit"]', { timeout: 60000 }).first().click();
    cy.contains(' Disabled', { timeout: 25000 }).should('be.visible').click();



    // // Seleccionar el checkbox de la fila 4 de la tabla
    // cy.get('tr:nth-of-type(4) label')
    //   .should('be.visible')
    //   .click();

    // // Click en el ícono de editar de la fila seleccionada
    // cy.get('tr.grey i')
    //   .should('be.visible')
    //   .click();

    // Guardar cambios en el modal (por ejemplo, bloquear/cambiar estado)
    //cy.contains(' Save', { timeout: 25000 }).should('be.visible').click();
    cy.get('button#modal-save-button.btn.btn-secondary', { timeout: 10000 })
      .should('exist')
      .click({ force: true });

  });
});
