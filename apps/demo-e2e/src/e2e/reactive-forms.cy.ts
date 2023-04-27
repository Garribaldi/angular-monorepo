import { getForm } from "../support/app.po";

describe("reactive forms", () => {

  let inputs: JQuery<HTMLElement>;
  let selects: JQuery<HTMLElement>;
  let button: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.visit("/form");
    cy.viewport(1920, 1080);

    getForm().then(element => {
      inputs = element.find('input');
      selects = element.find('mat-select');
      button = element.find('button[type="submit"]');
    });
  });

  describe('default form', () => {

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

  describe('fill out form', () => {

    it('should enable send button', () => {
      (inputs[2] as HTMLInputElement).value = 'test@test.com';
      (inputs[3] as HTMLInputElement).value = 'aBcD12$eFg';
      // (selects[0] as HTMLSelectElement).value =
    });
  });
});
