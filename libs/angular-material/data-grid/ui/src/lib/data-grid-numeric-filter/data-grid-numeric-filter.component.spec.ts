import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridNumericFilterComponent } from './data-grid-numeric-filter.component';
import { NumericFilter } from '@local/angular-material/data-grid/utils';
import { MockModule } from 'ng-mocks';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

describe('DataGridNumericFilterComponent', () => {
  let component: DataGridNumericFilterComponent;
  let fixture: ComponentFixture<DataGridNumericFilterComponent>;

  const testFilter = new NumericFilter({
    value: {min: 0, max: 100},
    column: 'testColumn',
    label: 'Test Label'
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(TranslateModule),
        MockModule(FormsModule),
        MockModule(MatSliderModule)
      ],
      declarations: [
        DataGridNumericFilterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridNumericFilterComponent);
    component = fixture.componentInstance;

    component.filter = testFilter;
    component.minValue = 0;
    component.maxValue = 100;

    fixture.detectChanges();
  });

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('updateFilter()', () => {

    let spyOnRemoveFilter: jest.SpyInstance;
    let spyOnUpdateFilter: jest.SpyInstance;

    beforeEach(() => {
      spyOnRemoveFilter = jest.spyOn(component.removeColumn, 'emit');
      spyOnUpdateFilter = jest.spyOn(component.updateColumn, 'emit');
    });

    test('remove filter', () => {
      component.min = component.minValue;
      component.max = component.maxValue;

      component.updateFilter();

      expect(spyOnRemoveFilter).toHaveBeenCalled();
    });

    test('update filter', () => {
      component.min = 5;
      component.max = 50;
      const updatedFilter = new NumericFilter({
        value: {min: 5, max: 50},
        column: testFilter.column,
        label: testFilter.label
      })

      component.updateFilter();

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(updatedFilter);
    });

    test('update filter with missing column', () => {
      component.filter = undefined;
      component.min = 5;
      const updatedFilter = new NumericFilter({
        value: {min: 5, max: 100},
        column: '',
        label: ''
      })

      component.updateFilter();

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(updatedFilter);
    });
  });

  describe('removedFilter', () => {

    test('reset boolean filter', async () => {
      component.min = 5;
      component.max = 50;

      component.removedFilter = [];

      expect(component.min).toEqual(0);
      expect(component.max).toEqual(100);
    });
  });
});
