import { getReactiveForm } from "../../support/app.po";

describe("Reactive Forms", () => {

  beforeEach(() => {
    cy.intercept('GET', 'employees', {fixture: 'employees.json'}).as('getEmployees');
    cy.intercept('GET', 'cities', {fixture: 'cities.json'}).as('getCities');
    cy.intercept('GET', 'countries', {fixture: 'countries.json'}).as('getCountries');

    cy.viewport(1920, 1080);
    cy.visit("/forms/reactive-forms");
    cy.wait('@getEmployees');
  });

  describe('default form', () => {

    let inputs: JQuery<HTMLElement>;
    let selects: JQuery<HTMLElement>;
    let button: JQuery<HTMLElement>;

    beforeEach(() => {
      getReactiveForm().then(element => {
        inputs = element.find('input');
        selects = element.find('mat-select');
        button = element.find('button[type="submit"]');
      });
    });

    it("should have 4 inputs", () => {
      expect(inputs.length).to.eq(4);
    });

    it('should have input with value "Employee"', () => {
      expect((inputs[0] as HTMLInputElement).value).to.eq('Employee');
    });

    it('should have 2 selects', () => {
      expect(selects.length).to.eq(2);
    });

    it('should have submit button', () => {
      expect(button.length).to.eq(1);
      expect(button).not.to.be.undefined;
    });
  });

  describe('filled out form', () => {

    const email = 'reactive-form-email';
    const password = 'reactive-form-password';
    const cities = 'reactive-form-cities';
    const countries = 'reactive-form-countries';
    const submit = 'reactive-form-submit';

    it('should disable submit button', () => {
      cy.updateInput(email, 'test@test.com');

      cy.getEl(submit).should('be.disabled');
    });

    it('should enable send button', () => {
      cy.updateInput(email, 'test@test.com');
      cy.updateInput(password, 'aBcD12$eFg');

      cy.updateSelect(cities, 'Miami');
      cy.updateSelect(countries, 'United States');

      cy.getEl(submit).should('not.be.disabled');
    });

    it('should show error for invalid eMail', () => {
      cy.updateInput(email, 'testneu').blur();

      cy.getEl(email).find('mat-error')
        .should('contain', 'Please enter a valid eMail');
    });

    it('should show error for invalid password', () => {
      cy.updateInput(email, 'test@test.com');
      cy.updateInput(password, '123456').blur();

      cy.getEl(password).find('mat-error')
        .should('contain', 'Your password must be at least 8 characters long.')
        .should('contain', 'Your password must have lower case, upper case and numeric or special characters');
    });

    it('should show error for missing city select', () => {
      cy.updateInput(email, 'test@test.com');
      cy.updateInput(password, 'aBcD12$eFg');

      cy.skipFormField(cities, 'mat-select');
      cy.updateSelect(countries, 'United States');

      cy.getEl(cities).find('mat-error')
        .should('contain', 'Please choose a city');
    });

    it('should show error for missing country select', () => {
      cy.updateInput(email, 'test@test.com');
      cy.updateInput(password, 'aBcD12$eFg');

      cy.updateSelect(cities, 'Miami');
      cy.skipFormField(countries, 'mat-select');

      cy.getEl(countries).find('mat-error')
        .should('contain', 'Please choose a country');
    });
  });
});
