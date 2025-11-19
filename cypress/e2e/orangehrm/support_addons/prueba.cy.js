describe('Prueba básica de carga', () => {
  it('Carga la página principal', () => {
    cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/', {
  		failOnStatusCode: false
	});
    cy.contains('Advanced Trial').should('be.visible');
  });
});
