// 20251120_rec-004.cy.js

describe('REC-004 - Rechazo por duplicado (negativo)', () => {

    /**
     * ID: REC-004
     * Módulo: Reclutamiento
     * Owner: David
     * Título: Rechazo por duplicado (negativo)
     * Prioridad: Media
     * Resultado Esperado: El sistema evita duplicar al candidato y muestra validación
     */
    it('Debe validar y evitar registrar candidato duplicado', { tags: ['@recruitment', '@medium', '@negative', '@regression'] }, () => {
        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click()
        cy.url().should('include', '/recruitment')

        // Precondición: Crear un candidato primero
        cy.contains('Candidates').click()
        cy.contains('button', 'Add').click()

        const firstName = `TestDuplicate${Date.now()}`
        const lastName = 'Validation'
        const email = `duplicate${Date.now()}@test.com`

        // Paso 1: Crear candidato inicial
        cy.get('input[name="firstName"]').type(firstName)
        cy.get('input[name="lastName"]').type(lastName)
        cy.get('.oxd-select-text').first().click()
        cy.get('.oxd-select-dropdown').contains('QA Engineer').click()
        cy.get('input[placeholder="Type here"]').eq(0).type(email)
        cy.contains('button', 'Save').click()
        cy.contains('Success').should('be.visible')

        // Paso 2: Intentar crear el mismo candidato nuevamente
        cy.contains('Candidates').click()
        cy.contains('button', 'Add').click()

        cy.get('input[name="firstName"]').type(firstName)
        cy.get('input[name="lastName"]').type(lastName)
        cy.get('.oxd-select-text').first().click()
        cy.get('.oxd-select-dropdown').contains('QA Engineer').click()
        cy.get('input[placeholder="Type here"]').eq(0).type(email)
        cy.contains('button', 'Save').click()

        // Resultado esperado: El sistema evita duplicar al candidato y muestra validación
        cy.get('.oxd-input-field-error-message, .oxd-text--toast-message')
            .should('be.visible')
            .and('contain.text', 'Already exists')
            .or('contain.text', 'duplicate')
            .or('contain.text', 'already')

        // Verificar que no se creó el duplicado
        cy.contains('Candidates').click()
        cy.get('.oxd-table-body').find('.oxd-table-row').filter(`:contains("${email}")`).should('have.length', 1)
    })

})