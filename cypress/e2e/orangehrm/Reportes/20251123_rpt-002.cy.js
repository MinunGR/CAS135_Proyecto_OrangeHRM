describe('RPT-002 - Aplicar filtros múltiples en dashboard', () => {
    it('Debe cambiar los KPIs en función de los filtros elegidos', () => {
        // Navegar al dashboard de reportes
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(2000);

        // Ir al dashboard principal
        cy.contains('Dashboard', { timeout: 10000 }).click();
        cy.wait(2000);

        // Capturar valores iniciales de KPIs
        let initialKpiValue;
        cy.get('[data-testid="kpi-card"]').first().invoke('text').then((text) => {
            initialKpiValue = text;
        });

        // Aplicar primer filtro (por ejemplo, departamento)
        cy.get('select[name="department"]').select(1);
        cy.wait(1500);

        // Aplicar segundo filtro (por ejemplo, rango de fechas)
        cy.get('input[type="date"]').first().clear().type('2024-11-01');
        cy.get('input[type="date"]').last().clear().type('2024-11-30');

        // Aplicar filtros
        cy.contains('button', 'Apply').click();
        cy.wait(2000);

        // Verificar que los KPIs cambiaron
        cy.get('[data-testid="kpi-card"]').first().invoke('text').should((newText) => {
            expect(newText).to.not.equal(initialKpiValue);
        });

        // Verificar que los gráficos se actualizaron
        cy.get('canvas').should('be.visible');
    });
});