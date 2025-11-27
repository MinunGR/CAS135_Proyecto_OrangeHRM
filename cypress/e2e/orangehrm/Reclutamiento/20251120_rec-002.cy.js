describe('REC-002 - Registrar candidato a vacante', () => {

    /**
     * ID: REC-002
     * Módulo: Reclutamiento
     * Owner: David
     * Título: Registrar candidato a vacante
     * Prioridad: Alta
     * Resultado Esperado: El candidato se registra y queda asociado a la vacante
     * Generado por IA ya que no se puede usar esta funcion, al agregar cansidato da error fuera del alcance.
     */
    it('Debe registrar un candidato a una vacante existente', { tags: ['@recruitment', '@high', '@smoke'] }, () => {

        // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
        cy.viewport(1400, 900);

        // Navegar al módulo de Reclutamiento
        cy.contains('Recruitment').click();
        cy.url().should('include', '/recruitment');

        // Precondición: Navegar a la sección de Candidatos
        cy.contains('Candidates').click()
        cy.url().should('include', '/viewCandidates')

        // Paso 1: Hacer clic en "Add" para agregar candidato
        cy.contains('button', 'Add').click()
        cy.url().should('include', '/addCandidate')

        // Paso 2: Completar información del candidato
        const firstName = `Carlos${Date.now()}`
        const lastName = 'Martínez'
        const email = `carlos.martinez${Date.now()}@test.com`

        cy.get('input[name="firstName"]').type(firstName)
        cy.get('input[name="middleName"]').type('Alberto')
        cy.get('input[name="lastName"]').type(lastName)

        // Seleccionar vacante
        cy.get('.oxd-select-text').first().click()
        cy.get('.oxd-select-dropdown').contains('QA Engineer').click()

        // Email
        cy.get('input[placeholder="Type here"]').eq(0).type(email)

        // Número de contacto
        cy.get('input[placeholder="Type here"]').eq(1).type('7890-1234')

        // Keywords
        cy.get('input[placeholder="Enter comma seperated words..."]').type('Cypress, Selenium, Testing')

        // Notas
        cy.get('textarea').type('Candidato con 3 años de experiencia en QA')

        // Paso 3: Guardar candidato
        cy.contains('button', 'Save').click()

        // Resultado esperado: El candidato se registra y queda asociado a la vacante
        cy.contains('Success').should('be.visible')
        cy.url().should('include', '/addCandidate')
        cy.contains(firstName).should('be.visible')
        cy.contains(lastName).should('be.visible')
    })

})