import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridChipsBarComponent } from './data-grid-chips-bar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MockComponent, MockModule } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Filter, GroupedFilter } from '@local/angular-material/data-grid/utils';

describe('DataGridChipsBarComponent', () => {
  let component: DataGridChipsBarComponent;
  let fixture: ComponentFixture<DataGridChipsBarComponent>;

  const testFilter = {
    id: '12345',
    value: 'Test Filter',
    label: 'Test Label'
  } as Filter;
  const testGroupedFilter: GroupedFilter = new Map<string, Filter[]>();
  testGroupedFilter.set('test-column', [testFilter]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatChipsModule),
        MockModule(TranslateModule)
      ],
      declarations: [
        DataGridChipsBarComponent,
        MockComponent(FaIconComponent)
      ]
    }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridChipsBarComponent);
    component = fixture.componentInstance;
    component.groupedFilter = testGroupedFilter;

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('remove()', () => {

    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(
      () => (spyOnRemoveFilter = jest.spyOn(component.removeFilter, 'emit'))
    );

    test('remove filter', () => {
      component.remove(testFilter);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testFilter);
    });
  });

  describe('removeAll()', () => {

    let spyOnRemoveAllFilter: jest.SpyInstance;

    beforeEach(() => (spyOnRemoveAllFilter = jest.spyOn(component.removeAllFilter, 'emit')));

    test('remove all filter', () => {
      component.removeAll();

      expect(spyOnRemoveAllFilter).toHaveBeenCalled();
    });
  });
});
