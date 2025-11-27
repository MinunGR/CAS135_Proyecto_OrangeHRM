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
        // cy.get('div.table-header-action-btns div', { timeout: 25000 }).contains('button', 'Add Vacancy', { timeout: 25000 }).click()
        cy.contains(' Add Vacancy', { timeout: 25000 }).should('be.visible').click();





        cy.url().should('include', '/vacancy')



        // Paso 2: Completar el formulario de vacante
        const vacancyName =  'Ingeniero de Software' + Date.now();

        // cy.get('#Create\\ VacancyDetails_vacancyName').type(vacancyName)
        cy.get('#Create\\ VacancyDetails_vacancyName')
          .clear()
          .type(vacancyName);

        cy.get('div.oxd-select-text-input', { timeout: 20000 })
          .filter(':visible')      // por si hay más de uno
          .first()                 // tomamos el primero
          .click();
        
        // 2) Hacer clic en la opción "Art Director"
        // cy.contains('div', 'Art Director', { timeout: 20000 })
        //   .should('be.visible')
        //   .click();

        cy.contains('Art Director', { timeout: 25000 }).should('be.visible').click();
        
        cy.get('div.select-placeholder', { timeout: 20000 })
          .first()                 // tomamos el primero
          .click();
        
        cy.contains('Canadian Development Center')
          .filter(':visible')
          .first()
          .click();
        
// escribir "Aaron" en el autocomplete
        cy.get('input[id="Create VacancyDetails_hiringManager"]', { timeout: 20000 })
          .should('be.visible')
          .clear()
          .type('Aaron');

        // seleccionar específicamente "Aaron Hamilton" de la lista
        cy.contains('.oxd-autocomplete-option', 'Aaron Hamilton', { timeout: 20000 })
          .should('be.visible')
          .click();

        

        cy.get('#Create\\ VacancyDetails_numberOfPositions')
          .clear()
          .type('1');

        cy.contains('Save and Continue')
          .should('be.visible')
          .click();
          
        cy.contains(/Success|guard/i, { timeout: 15000 }).should('exist');

    })

})