describe('Time Tracking - Customers', () => {

    // Nombre único cada ejecución
    const generarNombreUnico = () => {
        const now = new Date();
        const fecha = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
        return `CAS135-TEST-${fecha}`;
    };

    it('Agregar nuevo customer y verificar su creación', () => {

        const nombreCustomer = generarNombreUnico();
        cy.log(`🟢 Nombre generado: ${nombreCustomer}`);

        // Login
        cy.login();
        cy.wait(2000);

        // Navegar a Time Tracking
        cy.contains('Time Tracking').click();
        cy.wait(1000);

        // Ir a Activity Info -> Customers
        cy.contains('Activity Info').click();
        cy.contains('Customers').click();
        cy.wait(7000);

        // Verificar que estamos en la página correcta
        cy.url().should('include', '/viewCustomers');
        cy.log('✔ Navegación a Customers exitosa');

        // Clic en Add Customer
        cy.get('.oxd-button-label-wrapper').contains('Add Customer').click();
        cy.wait(2000);
        cy.log('✔ Modal/Formulario de Add Customer abierto');

        // Llenar el formulario
        cy.get('#create-customers_name')
            .should('be.visible')
            .clear()
            .type(nombreCustomer);
        cy.log(`✔ Nombre ingresado: ${nombreCustomer}`);
        
        // Cost Center - usar el autocomplete
        cy.get('#create-customers_costCenter')
            .should('be.visible')
            .clear()
            .type('0001');
        cy.wait(2000);
        
        cy.contains('0001 - Cost Center (IT)')
            .should('be.visible')
            .click();
        cy.log('✔ Cost Center seleccionado');
        
        // Description
        cy.get('#create-customers_description')
            .should('be.visible')
            .clear()
            .type('Test automático creado por Cypress');
        cy.log('✔ Descripción ingresada');

        // Clic en Save
        cy.get('.oxd-button--secondary')
            .contains('Save')
            .should('be.visible')
            .click();
        cy.log('✔ Botón Save clickeado');
        
        // Verificar mensaje de éxito
        cy.contains(/Successfully Saved|Success/i, { timeout: 10000 })
            .should('be.visible');
        cy.log('✔ Mensaje de éxito confirmado');

        // Esperar a que se cierre el modal/formulario
        cy.wait(2000);

        // Verificar que el customer aparece en la lista
        cy.url().should('include', '/viewCustomers');
        
        // Buscar el customer recién creado
        cy.get('input[placeholder*="Type for hints"], input[type="text"]')
            .first()
            .clear()
            .type(nombreCustomer);
        cy.wait(2000);

        // Verificar que aparece en los resultados
        cy.contains(nombreCustomer, { timeout: 5000 })
            .should('be.visible');
        cy.log(`✔ Customer "${nombreCustomer}" encontrado en la lista`);

        // Verificación adicional: contar registros
        cy.get('.oxd-table-card, .oxd-table-row')
            .should('have.length.at.least', 1);
        cy.log('✔ Al menos un registro visible en la tabla');

        // Screenshot de evidencia
        cy.screenshot(`customer-creado-${nombreCustomer}`);
        
        cy.log('🎉 TEST COMPLETADO EXITOSAMENTE');
    });

    // Test adicional: Validación de campos requeridos
    it('Validar campos requeridos al crear customer', () => {
        cy.login();
        cy.wait(2000);

        cy.contains('Time Tracking').click();
        cy.wait(1000);

        cy.contains('Activity Info').click();
        cy.contains('Customers').click();
        cy.wait(7000);

        // Abrir formulario
        cy.get('.oxd-button-label-wrapper').contains('Add Customer').click();
        cy.wait(2000);

        // Intentar guardar sin llenar nada
        cy.get('.oxd-button--secondary').contains('Save').click();

        // Verificar que aparecen mensajes de error
        cy.contains(/Required/i).should('be.visible');
        cy.log('✔ Validación de campos requeridos funciona correctamente');

        // Cancelar
        cy.contains('button', /Cancel/i).click();
    });

});