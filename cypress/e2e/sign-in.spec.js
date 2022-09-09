/* eslint-disable no-undef */
/// <reference types="cypress" />

let createAccBtnLoc = '[class="_btnFill_1hv0m_1"]';
let emailValidationLoc =
  '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]';

describe('Sign In Test Suite', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('TC05 Email in Cyrillic', () => {
    cy.get('input[name="email"][type="email"]').type('вася@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.contains(createAccBtnLoc, 'Sign In').click();
    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should(
        'contain',
        "A part followed by '@' should not contain the symbol 'в'.",
      );
  });

  it('TC06 - 36 symbols for the email local part', () => {
    cy.get('input[name="email"][type="email"]').type(
      'gFXdg5TMYad5qdN5iY9hHUm6nZcnF87EP6SE@abc.com',
    ); // exceeds 35 symbols
    cy.get('input[name="password"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Sign In').click();

    cy.get(emailValidationLoc).should('contain', 'Email length is incorrect'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type(
      'gFXdg5TMYd5qdN5iY9hHUm6nZcnF87EP6SE@abc.com',
    ); // now its valid max length value

    cy.get(emailValidationLoc).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC07 - 1 symbol for the email local part required', () => {
    cy.get('input[name="email"][type="email"]').type('@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Sign In').click();

    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should(
        'contain',
        "Please enter a part followed by '@'. '@gmail.com' is incomplete.",
      );

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('a@gmail.com');
    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should('be.empty');
  });

  it('TC08 - 36 symbols for the email domain part', () => {
    cy.get('input[name="email"][type="email"]').type(
      'abc@77FZXg5TMdN5iY9hHUm6nZcnF87EP6SE.com',
    ); // exceeds 35 symbols
    cy.get('input[name="password"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Sign In').click();

    cy.get(emailValidationLoc).should('contain', 'Email length is incorrect'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type(
      'abc@7FZXg5TMdN5iY9hHUm6nZcnF87EP6SE.com',
    ); // now its valid max length value

    cy.get(emailValidationLoc).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC09 - Email local part cannot start with a dot', () => {
    cy.get('input[name="email"][type="email"]').type('.abc123@gmail.com'); // email starts with a dot
    cy.get('input[name="password"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Sign In').click();

    cy.get(emailValidationLoc).should('contain', 'Email is invalid'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com'); // now its valid max length value

    cy.get(emailValidationLoc).should('not.exist'); // therefore the validation error message should disappear
  });
});
