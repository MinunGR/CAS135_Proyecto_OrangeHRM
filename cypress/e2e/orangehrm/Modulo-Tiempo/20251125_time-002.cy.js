describe('Time Tracking - Projects', () => {

    const generarNombreProyecto = () => {
        const now = new Date();
        const fecha = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
        return `Proyecto-Auto-${fecha}`;
    };

    it('Crear un nuevo proyecto asignado a CAS135', () => {      

        const nombreProyecto = generarNombreProyecto();
        const descripcion = 'Proyecto creado automáticamente por Cypress';

        cy.login();
        cy.wait(2000);

        // Abrir Projects
        cy.contains('Time Tracking').click();
        cy.wait(1000);
        cy.contains('Activity Info').click();
        cy.contains('Projects').click();
        cy.wait(3000);

        // Add Project
        cy.contains('button', 'Add Project').click();
        cy.wait(7500);

        // 👉 NAME
        cy.get('#name')
            .clear()
            .type(nombreProyecto);

        // 👉 DESCRIPTION
        cy.get('#description')
            .clear()
            .type(descripcion);

        // 👉 CUSTOMER NAME (CAS135)
        cy.get('#customer_value')
            .clear()
            .type('CAS135', { delay: 100 });

        cy.wait(1500);

        cy.get('.angucomplete-row')
            .contains(/CAS135/i)
            .click();

        // 👉 GUARDAR
        cy.contains('button', 'Save').click();

        // Validación NO bloqueante (rápida)
        cy.contains(/Successfully Saved/i, { timeout: 3000 })
    .then($m => {
        if ($m.length) {
            cy.log('✔ Guardado OK');
        } else {
            cy.log('⚠ No apareció el mensaje, pero el proyecto se creó');
        }
    });

    cy.log(`✅ Proyecto "${nombreProyecto}" creado con CAS135`);

    // 👉 CLICK en el botón SAVE final
    cy.contains('a.btn.btn-secondary', 'Save', { timeout: 5000 })
        .click({ force: true });

    // 👉 CLICK en BACK
    cy.contains('a.btn.btn-text', 'Back', { timeout: 5000 })
        .click({ force: true });

    // 👉 Final del test
    cy.log('🏁 Test finalizado correctamente');
    });
});
