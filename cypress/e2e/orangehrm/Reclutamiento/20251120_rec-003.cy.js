describe('REC-003 - Cambiar estado del candidato en pipeline', () => {

    /**
     * ID: REC-003
     * Módulo: Reclutamiento
     * Owner: David
     * Título: Cambiar estado del candidato en pipeline
     * Prioridad: Media
     * Resultado Esperado: El estado del candidato se actualiza (ej: "Interview")
     */
    it('Debe cambiar el estado del candidato en el pipeline', { tags: ['@recruitment', '@medium', '@regression'] }, () => {

        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click();
        cy.url().should('include', '/recruitment');

        // Precondición: Navegar a Candidatos
        cy.contains('Candidates').click()
        cy.url().should('include', 'candidates')

        // Paso 1: Buscar y seleccionar un candidato existente
        cy.wait(1000)
        cy.get('.oxd-table-body').find('.oxd-table-row').first().within(() => {
            cy.get('.oxd-table-cell').eq(1).click()
        })

        // Paso 2: Cambiar el estado del candidato
        cy.contains('div.selected-content', 'Application Received', { timeout: 20000 })
          .should('be.visible')
          .click();

        cy.contains('Phone Screening').click();          
        // Resultado esperado: El estado del candidato se actualiza
        cy.contains('Success').should('be.visible')

    })

})