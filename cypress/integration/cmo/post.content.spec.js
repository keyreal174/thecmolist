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

  it('Ask a question, and post', () => {
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

    cy.get('.add-post-modal')
      .should('have.class', 'show')

    // Type title
    cy.get('#form-add-post-modal .modal-section-separator input')
      .type('title')

    // Type question
    cy.get('#form-add-post-modal .DraftEditor-root')
      .type('question')

    cy.get('#form-add-post-modal').submit()

    cy.url().should('include', '/content/')
    cy.get('.article-title strong')
      .should('have.text', 'title')
    cy.get('.article-text p')
      .should('have.text', 'question')

    cy.visit('/feed')
    cy.get('.feed--wrapper')
      .find('.feed-dashboard-cell.article-wrapper')
      .first()
      .as('wrapper')
    cy.get('@wrapper').find('.article-title strong').should('have.text', 'title')
    cy.get('@wrapper').find('.article-text p').should('have.text', 'question')
  })

  it('Ask a question with a topic in the content body, then post', () => {
    // Topic in content body doesn't work in cypress
  })

  it('Ask a question with a topic in the topics field, then post', () => {
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

    cy.get('.add-post-modal')
      .should('have.class', 'show')

    // Type title
    cy.get('#form-add-post-modal .modal-section-separator input')
      .type('title')

    // Type question
    cy.get('#form-add-post-modal .DraftEditor-root')
      .type('question')

    cy.get('#form-add-post-modal .rbt-input-main')
      .click()

    cy.get('#form-add-post-modal .rbt-menu')
      .find('a')
      .first()
      .click()

    cy.get('#form-add-post-modal').submit()

    cy.url().should('include', '/content/')
    cy.get('.article-title strong')
      .should('have.text', 'title')
    cy.get('.article-text p')
      .should('have.text', 'question')
    cy.get('.article-wrapper-subtitle span a:nth-child(2)')
      .contains('#')

    cy.get('.article-wrapper-subtitle span a:nth-child(2)')
      .click()
    cy.url().should('include', '/topic/')
  })

  it('Go to profile, delete content', () => {
    cy.url().should('include', '/feed')
    cy.visit('/profile')

    cy.get('.profile--feed')
      .find('.profile--article-item')
      .then(res => {
        const length = parseInt(res.length)
        console.log(length)
        cy.get('.profile--article-item')
          .first()
          .find('.cursor-pointer.noselect')
          .click()
    
        cy.get('.modal-dialog .modal-footer')
          .find('button')
          .last()
          .click()
    
        cy.url().should('include', '/profile')
        if (length > 1) {
          cy.get('.profile--article-item').its('length').should('eq', length)
        } else {
          cy.get('.no-feed-data-header').should('exist')
        }
      })
  })
})