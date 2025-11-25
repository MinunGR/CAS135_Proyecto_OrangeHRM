describe('RPT-002 - Aplicar filtros múltiples en dashboard', () => {
    it('Debe cambiar los KPIs en función de los filtros elegidos', () => {
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar a la sección de reportes y analytics
        cy.contains('Reports and Analytics').click();
        cy.url().should('include', '/reports_and_analytics');

        // Ir al dashboard principal
        cy.contains('Dashboard', { timeout: 10000 }).click();
        cy.wait(2000);

        // Capturar valores iniciales de KPIs
        let initialKpiValue;
        cy.get('.orangehrm-dashboard-widget-body, .oxd-sheet').first().invoke('text').then((text) => {
            initialKpiValue = text;
        });

        // Aplicar primer filtro (por ejemplo, departamento)
        // OrangeHRM uses custom dropdowns
        cy.get('.oxd-select-wrapper').first().click();
        cy.get('.oxd-select-dropdown').should('be.visible');
        cy.get('.oxd-select-dropdown > *').eq(1).click(); // Select second option
        cy.wait(1500);

        // Aplicar segundo filtro (por ejemplo, rango de fechas)
        cy.get('.oxd-date-input .oxd-input').first().clear().type('2024-11-01');
        cy.get('.oxd-date-input .oxd-input').last().clear().type('2024-11-30');

        // Aplicar filtros
        cy.contains('button', 'Apply').click();
        cy.wait(2000);

        // Verificar que los KPIs cambiaron
        cy.get('.orangehrm-dashboard-widget-body, .oxd-sheet').first().invoke('text').should((newText) => {
            expect(newText).to.not.equal(initialKpiValue);
        });

        // Verificar que los gráficos se actualizaron
        cy.get('canvas').should('be.visible');
    });
});