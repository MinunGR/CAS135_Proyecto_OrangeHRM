describe('RPT-003 - Exportar reporte a CSV/PDF', () => {
    it('Debe descargar exitosamente el archivo en formato CSV', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Seleccionar un reporte
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Generar el reporte primero
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Verificar que el reporte está visible
        cy.get('table').should('be.visible');

        // Hacer clic en el botón de exportar
        cy.get('[data-testid="export-button"]').click();
        cy.wait(500);

        // Seleccionar formato CSV
        cy.contains('CSV').click();
        cy.wait(2000);

        // Verificar que el archivo se descargó (Cypress guarda en carpeta downloads)
        cy.readFile('cypress/downloads/report.csv', { timeout: 10000 }).should('exist');
    });

    it('Debe descargar exitosamente el archivo en formato PDF', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Seleccionar un reporte
        cy.get('[data-testid="report-card"]').first().click();
        cy.wait(1500);

        // Generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Hacer clic en el botón de exportar
        cy.get('[data-testid="export-button"]').click();
        cy.wait(500);

        // Seleccionar formato PDF
        cy.contains('PDF').click();
        cy.wait(2000);

        // Verificar que el archivo se descargó
        cy.readFile('cypress/downloads/report.pdf', { timeout: 10000 }).should('exist');
    });
});