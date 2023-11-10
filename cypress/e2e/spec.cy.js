describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('post a pet', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      failOnStatusCode: false,
      body: {
        "id": 92233111,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "perrito",
        "status": "available"
      }
    }).as('pet')
    cy.get('@pet').its('status').should('eq', 201)
  })

  it('get the pet', () => {
    cy.request({
      method: 'GET',
      url: 'https://petstore.swagger.io/v2/pet/92233111',
      failOnStatusCode: false,

    }).as('pet')
    cy.get('@pet').its('status').should('eq', 200)
    
    cy.get('@pet').its('body.name').should('eq', "perrito")
  })

  it('put changes to the pet', () => {
    cy.request({
      method: 'PUT',
      url: 'https://petstore.swagger.io/v2/pet',
      failOnStatusCode: false,
      body: {
        "id": 92233111,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggy",
        "status": "available"
      }
    }).as('pet')
    cy.get('@pet').its('status').should('eq', 200)
    cy.get('@pet').its('body.id').should('eq', 92233111)
    
    cy.get('@pet').its('body.name').should('eq', "doggy")
  })
}
)

