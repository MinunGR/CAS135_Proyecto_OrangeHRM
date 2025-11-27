describe('RPT-002 - Aplicar filtros múltiples en dashboard', () => {
    it('Debe cambiar los KPIs en función de los filtros elegidos', () => {
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar a la sección de reportes y analytics
        cy.contains('Employee Management').click();
        cy.contains('i.material-icons', 'oxd_filter', { timeout: 20000 })
            .should('be.visible')
            .parents('a, button')
            .first()
            .click();
            
        const Namee = '0134';
  
        cy.get('#emp_search_mdl_employee_id_filter')
              .should('be.visible')
              .clear()
              .type(Namee);
        cy.contains('a', 'Search')
              .should('be.visible')
              .click();
            
        // cy.contains( 'SEARCH', { timeout: 25000 }).click();
        cy.contains( '0134', { timeout: 25000 });

    });
});