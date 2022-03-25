/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Hawkeye');
    cy.get('[data-test="select-input"]').should('have.value', 'Hawkeye');

    // Other alternative
    //  cy.get('[data-test="select-result"]').contains('Hawkeye');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-result"]').contains('(None)');

    cy.get('[data-test="checkbox-tomato"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');

    cy.get('[data-test="checkbox-onion"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato, Onion');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#abcdef').trigger('input');
    cy.get('[data-test="color-result"]').contains('#abcdef');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').invoke('val', '1992-01-31').trigger('input');
    // Other alternative
    // cy.get('[data-test="date-input"]').type('1992-01-31');
    cy.get('[data-test="date-result"]').contains('1992-01-31');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '10').trigger('input');
    cy.get('[data-test="range-result"]').contains('10');
  });

  it('should find and control a file input', () => {
    // There is a plugin that gives a method in Cypress called Attach File
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
