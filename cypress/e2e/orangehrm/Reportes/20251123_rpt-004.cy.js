describe('RPT-004 - Filtro inválido/fecha fuera de rango (negativo)', () => {
    it('Debe mostrar mensaje de error al aplicar fecha de inicio posterior a fecha de fin', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Seleccionar un reporte
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Aplicar fechas inválidas (fecha inicio > fecha fin)
        cy.get('input[type="date"]').first().clear().type('2024-12-31');
        cy.get('input[type="date"]').last().clear().type('2024-01-01');

        // Intentar generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar que se muestra un mensaje de error
        cy.get('.error-message').should('be.visible');
        cy.contains('Invalid date range').should('exist');
    });

    it('Debe mostrar mensaje de error al aplicar fecha futura', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Seleccionar un reporte
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Aplicar fecha futura
        cy.get('input[type="date"]').first().clear().type('2026-12-31');
        cy.get('input[type="date"]').last().clear().type('2027-01-31');

        // Intentar generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar mensaje de error
        cy.get('.error-message').should('be.visible');
        cy.contains(/future date|invalid|error/i).should('exist');
    });

    it('Debe mostrar mensaje de error con filtros incompatibles', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Seleccionar un reporte
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Aplicar filtros incompatibles o vacíos
        cy.get('input[type="date"]').first().clear();
        cy.get('input[type="date"]').last().clear();

        // Intentar generar sin fechas requeridas
        cy.contains('button', 'Generate').click();
        cy.wait(1500);

        // Verificar mensaje de error
        cy.get('.error-message, .validation-error').should('be.visible');
        cy.contains(/required|mandatory|error/i).should('exist');
    });
});