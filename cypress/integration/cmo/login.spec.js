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
      .next()
      .should('url', '/feed')
  })
})