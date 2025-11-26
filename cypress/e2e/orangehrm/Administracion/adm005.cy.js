describe('falla al hacer un reporte ', function () {

  
    it('reports and analytics ', function () {
  
      cy.viewport(1400, 900);

        // Ir al módulo de reports
      cy.contains(' Repor', { timeout: 25000 }).should('be.visible').click();
  
      // Validar que estamos en reportes
      cy.url().should('include', '/reports_and_analytics');
  

      // ver reporte de nes and documents 
      cy.contains('News and Documents', { timeout: 20000 })
        .should('be.visible')
        .click();
  
      // Validar URL User Roles
      cy.url().should('include', '/report/Employee_Acknowledgment_Report');
      cy.contains(/Employee/i, { timeout: 20000 }).should('be.visible');
      cy.contains('i.material-icons', 'ohrm_file_pdf', { timeout: 20000 })
        .click();
  
      cy.contains('Download Will Start Shortly', { timeout: 15000 }).should('exist');


    });
  
  });
  