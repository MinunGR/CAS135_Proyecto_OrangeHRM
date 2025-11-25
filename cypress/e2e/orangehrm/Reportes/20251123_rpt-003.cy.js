describe('RPT-003 - Exportar reporte a CSV/PDF', () => {
    it('Debe descargar exitosamente el archivo en formato CSV', () => {
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar a la sección de reportes y analytics
        cy.contains('Reports and Analytics').click();
        cy.url().should('include', '/reports_and_analytics');

        // Seleccionar un reporte
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Generar el reporte primero
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Verificar que el reporte está visible
        cy.get('.oxd-table').should('be.visible');

        // Hacer clic en el botón de exportar
        // Assuming there is an export button, often an icon or text
        cy.get('button').find('i.bi-download, i.oxd-icon').parent().click({ force: true });
        // fallback if button has text
        // cy.contains('button', 'Export').click(); 
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
        cy.wait(4000);

        // Seleccionar un reporte
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Hacer clic en el botón de exportar
        cy.get('button').find('i.bi-download, i.oxd-icon').parent().click({ force: true });
        cy.wait(500);

        // Seleccionar formato PDF
        cy.contains('PDF').click();
        cy.wait(2000);

        // Verificar que el archivo se descargó
        cy.readFile('cypress/downloads/report.pdf', { timeout: 10000 }).should('exist');
    });
});