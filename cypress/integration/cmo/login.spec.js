/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Login (username/pw)', () => {
    // type email and test
    cy.get('input[name="email"]')
      .type('testuser@gmail.com').should('have.value', 'testuser@gmail.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('testuser@gmail.com', { delay: 100 })
      .should('have.value', 'testuser@gmail.com')

    // type password and test
    cy.get('input[name="password"]')
      .type('password123').should('have.value', 'password123')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.2 sec
      .type('password123', { delay: 200 })
      .should('have.value', 'password123')

    // submit
    cy.get('.home--form-right')
      .submit()

    // check redirect url
    cy.url().should('include', '/feed')
  })

  // it('Login (linkedin)', () => {
  //   cy.get('form.home--form-right > div:nth-child(4) > div:nth-child(2) > button')
  //     .click()

  //   cy.url().should('include', 'https://www.linkedin.com/')
  // })

  it('Logout', () => {
    // type email and test
    cy.get('input[name="email"]')
      .type('testuser@gmail.com')

    // type password and test
    cy.get('input[name="password"]')
      .type('password123')

    // submit
    cy.get('.home--form-right')
      .submit()

    // check redirect url
    cy.url().should('include', '/feed')

    cy.get('#basic-nav-dropdown')
      .click()

    cy.get('#basic-navbar-nav > div.navbar-nav > div > div > a:nth-child(3)')
      .click()

    cy.url().should('include', '/')
    cy.get('#root > div > div > div.home--form.row > div:nth-child(2) > form > div.home--form-subtitle')
      .should('have.text', 'Already have an account or received a invitation? Sign in here:')
  })

  it('Logout', () => {
    // type email and test
    cy.get('input[name="email"]')
      .type('test@gmail.com')

    // type password and test
    cy.get('input[name="password"]')
      .type('password')

    cy.on('uncaught:exception', (err, runnable) => {
      console.log(err)
      expect(err.message).to.include('something about the error')
  
      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()
  
      // return false to prevent the error from
      // failing this test
      return false
    })

    cy.get('.home--form-right')
      .submit()
  })
})