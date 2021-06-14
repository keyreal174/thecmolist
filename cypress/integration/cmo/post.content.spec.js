/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('/login')

    // type email and test
    cy.get('input[type="email"]')
      .type('testuser@gmail.com')
    // type password and test
    cy.get('input[type="password"]')
      .type('password123')
    // submit
    cy.get('.login--form.form-signin')
      .submit()
  })

  it("Ask a question, and post", () => {
    // Feed Page
    cy.url().should('include', '/feed')
    cy.get('.feed-right-container .custom-card:nth-child(1) button:nth-child(1)')
      .as('askquestionBtn')

    // Check Ask Question button
    cy.get('@askquestionBtn')
      .should('have.text', 'Ask Question')

    // Check Ask Question button
    cy.get('@askquestionBtn')
      .click()

    // Type title
    cy.get('#form-add-post-modal .modal-section-separator input')
      .type('title')

    // Type description 
    cy.get('#form-add-post-modal .public-DraftStyleDefault-block span')
      .then($result => {
        $result.prepend('<span data-text="true">Question</span>')
        cy.waitFor(2000)
        cy.get('#form-add-post-modal').submit()
      })
  })
})