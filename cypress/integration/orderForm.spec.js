describe('can add text to box', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3001/pizza')
        cy.url().should('include', 'localhost')

    })

    it('can type in name box', () => {
        cy.get('input[name="first_name"]')
            .type('Virginia')
            .should('have.value', 'Virginia')
    })

    it
})