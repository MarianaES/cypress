/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('equal', '/echo-chamber/sign-in');
    // Other alternative
    cy.location('pathname').should('contain', '/echo-chamber/sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {});
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
    cy.get('[data-test="sign-up-email"]').as('email');
  });

  it('should require an email', () => {
    cy.get('@submit').click();

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');

    // Other alternative
    // To look for props select the input field, go to console and type $0.validity, for example.
    // cy.get('[data-test="sign-up-email"]:invalid')
    //   .invoke('prop', 'validity')
    //   .its('valueMissing')
    //   .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type('notanemail');

    cy.get('@submit').click();

    cy.get('[data-test="sign-up-email"]:invalid');

    cy.get('@email')
      .invoke('prop', 'validationMessage')
      .should(
        'contain',
        "Please include an '@' in the email address. 'notanemail' is missing an '@'.",
      );

    // Other alternative - Mostly the best choice
    // cy.get('[data-test="sign-up-email"]:invalid')
    //   .invoke('prop', 'validity')
    //   .its('typeMismatch')
    //   .should('be.true');
  });

  it('should require a password when the email is present', () => {
    // It is possible to use enter to cause a submit event as opposed to calling submit on the form obj or clicking the sign up button.
    // For more special characters: https://docs.cypress.io/api/commands/type#Arguments
    cy.get('@email').type('mail@email.com{enter}');

    cy.get('[data-test="sign-up-password"]:invalid');

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });
});
