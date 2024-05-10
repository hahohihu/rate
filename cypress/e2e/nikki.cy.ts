describe('nikki', () => {
    beforeEach(() => {
        cy.login();
    })

    it('can add a film', () => {
        cy.get('.searchbar input').type("300")
        cy.get('.searchbar button').click()

        cy.get('#provider-letterboxd li:first-of-type button').click()

        cy.get("#thing-info").contains("300");
    })
});
