import { getForm } from "../support/app.po";

describe("reactive forms", () => {

  let inputs: JQuery<HTMLElement>;
  let selects: JQuery<HTMLElement>;
  let button: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.visit("/form");
    cy.viewport(1920, 1080);
  });

  describe('default form', () => {

    beforeEach(() => {
      getForm().then(element => {
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

    it('should disable submit button', () => {
      expect((button[0] as HTMLButtonElement).disabled).to.be.true;
    });
  });

  describe('filled out form', () => {

    it('should disable send button', () => {
      cy.updateInput('mat-input-2', 'test@test.com');
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should enable send button', () => {
      cy.updateInput('mat-input-2', 'test@test.com');
      cy.updateInput('mat-input-3', 'aBcD12$eFg');
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('mat-select[id=mat-select-2]').click().get('mat-option').contains('United States').click();
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get('mat-select[id=mat-select-0]').click().get('mat-option').contains('Miami').click();

      cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('should show error for invalid eMail', () => {
      cy.updateInput('mat-input-2', 'testneu').blur();
      cy.get('mat-error[id=mat-mdc-error-2]').should('contain', 'Please enter a valid eMail');
    });

    it('should show error for invalid password', () => {
      cy.updateInput('mat-input-2', 'test@test.com');
      cy.updateInput('mat-input-3', '123456').blur();
      cy.get('mat-error[id=mat-mdc-error-3]')
        .should('contain', 'Your password must be at least 8 characters long.')
        .should('contain', 'Your password must have lower case, upper case and numeric or special characters');
    });
  });
});
