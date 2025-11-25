describe('Debug Dump', () => {
    it('Dumps HTML of reports page', () => {
        cy.visit('https://orangehrm-demo-7x.orangehrmlive.com/client/#/reports_and_analytics/catalogue');
        cy.wait(5000); // Wait for dynamic content
        cy.document().then((doc) => {
            cy.writeFile('cypress/downloads/reports_page.html', doc.documentElement.outerHTML);
        });
    });
});
