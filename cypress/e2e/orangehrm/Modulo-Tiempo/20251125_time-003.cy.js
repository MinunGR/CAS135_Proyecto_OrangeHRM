// ========================================
// TEST 4: Crear nueva Common Activity
// ========================================
describe('Time Tracking - Common Activities', () => {

    it('Debe crear una nueva Common Activity correctamente', () => {
        cy.login();
        cy.wait(2000);
        
        // Navegar a Common Activities
        cy.contains('Time Tracking').click();
        cy.contains('Activity Info').click();
        cy.contains('Common Activities').click();
        cy.wait(7000);
        
        // Hacer clic en Add Common Activity
//        cy.contains('.oxd-button-label-wrapper', 'Add Common Activity').click();
        cy.contains('button', 'Add Common Activity').click();

        // Crear nombre dinámico
        const activityName = `Actividad_${Date.now()}`;

        // Llenar campo del modal
       cy.get('#create-common-activity_name')
       // cy.get('#name')
          .clear()
          .should('be.visible')
          .type(activityName);

        // Guardar
       cy.contains('.oxd-button-label-wrapper', 'Save').click();
       // cy.contains('button', 'Save').click();

        // Verificar creación en la tabla
        cy.contains('td, .oxd-table-card', activityName).should('exist');

        cy.log(`🎉 Common Activity creada: ${activityName}`);
        cy.screenshot('common-activity-creada');
    });

});
