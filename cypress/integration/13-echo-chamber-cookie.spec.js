/// <reference types="cypress" />

import '../support/commands-complete';

const user = {
  email: 'first@example.com',
  password: 'password123',
};

export const decodeToken = (token) => JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
export const encodeToken = (token) => Buffer.from(JSON.stringify(token)).toString('base64');

describe('Signing in with a seeded database', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
    cy.signIn(user);
  });

  it('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('should set a cookie', () => {
    cy.getCookie('jwt').then((cookie) => {
      const value = decodeToken(cookie.value);
      expect(value.email).to.equal(user.email);
    });
  });
});

describe('Setting the cookie', () => {
  beforeEach(() => {
    cy.task('seed');
    // Setting your fake data
    cy.setCookie('jwt', encodeToken({ id: 3101, email: 'mes@mail.com' }));
    cy.visit('/echo-chamber/sign-in');
  });

  it('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('show that user on the page', () => {
    cy.contains('mes@mail.com');
  });
});

describe('Setting the cookie with real data', () => {
  beforeEach(() => {
    cy.task('seed');
    // It may be need to test different users with different permissions without having to sign in and sign out every single one of them over and over again.
    // Great candidate for a command.
    cy.request('/echo-chamber/api/users')
      .then((response) => {
        console.log({ response });
        const [user] = response.body.users;
        cy.setCookie('jwt', encodeToken(user)).then(() => user);
      })
      .as('user');
    cy.visit('/echo-chamber/sign-in');
  });

  it('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('show that user on the page', () => {
    cy.get('@user').then((user) => cy.contains(`Signed in as ${user.email}`));
  });
});
