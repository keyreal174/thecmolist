/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it("Load 'All' tab in feed", () => {
    // type email and test
    cy.get('input[type="email"]')
      .type('testuser@gmail.com')
    // type password and test
    cy.get('input[type="password"]')
      .type('password123')
    // submit
    cy.get('.login--form.form-signin')
      .submit()

    // Feed Page
    cy.url().should('include', '/feed')
    // profile stats badge visible
    cy.get('.filter--button.active')
      .should('have.text', 'All')
    
    // 3 posts visible
    cy.get('.article-wrapper')
      .should('have.length', 2)
  })

  it("Load My peers tab in feed", () => {
    // type email and test
    cy.get('input[type="email"]')
      .type('testuser@gmail.com')
    // type password and test
    cy.get('input[type="password"]')
      .type('password123')
    // submit
    cy.get('.login--form.form-signin')
      .submit()

    // Feed Page
    cy.url().should('include', '/feed')

    cy.get('.filter--button:nth-child(2)')
      .click()
    // profile stats badge visible
    cy.get('.filter--button:nth-child(2)')
      .should('have.class', 'active')
      .should('have.text', 'My Peers')
    
    // 0 posts visible
    cy.get('.article-wrapper')
      .should('have.length', 1)
    cy.get('.article-wrapper.no-feed-data-header div')
      .should('have.text', 'No content yet')
  })

  it("Load Signalfire marketing tab in feed", () => {
    // type email and test
    cy.get('input[type="email"]')
      .type('testuser@gmail.com')
    // type password and test
    cy.get('input[type="password"]')
      .type('password123')
    // submit
    cy.get('.login--form.form-signin')
      .submit()

    // Feed Page
    cy.url().should('include', '/feed')

    cy.get('.filter--button:nth-child(3)')
      .click()
    cy.wait(1000)
    // profile stats badge visible
    cy.get('.filter--button:nth-child(3)')
      .should('have.class', 'active')
      .should('have.text', 'SignalFire Marketing')

      cy.url().should('include', '/group/signalfire-marketing')
    
    // 0 posts visible
    cy.get('.article-wrapper')
      .should('have.length', 2)
  })

  it("Load all three tabs, tab through filters (All/Q&A/Projects/Articles)", () => {
    // type email and test
    cy.get('input[type="email"]')
      .type('testuser@gmail.com')
    // type password and test
    cy.get('input[type="password"]')
      .type('password123')
    // submit
    cy.get('.login--form.form-signin')
      .submit()

    // Feed Page
    cy.url().should('include', '/feed')

    // SignalFire Marketing tab
    cy.get('.filter--button:nth-child(3)')
      .click()
    cy.wait(1000)
    cy.get('.filter--button:nth-child(3)')
      .should('have.class', 'active')
      .should('have.text', 'SignalFire Marketing')
    cy.url().should('include', '/group/signalfire-marketing')
    cy.get('.article-wrapper')
      .should('have.length', 2)

    // My Peers tab
    cy.get('.filter--button:nth-child(2)')
      .click()
    cy.get('.filter--button:nth-child(2)')
      .should('have.class', 'active')
      .should('have.text', 'My Peers')
    cy.url().should('include', '/feed')
    cy.get('.article-wrapper')
      .should('have.length', 1)
      cy.get('.article-wrapper.no-feed-data-header div')
      .should('have.text', 'No content yet')

    // All tab
    cy.get('.filter--button:nth-child(1)')
      .click()
    cy.get('.filter--button:nth-child(1)')
      .should('have.class', 'active')
      .should('have.text', 'All')
    cy.get('.article-wrapper')
      .should('have.length', 2)

    // Q&A filter
    cy.get('.feed-subselector--button:nth-child(4)')
      .click()
    cy.get('.article-wrapper')
      .should('have.length', 2)

    // All filter
    cy.get('.feed-subselector--button:nth-child(2)')
      .click()
    cy.get('.article-wrapper')
      .should('have.length', 2)

    // Updates & Insights filter
    cy.get('.feed-subselector--button:nth-child(6)')
      .click()
    cy.get('.article-wrapper')
      .should('have.length', 1)

    // Articles & News
    cy.get('.feed-subselector--button:nth-child(8)')
      .click()
    cy.get('.article-wrapper')
      .should('have.length', 1)
  })
})