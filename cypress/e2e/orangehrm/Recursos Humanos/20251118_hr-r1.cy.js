// HR-R1: Alta de empleado con datos obligatorios.
describe('HR-R1: Alta de empleado con datos obligatorios', () => {
  it('Debe ingresar un empleado correctamente', () => {
    // Forzamos vista de escritorio (Cypress reduce la ventana y por ende el tamaño)
    cy.viewport(1400, 900);

    // Ir al módulo de empleados
    cy.contains('Employee List', { timeout: 25000 }).should('be.visible').click();

    // Esperar que cambie la URL
    cy.url().should('include', '/pim/employees');

    // Botón Add Employee
    cy.get('#addEmployeeButton i.material-icons', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click();

    // Si aparece este texto se asume el formulario ha cargado
    cy.contains('* Required', { timeout: 25000 }).should('be.visible');

    // Creamos variables para almacenar el nombre
    const first_name = "Fernando";
    const middle_name = "José"; 
    const last_name = "Barraza";

    // Agregamos los datos iniciales
    cy.get('#first-name-box').should('be.visible').clear().type(first_name);
    cy.get('#middle-name-box').should('be.visible').clear().type(middle_name);
    cy.get('#last-name-box').should('be.visible').clear().type(last_name);

    // Seleccionamos la ubicación
    cy.get('#modal-holder i[ng-class="{ \'custom-dropdown-icon-disabled\': readonly }"]', { timeout: 15000 })
      .should('be.visible')
      .click();
    cy.get('#modal-holder li[data-item-id="7"]').click();

    // Guardamos los datos del empleado
    cy.get('#modal-save-button')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Pasamos a los datos personales

    // Escogemos una nacionalidad
    cy.get('#nation_code_inputfileddiv div.initialized', { timeout: 25000 }).should('be.visible').click();
    cy.get('#nation_code_inputfileddiv li:nth-child(40) span').click();

    // Pasamos a la siguiente sección
    cy.get('#wizard-nav-button-section > button:nth-child(2)')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();

    // Pasamos a los detalles del empleo

    // Escogemos uno de los empleos
    cy.get('#employement_details_tab button[data-id="job_title_id"]', { timeout: 25000 }).should('be.visible').click();
    cy.get('#employement_details_tab li[data-item-id="17"]').click();

    // Elegimos un estado del  empleo "Tiempo completo"
    cy.get('#employement_details_tab button[data-id="employment_status_id"]').should('be.visible').click();
    cy.get('#employement_details_tab li[data-item-id="3"]').click();

    // Escogemos una categoria
    cy.get('#job_category_id').should('be.visible').click();
    cy.get('#employement_details_tab li[data-item-id="2"]').click();

    // Una Subunidad
    cy.get('#employement_details_tab button[data-id="subunit_id"]').should('be.visible').click();
    cy.get('#employement_details_tab li[data-item-id="18"]').click();

    // Un Work Schedule
    cy.get('#employement_details_tab button[data-id="work_schedule_id"]').should('be.visible').click();
    cy.get('#employement_details_tab li.highlighted span.text').click();

    // Pasamos a la siguiente sección
    cy.get('#wizard-nav-button-section > button:nth-child(2)')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();

    // Esperemos a que cargue un elemento del form
    cy.contains('Event Template', { timeout: 25000 }).should('be.visible');

    // Hacemos clic al botón Guardar
    cy.get('#wizard-nav-button-section > button:nth-child(3)')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();

    // Corroboramos que aparezca el mensaje toaste de éxito
    cy.get('#toast-container .toast-message', { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Successfully Saved');

    // Buscamos si el nombre del empleado recién creado aparece (Significaria que estamos en su hoja de detalles)
    cy.contains(first_name + " " + middle_name + " " + last_name, { timeout: 15000 }).should('be.visible');


  });

});
