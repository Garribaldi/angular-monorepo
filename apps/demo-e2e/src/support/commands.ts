// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    clickCheckFilter(subject: JQuery<HTMLElement>): void;
    clickDateFilter(subject: JQuery<HTMLElement>): void;
  }
}

Cypress.Commands.add("clickCheckFilter", (subject: JQuery<HTMLElement>) => {
  subject.find('button[mattreenodetoggle]').click();
});

Cypress.Commands.add("clickDateFilter", (subject: JQuery<HTMLElement>) => {
  subject.find('button[mattreenodetoggle]').click();
});
