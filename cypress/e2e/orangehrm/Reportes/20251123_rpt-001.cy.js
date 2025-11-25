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
        cy.contains('div.table-header-action-btns div', 'New Report').click();
        cy.wait(1500);

        // Seleccionar opciones del formulario (clicks en iconos)
        cy.get('form > div:nth-of-type(1) i').click();
        cy.wait(500);

        cy.get('form > div:nth-of-type(2) i').click();
        cy.wait(500);

        // Hacer clic en el botón "Add"
        cy.get('[data-test="addButton"]').click();
        cy.wait(1000);

        // Ingresar el nombre del reporte
        cy.get('#pimDefineReportName').clear().type('Reporte Semanal');
        cy.wait(500);

        // Hacer clic en "Next"
        cy.contains('button.right', 'Next').click();
        cy.wait(1500);

        // Seleccionar campos para el reporte (Display Fields)
        // Employee Name
        cy.contains('div:nth-of-type(1) > div.s9 div:nth-of-type(1) > label', 'Employee Name').click();
        cy.wait(300);

        // Age (Years)
        cy.contains('#pimReportDefinitionStep2Form > div:nth-of-type(2) > div:nth-of-type(1) div:nth-of-type(2) > label', 'Age (Years)').click();
        cy.wait(300);

        // Nationality
        cy.contains('#pimReportDefinitionStep2Form > div:nth-of-type(2) > div:nth-of-type(1) div:nth-of-type(5) > label', 'Nationality').click();
        cy.wait(300);

        // Date of Birth
        cy.contains('#pimReportDefinitionStep2Form > div:nth-of-type(2) > div:nth-of-type(1) div:nth-of-type(7) > label', 'Date of Birth').click();
        cy.wait(300);

        // Job Title
        cy.contains('div:nth-of-type(2) > div:nth-of-type(2) div:nth-of-type(2) > label', 'Job Title').click();
        cy.wait(300);

        // Employment Status
        cy.contains('div:nth-of-type(2) > div:nth-of-type(2) > div.s9 div:nth-of-type(1) > label', 'Employment Status').click();
        cy.wait(300);

        // Hacer clic en "Next" nuevamente
        cy.get('div.wizard-step-buttons > button.right').click();
        cy.wait(1500);

        // Hacer clic en "Save"
        cy.contains('div.wizard-step-buttons > div > button', 'Save').click();
        cy.wait(2000);

        // Agregar Display Field - Personal
        cy.get('#display-group-dropdown-trigger').contains('Add Display Field').click();
        cy.wait(500);

        cy.contains('#content li:nth-of-type(1) > a', 'Personal').click();
        cy.wait(1000);

        // Seleccionar "Include Header"
        cy.contains('div:nth-of-type(1) > div.s4 > label', 'Include Header').click();
        cy.wait(300);

        // Seleccionar "Select All"
        cy.contains('div.s8 > label', 'Select All').click();
        cy.wait(500);

        // Agregar Display Field - Contact Details
        cy.get('#display-group-dropdown-trigger').contains('Add Display Field').click();
        cy.wait(500);

        cy.contains('#content li:nth-of-type(1) > a', 'Contact Details').click();
        cy.wait(1000);

        // Guardar configuración
        cy.contains('div.wizard-step-buttons > div > button', 'Save').click();
        cy.wait(2000);

        // Aplicar filtros de fecha
        // Abrir selector de fecha inicial
        cy.get('div.input-field > div > div > div:nth-of-type(1) i').click();
        cy.wait(500);

        // Seleccionar fecha inicial (día 5 del mes)
        cy.get('div.input-field > div > div > div:nth-of-type(1) tr:nth-of-type(5) > td:nth-of-type(1) > div').click();
        cy.wait(500);

        // Abrir selector de fecha final
        cy.get('div.ng-pristine > div.input-group-append-container button').click();
        cy.wait(500);

        // Seleccionar fecha final (último día del fin de semana)
        cy.get('div.ng-pristine td.pickadate--lastweekendday > div').click();
        cy.wait(500);

        // Generar el reporte
        cy.contains('button.btn-secondary', 'Generate').click();
        cy.wait(3000);

        // Verificaciones
        // Verificar que el reporte se generó correctamente
        cy.get('table').should('be.visible');

        // Verificar que hay datos en el reporte
        cy.get('tbody tr').should('have.length.greaterThan', 0);

        // Verificar que el nombre del reporte aparece
        cy.contains('Reporte Semanal').should('be.visible');

        // Verificar que los campos seleccionados están presentes en las columnas
        cy.contains('th', 'Employee Name').should('be.visible');
        cy.contains('th', 'Age').should('be.visible');
        cy.contains('th', 'Nationality').should('be.visible');
        cy.contains('th', 'Date of Birth').should('be.visible');
        cy.contains('th', 'Job Title').should('be.visible');

        // Verificar que el reporte tiene datos
        cy.get('tbody td').should('exist');

        // Mensaje de éxito
        cy.log('✓ Reporte semanal generado exitosamente con filtros aplicados');
    });
});