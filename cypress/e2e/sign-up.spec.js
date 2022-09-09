/* eslint-disable no-undef */
/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function userID_Alpha() {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
let createAccBtnLoc = '[class="_btnFill_1hv0m_1"]';
let emailValidationLoc =
  '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]';

describe('Sign Up Test Suite', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('TC 12 - 36 symbols for the email local part', () => {
    cy.get('input[name="name"][type="text"]').type('Joe With Big Email');
    cy.get('input[name="email"][type="email"]').type(
      'gFXdg5TMYad5qdN5iY9hHUm6nZcnF87EP6SE@abc.com',
    ); // exceeds 35 symbols
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(emailValidationLoc).should('contain', 'Email length is incorrect'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type(
      'gFXdg5TMYd5qdN5iY9hHUm6nZcnF87EP6SE@abc.com',
    ); // now its valid max length value

    cy.get(emailValidationLoc).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC 13 - Email local part cannot start with a dot', () => {
    cy.get('input[name="name"][type="text"]').type('John Dotter');
    cy.get('input[name="email"][type="email"]').type('.abc123@gmail.com'); // email starts with a dot
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Email is invalid'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com'); // now its valid max length value

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC 14 - Email local part cannot end with a dot', () => {
    cy.get('input[name="name"][type="text"]').type('John Dotter');
    cy.get('input[name="email"][type="email"]').type('abc123.@gmail.com'); // email starts with a dot
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Email is invalid'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com'); // now its valid max length value

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC15 - 1 symbol for the email local part required', () => {
    cy.get('input[name="name"][type="text"]').type('NoLocalpart NoLove');
    cy.get('input[name="email"][type="email"]').type('@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').clear();

    cy.contains(createAccBtnLoc, 'Create Account').click();

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

  it('TC16 - 36 symbols for the email domain part', () => {
    cy.get('input[name="name"][type="text"]').type('Joe With Big Email');
    cy.get('input[name="email"][type="email"]').type(
      'abc@77FZXg5TMdN5iY9hHUm6nZcnF87EP6SE.com',
    ); // exceeds 35 symbols
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Email length is incorrect'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type(
      'abc@7FZXg5TMdN5iY9hHUm6nZcnF87EP6SE.com',
    ); // now its valid max length value

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC17 - Email domain part cannot start with a hyphen', () => {
    cy.get('input[name="name"][type="text"]').type('Hyphen Fan');
    cy.get('input[name="email"][type="email"]').type('abc123@-mail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please enter an email address.');
  });

  it('TC18 - Email domain part cannot end with a hyphen', () => {
    cy.get('input[name="name"][type="text"]').type('Hyphen Fan');
    cy.get('input[name="email"][type="email"]').type('abc123@mail-.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please enter an email address.');
  });

  it('TC19 Email in Cyrillic', () => {
    cy.get('input[name="name"][type="text"]').type('Cyrillics Fan');
    cy.get('input[name="email"][type="email"]').type('вася@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should(
        'contain',
        "A part followed by '@' should not contain the symbol 'в'.",
      );
  });

  it('TC20 Email should contain @ symbol', () => {
    cy.get('input[name="name"][type="text"]').type('Lost Dog');
    cy.get('input[name="email"][type="email"]').type('abc123mail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('input[name="email"][type="email"]')
      .invoke('prop', 'validationMessage')
      .should(
        'contain',
        "Please include an '@' in the email address. 'abc123mail.com' is missing an '@'.",
      );
  });

  it('TC21 - Email domain part should contain a dot', () => {
    cy.get('input[name="name"][type="text"]').type('John Without Dot');
    cy.get('input[name="email"][type="email"]').type('abc123@mailcom');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Email is invalid'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com'); // now its valid max length value

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC22 - Email can have spaces before and after', () => {
    cy.get('input[name="name"][type="text"]').type('John Without Dot');
    cy.get('input[name="email"][type="email"]').type(
      ' ' + userID_Alpha() + '@mail.com ',
    );
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('#alert-dialog-title').should('contain', 'Successful registration');
  });

  it('TC23 - Email cannot contain only a string of spaces', () => {
    cy.get('input[name="name"][type="text"]').type('Empty Edward');
    cy.get('input[name="email"][type="email"]').type('                     ');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Email is required'); // checking validation

    cy.get('input[name="email"][type="email"]').clear();
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com'); // now it's valid

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });

  it('TC24 - Full name can have spaces before and after', () => {
    const randomName = userID_Alpha();
    cy.get('input[name="name"][type="text"]').type(' ' + randomName + ' ');
    cy.get('input[name="email"][type="email"]').type(randomName + '@mail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get('#alert-dialog-title').should('contain', 'Successful registration');
  });

  it('TC25 - Full name cannot contain only a string of spaces', () => {
    cy.get('input[name="name"][type="text"]').type('                     ');
    cy.get('input[name="email"][type="email"]').type('abc123@gmail.com');
    cy.get('input[name="password"][type="password"]').type('11111111');
    cy.get('input[name="repeatPassword"][type="password"]').type('11111111');

    cy.contains(createAccBtnLoc, 'Create Account').click();

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('contain', 'Full name is required'); // checking validation

    cy.get('input[name="name"][type="text"]').clear();
    cy.get('input[name="name"][type="text"]').type('Normal name'); // now it's valid

    cy.get(
      '[class="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-filled _error_mdd7a_38 css-j7o63n"]',
    ).should('not.exist'); // therefore the validation error message should disappear
  });
});
