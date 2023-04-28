import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ColumnDef, Employee } from '@local/shared/data-access';
import { MockModule, MockPipe } from 'ng-mocks';
import { GetTemplateRefPipe } from '@local/shared/utils';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatHeaderCellHarness, MatRowHarness, } from '@angular/material/table/testing';
import { SimpleChange } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenericTableComponent } from "./generic-table.component";

describe('GenericTableComponent', () => {
  const testData: Employee[] = [
    {firstName: 'Employee', lastName: 'One'},
    {firstName: 'Employee', lastName: 'Two'},
  ];

  const testColumnDef: ColumnDef = {
    firstName: 'First Name',
    lastName: 'Last Name',
  };

  let component: GenericTableComponent<Employee>;
  let fixture: ComponentFixture<GenericTableComponent<Employee>>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MockModule(MatFormFieldModule),
        MockPipe(GetTemplateRefPipe),
      ],
      declarations: [GenericTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponent<Employee>);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Simple table with data and column definition', () => {
    beforeEach(() => {
      component.columnDefinition = testColumnDef;
      component.tableData = testData;
      component.ngOnChanges({
        columnDefinition: new SimpleChange(null, testColumnDef, true),
      });
    });

    test('table headers with harness', async () => {
      const headerCells = await loader.getAllHarnesses(
        MatHeaderCellHarness.with({selector: '.mat-header-cell'})
      );

      expect(headerCells.length).toEqual(2);
      expect(await headerCells.at(0)?.getText()).toEqual(
        testColumnDef['firstName']
      );
      expect(await headerCells.at(1)?.getText()).toEqual(
        testColumnDef['lastName']
      );
    });

    test('table rows with harness', async () => {
      const tableRows = await loader.getAllHarnesses(MatRowHarness);
      const tableCells = await tableRows.at(0)?.getCells();

      expect(tableRows.length).toEqual(2);
      expect(tableCells?.length).toEqual(2);
      expect(await tableCells?.at(0)?.getText()).toContain(
        testData[0].firstName
      );
      expect(await tableCells?.at(1)?.getText()).toContain(
        testData[0].lastName
      );
    });
  });
});
