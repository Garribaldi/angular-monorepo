// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    updateInput: (identifier: string, value: string) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('updateInput', (identifier: string, value: string) => {
  return cy.get(`input[id=${identifier}]`).type(value);
});
