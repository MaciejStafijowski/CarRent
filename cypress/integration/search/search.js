import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let future_pick_up = cy.dayjs().add(1, 'day').format('YYYY-MM-DD')
let future_drop_off = cy.dayjs().add(8, 'day').format('YYYY-MM-DD')

describe('Searching for a car for rent', ()=> {

  Given('user is on search page', () => {
    cy.visit('/')
  });

  When('he fills the search data', () => {
    cy.get('#country').select('1')
    cy.get('#country').should('have.value', '1')
    cy.get('#city').select('1')
    cy.get('#city').should('have.value', '1')
    cy.get('#pickup').type(future_pick_up)
    cy.get('#pickup').should('have.value', future_pick_up)
    cy.get('#dropoff').type(future_drop_off)
    cy.get('#dropoff').should('have.value', future_drop_off)
  });

  And('he use search', ()=> {
    cy.get('.btn').should('contain', 'Search').click()
  });

  Then('search results appears', ()=> {
    cy.get('#search-results').should('be.visible')
  });

  Then('no search results are displayed', ()=> {
    cy.get('#search-results').should('not.exist')
  });

  Given('user has searched for a car', ()=> {
    cy.visit('/')
    cy.get('#country').select('1')
    cy.get('#country').should('have.value', '1')
    cy.get('#city').select('1')
    cy.get('#city').should('have.value', '1')
    cy.get('#pickup').type(future_pick_up)
    cy.get('#pickup').should('have.value', future_pick_up)
    cy.get('#dropoff').type(future_drop_off)
    cy.get('#dropoff').should('have.value', future_drop_off)
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