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

    it('can type in instructions box', () => {
        cy.get('input[name="instructions"]')
            .type('knock 3 times')
            .should('have.value', 'knock 3 times')
    })
})

describe('can add multiple toppings', () => {
    
    it('can click mulitple buttons', () => {
        cy.visit('http://localhost:3001/pizza')
        cy.get('input[name="pepperoni"]')
            .click()
        cy.get('input[name="blackOlives"]')
            .click()
        
    })
})

describe('it can submit an order', () => {
    it('can submit a user', () => {
        cy.visit('http://localhost:3001/pizza') 
        cy.get('input[name="first_name"]')
            .type('Virginia')
        cy.get('select[name="size"]')
            .select('Medium')
        cy.get('input[name="pepperoni"]')
            .click() 
        cy.get('input[name="blackOlives"]')
            .click()
        cy.get('input[name="instructions"]')
            .type('knock 3 times')

        cy.get('button.submit').click()
            
    })
})