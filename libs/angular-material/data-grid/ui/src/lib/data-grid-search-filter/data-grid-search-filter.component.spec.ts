import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridSearchFilterComponent } from './data-grid-search-filter.component';
import { firstValueFrom } from 'rxjs';
import { MockModule } from 'ng-mocks';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { testSearchFilter } from '../../test-setup';

describe('DataGridSearchFilterComponent', () => {
  let component: DataGridSearchFilterComponent;
  let fixture: ComponentFixture<DataGridSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        FontAwesomeTestingModule
      ],
      declarations: [
        DataGridSearchFilterComponent
      ]
    }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridSearchFilterComponent);
    component = fixture.componentInstance;
    component.filter = testSearchFilter;

    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('searchphraseChanged()', () => {

    let spyOnUpdateColumn: jest.SpyInstance;
    let spyOnRemoveColumn: jest.SpyInstance;

    beforeEach(() => {
      spyOnUpdateColumn = jest.spyOn(component.updateColumn, 'emit');
      spyOnRemoveColumn = jest.spyOn(component.removeColumn, 'emit');
    });

    test('update new search filter', async () => {
      const event = {target: {value: 'test'}} as unknown as Event;

      component.searchphraseChanged(event);

      const result = await firstValueFrom(component.searchphrase$);
      expect(result.currentSearch).toEqual('test');
      expect(spyOnUpdateColumn).toHaveBeenCalledWith({
        column: testSearchFilter.column,
        displayValue: 'test',
        id: `${testSearchFilter.type}_${testSearchFilter.column}`,
        label: testSearchFilter.label,
        type: 'search',
        value: 'test'
      });
    });

    test('reset search filter', async () => {
      const event = {target: {value: ''}} as unknown as Event;

      component.searchphraseChanged(event);

      const result = await firstValueFrom(component.searchphrase$);
      expect(result.currentSearch).toEqual('');
      expect(spyOnUpdateColumn).not.toHaveBeenCalled();
      expect(spyOnRemoveColumn).toHaveBeenCalled();
    });

    test('no initial filter set', async () => {
      const event = {target: {value: 'test'}} as unknown as Event;
      component.filter = undefined;
      fixture.detectChanges();

      component.searchphraseChanged(event);

      const result = await firstValueFrom(component.searchphrase$);
      expect(result.currentSearch).toEqual('test');
      expect(spyOnUpdateColumn).toHaveBeenCalledWith({column: '', displayValue: 'test', id: 'search_', label: '', type: 'search', value: 'test'});
    });
  });

  describe('reset()', () => {

    test('reset searchphrase to empty string', async () => {
      const event = {target: {value: 'test'}} as unknown as Event;
      component.searchphraseChanged(event);

      component.reset();

      const result = await firstValueFrom(component.searchphrase$);
      expect(result.currentSearch).toEqual('');
    });
  });

  describe('removedFilter', () => {

    const event = {target: {value: 'test'}} as unknown as Event;

    beforeEach(() => component.searchphraseChanged(event));

    test('empty array', async () => {
      component.removedFilter = [];

      const result = await firstValueFrom(component.searchphrase$);
      expect(result.currentSearch).toEqual('');
    });
  });
});
