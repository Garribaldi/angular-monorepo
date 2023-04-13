import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableComponent } from './mat-table.component';
import { MatCell, MatRow, MatTableModule } from "@angular/material/table";
import { ColumnDef, Employee } from "@local/shared/data-access";
import { By } from "@angular/platform-browser";
import { SimpleChange } from "@angular/core";
import { MockPipe } from "ng-mocks";
import { GetTemplateRefPipe } from "@local/shared/utils";

describe('MatTableComponent', () => {

  const testData: Employee[] = [
    {firstName: 'Employee', lastName: 'One'},
    {firstName: 'Employee', lastName: 'Two'}
  ];

  const testColumnDef: ColumnDef = {
    firstName: 'First Name',
    lastName: 'Last Name'
  };

  let component: MatTableComponent<Employee>;
  let fixture: ComponentFixture<MatTableComponent<Employee>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MockPipe(GetTemplateRefPipe)
      ],
      declarations: [MatTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableComponent<Employee>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Simple table', () => {

    beforeEach(() => {
      component.columnDefinition = testColumnDef;
      component.tableData = testData;
      component.ngOnChanges({columnDefinition: new SimpleChange(null, testColumnDef, true)})

      fixture.detectChanges();
    });

    test('table headers are created', () => {
      const tableHeaders = fixture.debugElement.queryAll(By.css('th'));

      expect(tableHeaders.length).toEqual(2);
      expect(tableHeaders[0].nativeElement.innerHTML).toEqual(testColumnDef['firstName']);
      expect(tableHeaders[1].nativeElement.innerHTML).toEqual(testColumnDef['lastName']);
    });

    test('table rows are created', () => {
      const tableRows = fixture.debugElement.queryAll(By.directive(MatRow));
      const tableCells = tableRows[0].queryAll(By.directive(MatCell));

      expect(tableRows.length).toEqual(2);
      expect(tableCells.length).toEqual(2);
      expect(tableCells[0].nativeElement.innerHTML).toContain(testData[0].firstName);
      expect(tableCells[1].nativeElement.innerHTML).toContain(testData[0].lastName);
    });
  });
});
