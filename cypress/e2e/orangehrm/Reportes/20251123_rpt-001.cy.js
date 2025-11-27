describe('RPT-001 - Generar reporte de tiempo semanal', () => {
    it('Debe generar correctamente un reporte de tiempo semanal con filtros aplicados', () => {
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar a la sección de reportes y analytics
        cy.contains('Reports and Analytics').click();
        cy.url().should('include', '/reports_and_analytics');

        // Verificar que estamos en la página correcta
        cy.title().should('include', 'Reports and Analytics');

        // Hacer clic en el botón "New Report"
        cy.contains('div.table-header-action-btns div', 'New Report', { timeout: 25000 }).click();
        cy.wait(1500);

        // Seleccionar opciones del formulario (clicks en iconos)
        // cy.get('form > div:nth-of-type(1) i').click();
        // cy.wait(500);

        // cy.get('form > div:nth-of-type(2) i').click();
        // cy.wait(500);

        // Hacer clic en el botón "Add"
        //cy.get('[data-test="addButton"]').click();
        cy.contains('Next').click();
        cy.wait(10000);

        // Ingresar el nombre del reporte
        const nombreReporte = 'Reporte-' + Date.now()


        cy.get('#pimDefineReportName').clear().type(nombreReporte);
        cy.wait(1000);

        // Hacer clic en "Next"
        cy.contains( 'Next', { timeout: 25000 }).click();
        cy.wait(1500);
        cy.contains('Employee Name')
          .should('be.visible')
          .click();

        cy.contains('Job Title')
          .should('be.visible')
          .click();
        cy.contains('Job Category')
          .should('be.visible')
          .click();

        cy.contains( 'Next', { timeout: 25000 }).click();


        cy.contains('Add Display Field Group')
          .should('be.visible')
          .click();
        cy.contains('Personal')
          .should('be.visible')
          .click();
        cy.contains('Select All')
          .should('be.visible')
          .click();
        cy.contains('Save', { timeout: 25000 })
          .should('be.visible')
          .click();

        cy.contains('Generate', { timeout: 25000 })
          .should('be.visible')
          .click();

        // Mensaje de éxito
        cy.log('✓ Reporte semanal generado exitosamente con filtros aplicados');
    });
});