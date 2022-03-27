/// <reference types="cypress" />

const pokemon = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.get('@search').type('psy');
    // This will fail, if the wait is not triggered in the allotted amount of time.
    cy.wait('@api');
  });

  it('should update the query parameter', () => {
    cy.get('@search').type('psy');
    cy.wait('@api');
    cy.location('search').should('equal', '?name=psy');
  });

  it('should call the API with correct query parameter', () => {
    cy.get('@search').type('psy');
    cy.wait('@api').its('request.url').should('contain', 'name=psy');

    // Other alternative
    // cy.wait('@api').then((interception) => console.log(interception));
    // cy.wait('@api').then((interception) => {
    //   expect(interception.request.url).to.contain('name=psy');
    // });
  });

  it('should pre-populate the search field with the query parameter', () => {
    cy.visit({ url: '/pokemon-search', qs: { name: 'pik' } });
    cy.wait('@api').its('request.url').should('contain', 'name=pik');
  });

  it.only('should render the results to the page', () => {
    // Everytime we hit this endpoint, we'll receive this value no matter what.
    // Alternative A: JavaScript Object
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed');
    cy.get('@search').type('ivy');

    // Alternative B: Fixture
    cy.intercept('/pokemon-search/api/1', { fixture: 'Bulbasaur' }).as('bulbaFixture');
    cy.get('[data-test="results"] a').first().click();
  });

  it('should link to the correct pokémon', () => {});

  it('should persist the query parameter in the link to a pokémon', () => {});

  it('should bring you to the route for the correct pokémon', () => {});

  it('should immediately fetch a pokémon if a query parameter is provided', () => {});
});
