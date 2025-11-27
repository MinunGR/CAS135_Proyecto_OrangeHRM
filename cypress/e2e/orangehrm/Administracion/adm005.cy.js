/// <reference types="cypress" />
//ADM005 donde se bloquea un usuario por ACL 
// se hizo un codiog ficticio ya que la pagina web no tiene esta funcion 

describe('ADM-005 - Acceso denegado por ACL (negativo)', () => {

    it('Debe modificar las ACL de un usuario para restringirle acceso a ciertos módulos', () => {

        cy.viewport(1400, 900);
    
        // 1. Entrar a Administración → Control de Accesos / ACL
        cy.visit('/admin/acl');
        cy.url().should('include', '/admin/acl');
    
        // 2. Seleccionar al usuario
        cy.contains('td', 'usuario.demo')
          .should('be.visible')
          .parent('tr')
          .within(() => {
            cy.get('input[type="checkbox"]').check({ force: true });
          });
    
        // 3. Abrir formulario de permisos ACL
        cy.contains('button', /Editar ACL|Permisos|ACL/i)
          .should('be.visible')
          .click();
    
        // 4. Desactivar un permiso importante (dummy)
        cy.get('.acl-permission-row')
          .contains('Acceso a Módulo Financiero')
          .parent('div')
          .within(() => {
            cy.get('input[type="checkbox"]').uncheck({ force: true });
          });
    
        // 5. Guardar cambios de ACL
        cy.contains('button', /Guardar|Save/i)
          .should('be.visible')
          .click();
    
        // 6. Validar mensaje de éxito
        cy.contains(/ACL actualizada|Permisos guardados|Success/i, { timeout: 8000 })
          .should('be.visible');
    
        // 7. Validar visiblemente que ese permiso quedó desactivado
        cy.contains('td', 'usuario.demo')
          .parent('tr')
          .within(() => {
            cy.contains(/ACL modificada|Permisos restringidos/i).should('exist');
          });
      });
    
  
  });
  