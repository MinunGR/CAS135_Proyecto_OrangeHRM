describe('RPT-004 - Filtro inválido/fecha fuera de rango (negativo)', () => {
    it('Debe mostrar mensaje de error al aplicar fecha de inicio posterior a fecha de fin', () => {
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar a la sección de reportes y analytics
        cy.contains('Reports and Analytics').click();
        cy.url().should('include', '/reports_and_analytics');

        // Seleccionar un reporte
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Aplicar fechas inválidas (fecha inicio > fecha fin)
        cy.get('.oxd-date-input .oxd-input').first().clear().type('2024-12-31');
        cy.get('.oxd-date-input .oxd-input').last().clear().type('2024-01-01');

        // Intentar generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar que se muestra un mensaje de error
        cy.get('.oxd-input-group__message, .oxd-text--error').should('be.visible');
        cy.contains(/Invalid date range|Should be less than|error/i).should('exist');
    });

    it('Debe mostrar mensaje de error al aplicar fecha futura', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(4000);

        // Seleccionar un reporte
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Aplicar fecha futura
        cy.get('.oxd-date-input .oxd-input').first().clear().type('2026-12-31');
        cy.get('.oxd-date-input .oxd-input').last().clear().type('2027-01-31');

        // Intentar generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar mensaje de error
        // Note: Future dates might be allowed depending on config, but assuming test expects error
        cy.get('.oxd-input-group__message, .oxd-text--error').should('be.visible');
        cy.contains(/future date|invalid|error/i).should('exist');
    });

    it('Debe mostrar mensaje de error con filtros incompatibles', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(4000);

        // Seleccionar un reporte
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Aplicar filtros incompatibles o vacíos
        cy.get('.oxd-date-input .oxd-input').first().clear();
        cy.get('.oxd-date-input .oxd-input').last().clear();

        // Intentar generar sin fechas requeridas
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar mensaje de error
        cy.get('.oxd-input-group__message, .oxd-text--error').should('be.visible');
        cy.contains(/required|mandatory|error/i).should('exist');
    });
});