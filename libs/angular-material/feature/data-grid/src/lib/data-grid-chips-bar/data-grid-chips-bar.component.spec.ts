import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridChipsBarComponent } from './data-grid-chips-bar.component';
import { MatChipsModule } from "@angular/material/chips";
import { MockModule } from "ng-mocks";
import { Filter } from "../models/filter.model";
import { GroupedFilter } from "../models/grouped-filter.model";
import { ToSlashCasePipe } from "@local/shared/utils";
import { MatIconModule } from "@angular/material/icon";

describe('DataGridChipsBarComponent', () => {
  let component: DataGridChipsBarComponent;
  let fixture: ComponentFixture<DataGridChipsBarComponent>;

  const testFilter = {id: '12345', value: 'Test Filter', label: 'Test Label'} as Filter;
  const testGroupedFilter: GroupedFilter = new Map<string, Filter[]>();
  testGroupedFilter.set('test-column', [testFilter]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatChipsModule),
        MockModule(MatIconModule)
      ],
      declarations: [
        DataGridChipsBarComponent,
        ToSlashCasePipe
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridChipsBarComponent);
    component = fixture.componentInstance;
    component.groupedFilter = testGroupedFilter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('remove()', () => {
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => spyOnRemoveFilter = jest.spyOn(component.removeFilter, 'emit'));

    it('should remove filter', () => {
      component.remove(testFilter);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testFilter);
    });
  });

  describe('removeAll()', () => {
    let spyOnRemoveAllFilter: jest.SpyInstance;

    beforeEach(() => spyOnRemoveAllFilter = jest.spyOn(component.removelAllFilter, 'emit'));

    it('should remove filter', () => {
      component.removeAll();

      expect(spyOnRemoveAllFilter).toHaveBeenCalled();
    });
  });
});
