describe('Crear usuario y asignar rol', function () {

    it('Crea un rol y luego crea un usuario asignándole ese rol', function () {
  
      cy.viewport(1400, 900);
  
      // 1) Ir a Administración / HR Administration
      cy.contains(' Administra', { timeout: 25000 })
        .should('be.visible')
        .click();
  
      // Validar que estamos en la página de System Users
      cy.url().should('include', '/admin/systemUsers');
  
      // 2) Ir al menú "User Roles" (ajusta si es otro menú)
      cy.get('a[data-automation-id="menu_admin_viewSystemUsers"]', { timeout: 20000 })
        .should('be.visible')
    
      cy.contains(/Role/i, { timeout: 20000 }).should('be.visible');
  
      // 3) Click en botón ADD para crear rol
      cy.contains('i.material-icons', 'add', { timeout: 20000 })
        .should('be.visible')
        .parents('a, button')
        .first()
        .click();
      cy.get('#selectedEmployee_value', { timeout: 20000 })
        .should('be.visible');
      cy.contains('Add', { timeout: 15000 }).should('exist');

      // 4.1 Seleccionar empleado en el autocomplete
      cy.get('#selectedEmployee_value')
        .clear()
        .type('Peter'); // ajusta el nombre que exista
  
      cy.contains('.angucomplete-row, .angucomplete-title, li, div', 'Peter', { timeout: 20000 })
        .first()
        .click();
  
      // 4.2 Escribir nombre de usuario
      cy.get('#user_name')
        .should('be.visible')
        .clear()
        .type('user_1764093094646');
      
      cy.get('#password')          // selecciona el input por id
        .should('be.visible')      // opcional: valida que se vea
        .clear()                   // opcional: limpia si tiene algo
        .type('H0l4.345Si');       // escribe la contraseña

      cy.get('#confirmpassword')          // selecciona el input por id
        .should('be.visible')      // opcional: valida que se vea
        .clear()                   // opcional: limpia si tiene algo
        .type('H0l4.345Si');    

      // 4.4 Guardar usuario
      cy.contains(/Save|Guardar|Guard/i)
        .should('be.visible')
        .click();
      // ===============================
      // 5) VALIDACIONES
      
      // Toast / mensaje de éxito
      cy.contains(/Save|guardado|creado/i, { timeout: 15000 })
        .should('exist');
  
      // Validar que seguimos / volvemos a la tabla de usuarios
      cy.url().should('include', '/admin/systemUsers');
    

     });
  });
  