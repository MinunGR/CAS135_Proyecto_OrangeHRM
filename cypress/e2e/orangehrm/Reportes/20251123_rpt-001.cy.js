describe('RPT-001 - Generar reporte de tiempo semanal', () => {
    it('Debe generar correctamente un reporte de tiempo semanal con filtros aplicados', () => {
        // Navegar a la sección de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(4000); // Wait for loading

        // Buscar y seleccionar el reporte de tiempo semanal
        // Assuming reports are in a grid or list. Using a broad selector or text.
        cy.contains('Time').should('be.visible');

        // Seleccionar un reporte relacionado con tiempo. 
        // Using .oxd-grid-item or similar if it's a catalogue.
        // If we can't be sure, we click the first element that looks like a report card.
        cy.get('.oxd-grid-item, .oxd-table-card').first().click();
        cy.wait(2000);

        // Aplicar filtros de fecha (semana actual)
        // OrangeHRM date inputs usually have a placeholder or specific structure
        cy.get('.oxd-date-input .oxd-input').first().clear().type('2024-11-18');
        cy.get('.oxd-date-input .oxd-input').last().clear().type('2024-11-24');

        // Generar el reporte
        cy.contains('button', 'Generate').click();
        cy.wait(3000);

        // Verificar que el reporte se generó correctamente
        cy.get('.oxd-table').should('be.visible');
        cy.get('.oxd-table-body .oxd-table-card').should('have.length.greaterThan', 0);

        // Verificar que los datos corresponden al rango de fechas
        cy.contains('2024-11-18').should('exist');
    });
});