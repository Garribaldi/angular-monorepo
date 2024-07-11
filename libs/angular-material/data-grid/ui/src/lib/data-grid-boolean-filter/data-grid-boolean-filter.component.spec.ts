import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridBooleanFilterComponent } from './data-grid-boolean-filter.component';
import { MockModule } from 'ng-mocks';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BooleanFilter } from '@local/angular-material/data-grid/utils';

describe('DataGridBooleanFilterComponent', () => {
  let component: DataGridBooleanFilterComponent;
  let fixture: ComponentFixture<DataGridBooleanFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatRadioModule),
        MockModule(FormsModule),
        MockModule(TranslateModule)
      ],
      declarations: [
        DataGridBooleanFilterComponent
      ]
    }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridBooleanFilterComponent);
    component = fixture.componentInstance;
    component.filter = new BooleanFilter({value: null, column: 'testColumn', label: 'testLabel'});
    fixture.detectChanges();
  });

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('updateFilter()', () => {

    let spyOnRemoveColumn: jest.SpyInstance;
    let spyOnUpdateColumn: jest.SpyInstance;

    beforeEach(() => {
      spyOnRemoveColumn = jest.spyOn(component.removeColumn, 'emit');
      spyOnUpdateColumn = jest.spyOn(component.updateColumn, 'emit');
    });

    test('remove filter', () => {
      component.updateFilter('');

      expect(spyOnRemoveColumn).toHaveBeenCalled();
      expect(spyOnUpdateColumn).not.toHaveBeenCalled();
    });

    test('update filter with true', () => {
      component.updateFilter('true');

      expect(spyOnRemoveColumn).not.toHaveBeenCalled();
      expect(spyOnUpdateColumn).toHaveBeenCalledWith({column: 'testColumn', displayValue: 'ustay.shared.form.data-grid.captions.yes', id: 'boolean_testColumn', label: 'testLabel', type: 'boolean', value: true});
    });

    test('update filter with false', () => {
      component.updateFilter('false');

      expect(spyOnRemoveColumn).not.toHaveBeenCalled();
      expect(spyOnUpdateColumn).toHaveBeenCalledWith({column: 'testColumn', displayValue: 'ustay.shared.form.data-grid.captions.no', id: 'boolean_testColumn', label: 'testLabel', type: 'boolean', value: false});
    });

    test('no initial Filter set', () => {
      component.filter = undefined;

      component.updateFilter('true');
      expect(spyOnRemoveColumn).not.toHaveBeenCalled();
      expect(spyOnUpdateColumn).toHaveBeenCalledWith({column: '', displayValue: 'ustay.shared.form.data-grid.captions.yes', id: 'boolean_', label: '', type: 'boolean', value: true});

    });
  });

  describe('removedFilter', () => {

    test('reset boolean filter', async () => {
      component.selectedOption = 'true';

      component.removedFilter = [];

      expect(component.selectedOption).toEqual('');
    });
  });
});
