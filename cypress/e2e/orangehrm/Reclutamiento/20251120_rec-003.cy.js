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

        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click()
        cy.url().should('include', '/recruitment')

        // Precondición: Navegar a Candidatos
        cy.contains('Candidates').click()
        cy.url().should('include', '/viewCandidates')

        // Paso 1: Buscar y seleccionar un candidato existente
        cy.wait(1000)
        cy.get('.oxd-table-body').find('.oxd-table-row').first().within(() => {
            cy.get('.oxd-table-cell').eq(1).click()
        })

        // Paso 2: Cambiar el estado del candidato
        cy.contains('button', 'Shortlist').should('be.visible').click()

        // Agregar notas al cambio de estado
        cy.get('textarea').type('Candidato cumple con los requisitos técnicos')

        // Confirmar el cambio de estado
        cy.contains('button', 'Save').click()

        // Resultado esperado: El estado del candidato se actualiza
        cy.contains('Success').should('be.visible')
        cy.contains('Shortlisted').should('be.visible')

        // Verificar que se puede avanzar al siguiente estado (Interview)
        cy.contains('button', 'Schedule Interview').should('be.visible')
    })

})