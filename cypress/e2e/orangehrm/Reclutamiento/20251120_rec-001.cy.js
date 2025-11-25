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
        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click();
        cy.url().should('include', '/recruitment');

        // Asegurar que estamos en la pestaña Vacancies (según UI suele haber pestañas Vacancies / Candidates)
        cy.contains('Vacancies').click();
        cy.url().should('include', '/recruitment/vacancies');

        // Paso 1: Hacer clic en el botón "Add" para crear vacante
        cy.get('div.table-header-action-btns div', { timeout: 25000 }).contains('button', 'Add Vacancy', { timeout: 25000 }).click()
        cy.url().should('include', '/addJobVacancy')

        // Paso 2: Completar el formulario de vacante
        const vacancyName = `Ingeniero de Software ${Date.now()}`
        cy.get('#Create\\ VacancyDetails_vacancyName').type(vacancyName)

        // Seleccionar Job Title del dropdown
        cy.get('div:nth-of-type(2) > div:nth-of-type(3) div.oxd-select-text-input').click()
        cy.get('form > div:nth-of-type(3) div.oxd-select-text--after > div').click()

        // Descripción de la vacante
        cy.get('textarea').type('Buscamos QA Engineer con experiencia en automatización de pruebas')

        // Hiring Manager
        cy.get('[data-test="autocompleteSelect"]').type('Da')
        cy.wait(1000) // Esperar a que cargue el autocompletado
        cy.get('.oxd-autocomplete-dropdown').first().click()

        // Número de posiciones
        cy.get('#Create\\ VacancyDetails_numberOfPositions').clear().type('1')

        // Paso 3: Guardar la vacante
        cy.get('div.oxd-form-actions > button > div').contains('Save and Continue').click()

        // Resultado esperado: La vacante se crea y aparece listada
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/recruitment/vacancies')
        cy.contains(vacancyName).should('be.visible')
    })

})