describe('Ver roles y crear uno', function () {

  
    it('Ir a HR Administration User Roles y crear un rol', function () {
  
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

      cy.contains('i.material-icons', 'add', { timeout: 20000 })
        .should('be.visible')
        .parents('a, button')
        .first()
        .click();

  
      // Validar pantalla de creación
      cy.url().should('include', '/admin/add_user_role');
  
      // 4) Llenar el nombre del rol
      const roleName = 'ESS_' + Date.now();
  
      cy.get('#user_role_name')
        .should('be.visible')
        .clear()
        .type(roleName);
  
      // 5) Guardar
      cy.contains(/Save|Guardar|Guard/i)
        .should('be.visible')
        .click();
  
      // Validar creación (puede variar el mensaje, pero normalmente muestra un toast)
      cy.contains(/success|guard/i, { timeout: 15000 }).should('exist');

      // Validar que el nombre del rol aparece en la tabla/lista
      cy.contains(roleName, { timeout: 15000 }).should('be.visible');
    });
  
  });
  