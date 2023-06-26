// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    skipFormField: (element: string, field: string) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('skipFormField', (element: string, field: string) => {
  return cy.getEl(element).find(field).focus().blur();
});
