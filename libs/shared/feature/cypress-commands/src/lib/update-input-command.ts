// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    updateInput: (element: string, value: string) => Chainable<JQuery<HTMLInputElement>>;
  }
}

Cypress.Commands.add('updateInput', (element: string, value: string) => {
  return cy.getEl(element).find('input').type(value) ;
});
