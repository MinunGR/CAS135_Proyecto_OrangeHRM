describe('REC-001 - Crear vacante', () => {

    /**
     * ID: REC-001
     * Módulo: Reclutamiento
     * Owner: David
     * Título: Crear vacante
     * Prioridad: Alta
     * Resultado Esperado: La vacante se crea y aparece listada
     */
    it('Debe crear una vacante exitosamente', { tags: ['@recruitment', '@high', '@smoke'] }, () => {

        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click()
        cy.url().should('include', '/recruitment')

        // Paso 1: Hacer clic en el botón "Add" para crear vacante
        cy.contains('button', 'Add').click()
        cy.url().should('include', '/addJobVacancy')

        // Paso 2: Completar el formulario de vacante
        const vacancyName = `QA Engineer - ${Date.now()}`
        const jobTitle = 'QA Engineer'

        cy.get('input[class*="oxd-input"]').eq(1).type(vacancyName)

        // Seleccionar Job Title del dropdown
        cy.get('.oxd-select-text').first().click()
        cy.contains('.oxd-select-option', jobTitle).click()

        // Descripción de la vacante
        cy.get('textarea').type('Buscamos QA Engineer con experiencia en automatización de pruebas')

        // Hiring Manager
        cy.get('input[placeholder="Type for hints..."]').first().type('Peter')
        cy.wait(1000)
        cy.get('.oxd-autocomplete-dropdown').contains('Peter').click()

        // Número de posiciones
        cy.get('input[class*="oxd-input"]').eq(2).clear().type('2')

        // Paso 3: Guardar la vacante
        cy.contains('button', 'Save').click()

        // Resultado esperado: La vacante se crea y aparece listada
        cy.contains('Success').should('be.visible')
        cy.url().should('include', '/viewJobVacancy')
        cy.contains(vacancyName).should('be.visible')
    })

})