/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    // alias for the filterInput and allItems
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"] ').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  it('should filter items', () => {
    // type a search term in that filter
    cy.get('@filterInput').type('iPhone');

    // verify only items matching filter are shown
    cy.get('@allItems').each(($item) => {
      expect($item.text()).to.include('iPhone');
    });

    // Other alternative
    // cy.get('@allItems').should('not.contain.text', 'Hoddie');
  });

  it('should move items from one list to the other', () => {
    cy.get('@unpackedItems').find('li').first().as('itemInQuestion');
    cy.get('@itemInQuestion').find('label').as('itemLabel');
    cy.get('@itemLabel').invoke('text').as('itemName');

    cy.get('@itemLabel').click();

    cy.get('@itemName').then((text) => {
      cy.get('@packedItems').contains(text);
    });

    // Other alternative
    // cy.get('@itemLabel')
    //   .invoke('text')
    //   .then((text) => {
    //     cy.get('@itemLabel').click();
    //     cy.get('@packedItems').contains(text);
    //   });
  });
});
