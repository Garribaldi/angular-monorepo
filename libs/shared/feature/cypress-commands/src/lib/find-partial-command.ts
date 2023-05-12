// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    findPartial: (identifier: string, element?: JQuery<HTMLElement>) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('findPartial', (identifier: string, element?: JQuery<HTMLElement>) => {
  if (element) {
    return cy.wrap(element).find(`[data-cy*="${identifier}"]`);
  }

  return cy.get(`[data-cy*="${identifier}"]`);
});
