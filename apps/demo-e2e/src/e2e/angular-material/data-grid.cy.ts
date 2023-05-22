import { getDataGridChipsBar, getDataGridColumns, getDataGridTable } from "../../support/app.po";

describe("Data Grid", () => {

  let dataTable: JQuery<HTMLElement>;
  let filter: JQuery<HTMLElement>;
  let chipsBar: JQuery<HTMLElement>;

  let teamIdFilter: JQuery<HTMLElement>;
  let teamNameFilter: JQuery<HTMLElement>;
  let locationFilter: JQuery<HTMLElement>;
  let dateFilter: JQuery<HTMLElement>;

  beforeEach(() => {
    cy.intercept('GET', 'nba-teams.json').as('getAllTeams');

    cy.viewport(1920, 1080);
    cy.visit("/material/data-grid");
    cy.wait('@getAllTeams');

    getDataGridColumns().then(columns => {
      console.log(columns);

      filter = columns;
      teamIdFilter = filter.eq(0);
      teamNameFilter = filter.eq(1);
      locationFilter = filter.eq(2);
      dateFilter = filter.eq(3);
    });
    getDataGridTable().then(table => {
      dataTable = table;
    });
  });

  function getRowCount(): number {
    return dataTable.find('tbody tr').length;
  }

  function getFilterSelectorById(id: number): string {
    return `mat-tree-node:nth-child(${id + 1}) input[type="checkbox"]`;
  }

  it('should have data table with 31 rows', () => {
    expect(dataTable).not.to.be.undefined;
    expect(getRowCount()).to.eq(30);
  });

  it("should have 4 filter columns", () => {
    expect(filter.length).to.eq(4);
  });

  describe('Filter actions', () => {

    beforeEach(() => {
      // Team Id
      cy.clickCheckFilter(teamIdFilter);
      teamIdFilter.find(getFilterSelectorById(3)).click();
      teamIdFilter.find(getFilterSelectorById(4)).click();
      teamIdFilter.find(getFilterSelectorById(5)).click();

      // Team Name
      cy.clickCheckFilter(teamNameFilter);
      teamNameFilter.find(getFilterSelectorById(3)).click();
      teamNameFilter.find(getFilterSelectorById(4)).click();
      teamNameFilter.find(getFilterSelectorById(5)).click();
      teamNameFilter.find(getFilterSelectorById(6)).click();

      // Location
      cy.clickCheckFilter(locationFilter);
      locationFilter.find(getFilterSelectorById(3)).click();
      locationFilter.find(getFilterSelectorById(4)).click();
      locationFilter.find(getFilterSelectorById(5)).click();
      locationFilter.find(getFilterSelectorById(6)).click();
      locationFilter.find(getFilterSelectorById(7)).click();

      // Date
      cy.wrap(dateFilter).find('input[matstartdate]').type('02.05.2023');
      cy.wrap(dateFilter).find('input[matenddate]').type('03.05.2023{enter}');

      getDataGridChipsBar().then(chips => {
        chipsBar = chips;
      })
    });

    it('should show 3 remaining entries', () => {
      expect(getRowCount()).to.eq(2);
    });

    it('should unselect first team id', () => {
      teamIdFilter.find(getFilterSelectorById(4)).click();

      expect(getRowCount()).to.eq(1);
    });

    it('should reset team id column', () => {
      teamIdFilter.find('[data-cy="data-grid-mat-check-reset"]').click();

      expect(getRowCount()).to.eq(3);
      expect(teamIdFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
    });

    it('should reset team name column', () => {
      teamNameFilter.find('[data-cy="data-grid-mat-check-reset"]').click();

      expect(getRowCount()).to.eq(2);
      expect(teamNameFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
    });

    it('should reset location column', () => {
      locationFilter.find('[data-cy="data-grid-mat-check-reset"]').click();

      expect(getRowCount()).to.eq(2);
      expect(locationFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
    });

    it('should reset date column', () => {
      chipsBar.find('[data-cy="data-grid-chiplist-date"]').find('button[matchipremove]').click();

      expect(getRowCount()).to.eq(3);
    });

    it('should reset all columns', () => {
      chipsBar.find('[data-cy="data-grid-chiplist-remove-all"]').find('button[matchipremove]').click();

      expect(getRowCount()).to.eq(30);
      expect(teamIdFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
      expect(teamNameFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
      expect(locationFilter.find('[data-cy="data-grid-mat-check-reset"]').prop('disabled')).to.be.true;
    });
  });
});
