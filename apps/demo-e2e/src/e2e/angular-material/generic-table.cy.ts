import { getTable } from "../../support/app.po";

describe("Generic Table", () => {

  let headers: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.visit("/material/generic-table");

    getTable().then(element => {
      headers = element.find('th');
    });
  });

  it('should have 3 columns', () => {
    cy.viewport(1280, 800);

    expect(headers.length).to.eq(3);
  });

  it("should have item column", () => {
    cy.viewport(1920, 1080);

    expect(headers[0].textContent?.trim()).to.eq('Item');
  });
});
