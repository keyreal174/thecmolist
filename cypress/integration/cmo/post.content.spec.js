/// <reference types="cypress" />

context('Login', () => {
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
    // // Feed Page
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

    cy.get('#form-add-post-modal .DraftEditor-root')
      .type('question')
  })

  it('Ask a question, tag an existing person, tag an existing vendor', () => {
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

    cy.get('#form-add-post-modal .editor-wrapper', {timeout: 5000})
      .then(result => {
        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .first()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:first-child')
          .click()

        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .last()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:first-child')
          .click()

        cy.get('#form-add-post-modal').submit()
      })

    cy.url().should('include', '/content/')
    cy.get('.article-title strong')
      .should('have.text', 'title')
    cy.get('.article-text p')
      .find('a')
      .its('length')
      .should('eq', 2)
  })

  it('Ask a question, create a new person via +Add Person', () => {
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

    cy.get('#form-add-post-modal .editor-wrapper', {timeout: 5000})
      .then(result => {
        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .first()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:nth-last-child(2)')
          .click()

        cy.get('#form-add-person-modal .modal-person-section-input')
          .first()
          .type('Freddie')

        cy.get('#form-add-person-modal .modal-person-section-input')
          .last()
          .type('https://linkedin.com/in/333333')

        cy.get('.add-person-modal .modal-footer')
          .find('button')
          .last()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper')
          .click()

        cy.get('.add-post-modal .modal-footer')
          .find('button')
          .last()
          .click()
      })

    cy.url().should('include', '/content/')
    cy.get('.article-title strong')
      .should('have.text', 'title')
    cy.get('.article-text p')
      .find('a')
      .its('length')
      .should('eq', 1)
    cy.get('.article-text p')
      .find('a')
      .should('have.text', '@Freddie')
      .should('have.attr', 'href')
  })

  it('Ask a question, create a new person via +Add Vendor', () => {
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

    cy.get('#form-add-post-modal .editor-wrapper', {timeout: 5000})
      .then(result => {
        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .first()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:last-child')
          .click()

        cy.get('#form-add-person-modal .modal-person-section-input')
          .first()
          .type('Vendor')

        cy.get('#form-add-person-modal .modal-person-section-input')
          .last()
          .type('https://vendor.com')

        cy.get('.add-person-modal .modal-footer')
          .find('button')
          .last()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper')
          .click()

        cy.get('.add-post-modal .modal-footer')
          .find('button')
          .last()
          .click()
      })

    cy.url().should('include', '/content/')
    cy.get('.article-title strong')
      .should('have.text', 'title')
    cy.get('.article-text p')
      .find('a')
      .its('length')
      .should('eq', 1)
    cy.get('.article-text p')
      .find('a')
      .should('have.text', '@Vendor')
      .should('have.attr', 'href')
  })

  it('Ask a question, create a new person via +Add Vendor, Set type to Contractor', () => {
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

    cy.get('#form-add-post-modal .editor-wrapper', {timeout: 5000})
      .then(result => {
        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .first()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:last-child')
          .click()

        cy.get('#form-add-person-modal .vendor-type-list')
          .find('.form-check')
          .last()
          .find('label')
          .as('contractor')

        cy.get('@contractor')
          .should('have.text', 'Contractor')
        cy.get('@contractor')
          .click()

        cy.get('#form-add-person-modal .person-section')
          .first()
          .find('label')
          .should('have.text', 'Contractor name')

        cy.get('#form-add-person-modal .person-section')
          .last()
          .find('label')
          .should('have.text', 'Linkedin URL')
      })
  })

  it('Ask a question, create a new person via +Add Vendor, Set type to Agency', () => {
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

    cy.get('#form-add-post-modal .editor-wrapper', {timeout: 5000})
      .then(result => {
        cy.get('#form-add-post-modal .rich-editor-vendor-btns')
          .find('button')
          .first()
          .click()
          .wait(2000)

        cy.get('#form-add-post-modal .editor-wrapper > div:last-child > div:last-child')
          .click()

        cy.get('#form-add-person-modal .vendor-type-list')
          .find('.form-check')
          .eq(1)
          .find('label')
          .as('agency')

        cy.get('@agency')
          .should('have.text', 'Agency')
        cy.get('@agency')
          .click()

        cy.get('#form-add-person-modal .person-section')
          .first()
          .find('label')
          .should('have.text', 'Agency name')

        cy.get('#form-add-person-modal .person-section')
          .last()
          .find('label')
          .should('have.text', 'Agency website')
      })
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