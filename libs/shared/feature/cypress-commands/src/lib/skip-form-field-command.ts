// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    skipFormField: (identifier: string) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('skipFormField', (identifier: string) => {
  return cy.get(identifier).focus().blur();
});
