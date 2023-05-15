import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MockModule, MockProvider } from "ng-mocks";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { of } from "rxjs";
import moment from "moment";
import { DateFilter } from "../models/date-filter.model";

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;
  let selectFilterService: SelectedFilterStateService;

  const testLabel = 'Test Label';
  const testColumn = 'test-column';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule)
      ],
      declarations: [DataGridDateFilterComponent],
      providers: [
        MockProvider(SelectedFilterStateService, {
          removedFilter$: of([]),
          updateFilterByColumn: jest.fn(),
          removeFilterByColumn: jest.fn()
        })
      ]
    }).compileComponents();

    selectFilterService = TestBed.inject(SelectedFilterStateService);

    fixture = TestBed.createComponent(DataGridDateFilterComponent);
    component = fixture.componentInstance;

    component.label = testLabel;
    component.column = testColumn;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('datePickerClosed()', () => {
    let spyOnUpdateFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      spyOnUpdateFilter = jest.spyOn(selectFilterService, 'updateFilterByColumn');
      spyOnRemoveFilter = jest.spyOn(selectFilterService, 'removeFilterByColumn');

    });

    it('should update date filter', () => {
      component.fromDate = moment();
      component.toDate = moment();

      component.datePickerClosed();

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expect.any(DateFilter), testColumn);
    });

    it('should remove date filter', () => {
      component.fromDate = null;
      component.toDate = null;

      component.datePickerClosed();

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testColumn);
    });
  });

  describe('onKeyUp()', () => {
    let spyOnUpdateFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      spyOnUpdateFilter = jest.spyOn(selectFilterService, 'updateFilterByColumn');
      spyOnRemoveFilter = jest.spyOn(selectFilterService, 'removeFilterByColumn');

    });

    it('should update date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = moment();
      component.toDate = moment();

      component.onKeyUp(event);

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expect.any(DateFilter), testColumn);
    });

    it('should remove date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = null;
      component.toDate = null;

      component.onKeyUp(event);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testColumn);
    });

    it('should not do anything on "Tab"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Tab', code: 'Tab'});
      component.fromDate = moment();
      component.toDate = moment();

      component.onKeyUp(event);

      expect(spyOnUpdateFilter).not.toHaveBeenCalled();
      expect(spyOnRemoveFilter).not.toHaveBeenCalled();
    });
  });
});
