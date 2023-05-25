import { getTable } from "../../support/app.po";

describe("Generic Table", () => {

  let headers: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/material/generic-table");

    getTable().then(element => {
      headers = element.find('th');
    });
  });

  it('should have 3 columns', () => {
    expect(headers.length).to.eq(3);
  });

  it("should have item column", () => {
    expect(headers[0].textContent?.trim()).to.eq('Item');
  });
});
