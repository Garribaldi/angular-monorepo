// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    updateSelect: (element: string, value: string) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('updateSelect', (element: string, value: string) => {
  return cy.getEl(element).find('mat-select').click().get('mat-option').contains(value).click();
});
