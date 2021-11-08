import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const url = 'http://qalab.pl.tivixlabs.com/'

describe('Searching for a car for rent', ()=> {

  Given('user is on search page', () => {
    cy.visit(url)
  });

  When('he fills the search data', () => {
    cy.get('#country').select('1')
    cy.get('#country').should('have.value', '1')
    cy.get('#city').select('1')
    cy.get('#city').should('have.value', '1')
    cy.get('#pickup').type('2021-11-20')
    cy.get('#pickup').should('have.value', '2021-11-20')
    cy.get('#dropoff').type('2021-11-22')
    cy.get('#dropoff').should('have.value', '2021-11-22')
  });

  And('he use search', ()=> {
    cy.get('.btn').should('contain', 'Search').click()
  });

  Then('search results appears', ()=> {
    cy.get('#search-results').should('be.visible')
  });

  Then('no search results are displayed', ()=> {
    cy.get('#search-results').should('not.be.visible')
  });

  Given('user has searched for a car', ()=> {
    cy.visit(url)
    cy.get('#country').select('1')
    cy.get('#country').should('have.value', '1')
    cy.get('#city').select('1')
    cy.get('#city').should('have.value', '1')
    cy.get('#pickup').type('2021-11-20')
    cy.get('#pickup').should('have.value', '2021-11-20')
    cy.get('#dropoff').type('2021-11-22')
    cy.get('#dropoff').should('have.value', '2021-11-22')
    cy.get('.btn').should('contain', 'Search').click()
  });

  When('choose car for rent', ()=> {
    cy.contains('Toyota RAV4')
      .parent()
      .find('.btn')
      .click()
  });

  Then('see car details', ()=> {
    cy.get('.card-title').should('contain', 'Company: Charles-Alvarez')
    cy.get('.card-text').should('contain', 'Price per day: 51$')
    cy.get('.card-text').should('contain', 'Location: Poland, Wroclaw')
    cy.get('.card-text').should('contain', 'License plate: 9W 3J3KBI')
  });

});