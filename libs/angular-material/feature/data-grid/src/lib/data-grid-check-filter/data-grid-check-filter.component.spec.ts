import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridCheckFilterComponent } from './data-grid-check-filter.component';
import { MockModule, MockProvider } from "ng-mocks";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { of } from "rxjs";
import { MatTreeModule } from "@angular/material/tree";
import { Filter } from "../models/filter.model";
import { FilterNestedNode } from "../models/filter-nested-node.model";
import { MatCheckboxChange } from "@angular/material/checkbox";

describe('DataGridTextFilterComponent', () => {
  let component: DataGridCheckFilterComponent;
  let fixture: ComponentFixture<DataGridCheckFilterComponent>;
  let selectedFilterServicec: SelectedFilterStateService;

  const testColumn = 'testColumn';
  const testFilter = [{label: 'Test', value: 'Test', displayValue: 'Test', hitCount: 1, column: testColumn} as Filter];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatTreeModule)
      ],
      declarations: [DataGridCheckFilterComponent],
      providers: [
        MockProvider(SelectedFilterStateService, {
          removedFilter$: of([]),
          resetAll$: of(void ''),
          addFilter: jest.fn(),
          removeFilter: jest.fn(),
          removeFiltersByColumn: jest.fn()
        }),
      ]
    }).compileComponents();

    selectedFilterServicec = TestBed.inject(SelectedFilterStateService);

    fixture = TestBed.createComponent(DataGridCheckFilterComponent);

    component = fixture.componentInstance;
    component.filter = testFilter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('nodeClicked()', () => {
    let node: FilterNestedNode;
    let changeEvent: MatCheckboxChange;

    let spyOnAddFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      node = component.dataSource.data[0].children?.at(0) ?? {} as FilterNestedNode;
      changeEvent = new MatCheckboxChange();

      spyOnAddFilter = jest.spyOn(selectedFilterServicec, 'addFilter')
      spyOnRemoveFilter = jest.spyOn(selectedFilterServicec, 'removeFilter');
    });

    it('should add filter', () => {
      changeEvent.checked = true;

      component.nodeClicked(node, changeEvent);

      expect(spyOnAddFilter).toHaveBeenCalledWith(testFilter[0]);
      expect(component.filtersSelected).toEqual(1);
    });


    it('should remove filter', () => {
      changeEvent.checked = false;

      component.nodeClicked(node, changeEvent);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testFilter[0]);
      expect(component.filtersSelected).toEqual(0);
    });

    it('should not update filter list', () => {
      node.value = 'Test neu';

      component.nodeClicked(node, changeEvent);

      expect(spyOnAddFilter).not.toHaveBeenCalled();
      expect(spyOnRemoveFilter).not.toHaveBeenCalled();
    });
  });

  describe('resetFilter()', () => {

    let spyOnRemoveFiltersByColumn: jest.SpyInstance;

    beforeEach(() => spyOnRemoveFiltersByColumn = jest.spyOn(selectedFilterServicec, 'removeFiltersByColumn'));

    it('should remove all filters from column', () => {
      component.filtersSelected = 1;

      component.resetFilter();

      expect(spyOnRemoveFiltersByColumn).toHaveBeenCalledWith(testColumn);
      expect(component.filtersSelected).toEqual(0);
    });
  });
});
