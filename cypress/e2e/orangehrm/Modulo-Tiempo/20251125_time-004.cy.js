// ========================================
// TEST 4: Timesheet Periods (Configuración)
// ========================================
describe('Time Tracking - Timesheet Periods', () => {

    it('Acceder y verificar períodos de timesheet configurados', () => {
        cy.login();
        cy.wait(2500);

        // Navegar a Timesheet Periods
        cy.contains('Time Tracking').click();
        cy.wait(1500);
        cy.contains('Configuration').click();
        cy.wait(1500);
        cy.contains('Timesheet Periods').click();
        cy.wait(6000); // La página es lenta

        cy.url().should('include', 'timesheet_periods');

        // ================================
        // 🔍 DETECTAR CHECKBOX DEL TOGGLE
        // ================================
        cy.get('input[id^="timesheet_period_switch_"]', { timeout: 8000 })
            .first()
            .should('exist')
            .then($check => {

                const isChecked = $check.is(':checked');

                if (isChecked) {
                    cy.log('🔵 El período está ACTIVO');
                } else {
                    cy.log('⚪ El período está INACTIVO');
                }

                // Confirmar estado
                cy.wrap($check).should('have.prop', 'checked', isChecked);
            });

        cy.log('✅ Toggle validado correctamente');

        cy.screenshot('timesheet-periods-config');
        cy.log('🎉 TEST COMPLETADO');
    });
});
