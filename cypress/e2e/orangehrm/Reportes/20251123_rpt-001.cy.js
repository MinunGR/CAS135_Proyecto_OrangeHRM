describe('RPT-001 - Generar reporte de tiempo semanal', () => {
    it('Debe generar correctamente un reporte de tiempo semanal con filtros aplicados', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Buscar y seleccionar el reporte de tiempo semanal
        cy.contains('Time', { timeout: 10000 }).should('be.visible');

        // Seleccionar un reporte relacionado con tiempo
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Aplicar filtros de fecha (semana actual)
        cy.get('input[type="date"]').first().clear().type('2024-11-18');
        cy.get('input[type="date"]').last().clear().type('2024-11-24');

        // Generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Verificar que el reporte se generó correctamente
        cy.get('table').should('be.visible');
        cy.get('tbody tr').should('have.length.greaterThan', 0);

        // Verificar que los datos corresponden al rango de fechas
        cy.contains('2024-11-18').should('exist');
    });
});