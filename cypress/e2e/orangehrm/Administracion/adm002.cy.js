describe('Editar rol y ampliar permisos ', function () {

  
    it('Ir a HR Administration User Roles y editar un rol', function () {
  
      cy.viewport(1400, 900);

        // Ir al módulo de empleados
      //cy.contains('HR Administration', { timeout: 25000 }).should('be.visible').click();
      cy.contains(' Administra', { timeout: 25000 }).should('be.visible').click();
  
      // Validar que estamos en HR Administration
      cy.url().should('include', '/admin/systemUsers');
  
      // 2) Ir al menú "User Roles"
      cy.get('a[data-automation-id="menu_admin_viewUserRoles"]', { timeout: 20000 })
        .should('be.visible')
        .click();
  
      // Validar URL User Roles
      cy.url().should('include', '/admin/user_roles');
      cy.contains(/Role/i, { timeout: 20000 }).should('be.visible');


      cy.contains('th', 'User Role', { timeout: 20000 }).should('be.visible');

      cy.contains(/Role/i, { timeout: 20000 }).should('be.visible'); // cabecera lista

    // Buscar cualquier rol que empiece por ESS_
      cy.contains('span', /^ESS_/i, { timeout: 20000 })
        .scrollIntoView()
        .should('be.visible')
        .click();


      cy.get('label[for="Leave"]')
        .should('be.visible')
        .click();

      cy.contains('Save')
        .should('be.visible')
        .click();
  
      // Validar creación (puede variar el mensaje, pero normalmente muestra un toast)
      cy.contains(/success|guard/i, { timeout: 15000 }).should('exist');

      // Validar que el nombre del rol aparece en la tabla/lista
    });
  
  });
  