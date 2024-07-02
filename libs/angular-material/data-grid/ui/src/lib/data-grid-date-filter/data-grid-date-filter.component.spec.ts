import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MockModule } from 'ng-mocks';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { TranslateModule } from '@ngx-translate/core';
import { testDateFilter } from '../../test-setup';
import { DateFilter } from '@local/angular-material/data-grid/utils';

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule),
        MockModule(TranslateModule)
      ],
      declarations: [
        DataGridDateFilterComponent
      ]
    }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridDateFilterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('fromDateChanged', () => {

    test('change from date', () => {
      const testDate = moment();
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const event = {value: testDate} as MatDatepickerInputEvent<any, any>;

      component.fromDateChanged(event);

      expect(component.fromDate).toEqual(testDate);
    });
  });

  describe('toDateChanged', () => {

    test('change to date', () => {
      const testDate = moment();
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const event = {value: testDate} as MatDatepickerInputEvent<any, any>;

      component.toDateChanged(event);

      expect(component.toDate).toEqual(testDate);
    });
  });

  describe('datePickerClosed()', () => {

    let spyOnUpdateFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      spyOnUpdateFilter = jest.spyOn(component.updateColumn, 'emit');
      spyOnRemoveFilter = jest.spyOn(component.removeColumn, 'emit');
    });

    test('update date filter', () => {
      const testDate = moment();
      const expectedResult = {...testDateFilter, value: {from: testDate, to: testDate}, displayValue: `${testDate.format('L')} - ${testDate.format('L')}`} as unknown as DateFilter;
      component.filter = testDateFilter;
      component.fromDate = testDate;
      component.toDate = testDate;

      component.datePickerClosed();

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expectedResult);
    });

    test('remove date filter', () => {
      component.fromDate = null;
      component.toDate = null;

      component.datePickerClosed();

      expect(spyOnRemoveFilter).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {

    let spyOnUpdateFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      spyOnUpdateFilter = jest.spyOn(component.updateColumn, 'emit');
      spyOnRemoveFilter = jest.spyOn(component.removeColumn, 'emit');
    });

    test('update date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = moment();
      component.toDate = moment();

      component.onKeyUp(event);

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expect.any(DateFilter));
    });

    test('remove date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = null;
      component.toDate = null;

      component.onKeyUp(event);

      expect(spyOnRemoveFilter).toHaveBeenCalled();
    });

    test('do not do anything on "Tab"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Tab', code: 'Tab'});
      component.fromDate = moment();
      component.toDate = moment();

      component.onKeyUp(event);

      expect(spyOnUpdateFilter).not.toHaveBeenCalled();
      expect(spyOnRemoveFilter).not.toHaveBeenCalled();
    });
  });

  describe('removedFilter', () => {

    const testDate = moment();

    beforeEach(() => {
      component.fromDate = testDate;
      component.toDate = testDate;
    });

    test('empty array', () => {
      component.filter = testDateFilter;
      fixture.detectChanges();

      component.removedFilter = [];

      expect(component.fromDate).toBeNull();
      expect(component.toDate).toBeNull();
    });
  });
});
