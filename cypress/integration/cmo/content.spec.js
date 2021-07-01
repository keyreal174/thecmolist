/// <reference types="cypress" />

context('Content Page', () => {
  beforeEach(() => {
    cy.viewport(1920, 1200)
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

  it('Reply to a question', () => {
    // Ask a question
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

    // Reply to a question
    cy.get('.question-answer-section > .article-wrapper.article-wrapper-content-detail')
      .as('commentWrapper')

    cy.get('@commentWrapper')
      .find('.DraftEditor-root')
      .type('This is a reply of this question')

    cy.get('@commentWrapper')
      .find('button.comment-button.show')
      .click()

    cy.get('.question-answer-section-replies')
      .should('have.text', '1 answers')
  })

  it('Comment on a reply', () => {
    // Ask a question
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

    // Reply to a question
    cy.get('.question-answer-section > .article-wrapper.article-wrapper-content-detail')
      .as('commentWrapper')

    cy.get('@commentWrapper')
      .find('.DraftEditor-root')
      .type('This is a reply of this question')

    cy.get('@commentWrapper')
      .find('button.comment-button.show')
      .click()

    cy.get('.question-answer-section-replies')
      .should('have.text', '1 answers')

    // Comment on a reply
    cy.get('.comment-input')
      .type('This is a comment of reply above')

    cy.get('button.comment-button.show')
      .first()
      .click()

    cy.get('.question-answers > .article-wrapper-content-detail')
      .find('.question-comments-section .article-text.article-blue-link span')
      .should('have.text', 'This is a comment of reply above')
  })
})