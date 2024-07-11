import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridCheckFilterComponent } from './data-grid-check-filter.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FilterNestedNode, PanelStateService } from '@local/angular-material/data-grid/utils';
import { testCheckFilter } from '../../test-setup';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DataGridCheckFilterComponent', () => {
  let component: DataGridCheckFilterComponent;
  let fixture: ComponentFixture<DataGridCheckFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatTreeModule),
        MockModule(FontAwesomeModule)
      ],
      declarations: [
        DataGridCheckFilterComponent
      ],
      providers: [
        MockProvider(PanelStateService, {
          panelOpen$: of(false)
        })
      ]
    }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridCheckFilterComponent);

    component = fixture.componentInstance;
    component.filter = [testCheckFilter];

    fixture.detectChanges();
  });

  test('create component', () => {
    expect(component).toBeTruthy();
  });

  describe('set component filter', () => {

    test('set empty filter array', () => {
      component.filter = [];
      fixture.detectChanges();

      const result = component.dataSource.data;

      expect(result[0].value).toBeNull();
      expect(result[0].children?.length).toEqual(0);
    });
  });

  describe('hasChild()', () => {

    let parentNode: FilterNestedNode;

    beforeEach(() => parentNode = component.dataSource.data[0]);

    test('node has children', () => {
      const result = component.hasChild(0, parentNode);

      expect(result).toBeTruthy();
    });

    test('node has no children', () => {
      const childNode = (parentNode.children as FilterNestedNode[])[0];

      const result = component.hasChild(0, childNode);

      expect(result).toBeFalsy();
    });
  });

  describe('hideNode()', () => {

    const node = {value: 'test data 1', hitCount: 1} as FilterNestedNode;

    test('filter string empty', () => {
      component.filterString = '';

      const result = component.hideNode(node);

      expect(result).toBeFalsy();
    });

    test('node value filtered', () => {
      component.filterString = 'Test';

      const result = component.hideNode(node);

      expect(result).toBeFalsy();
    });

    test('node value not filtered', () => {
      component.filterString = 'check';

      const result = component.hideNode(node);

      expect(result).toBeTruthy();
    });
  });

  describe('nodeClicked()', () => {

    let node: FilterNestedNode;
    let changeEvent: MatCheckboxChange;

    let spyOnAddFilter: jest.SpyInstance;
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(() => {
      const nodelist = component.treeControl.getChildren(component.dataSource.data[0]) as FilterNestedNode[];
      node = nodelist.at(0) ?? ({} as FilterNestedNode);
      changeEvent = new MatCheckboxChange();

      spyOnAddFilter = jest.spyOn(component.addFilter, 'emit');
      spyOnRemoveFilter = jest.spyOn(component.removeFilter, 'emit');
    });

    test('add filter', () => {
      changeEvent.checked = true;

      component.nodeClicked(node, changeEvent);

      expect(spyOnAddFilter).toHaveBeenCalledWith(testCheckFilter);
      expect(component.filtersSelected).toEqual(1);
    });

    test('remove filter', () => {
      changeEvent.checked = false;

      component.nodeClicked(node, changeEvent);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testCheckFilter);
      expect(component.filtersSelected).toEqual(0);
    });

    test('do not update filter list', () => {
      node.value = 'Test neu';

      component.nodeClicked(node, changeEvent);

      expect(spyOnAddFilter).not.toHaveBeenCalled();
      expect(spyOnRemoveFilter).not.toHaveBeenCalled();
    });
  });

  describe('selectAll()', () => {

    test('select all nodes', () => {
      component.selectAll();

      expect(component.filtersSelected).toEqual(1);
    });

    test('no selectable nodes', () => {
      component.dataSource.data[0].children = undefined;

      component.selectAll();

      expect(component.filtersSelected).toEqual(0);
    });
  });

  describe('resetFilter()', () => {

    let spyOnRemoveFiltersByColumn: jest.SpyInstance;

    beforeEach(() => (spyOnRemoveFiltersByColumn = jest.spyOn(component.removeColumn, 'emit')));

    test('remove all filters from column', () => {
      component.filtersSelected = 1;

      component.resetFilter();

      expect(spyOnRemoveFiltersByColumn).toHaveBeenCalled();
      expect(component.filtersSelected).toEqual(0);
    });
  });

  describe('removedFilter', () => {

    let nestedNode: FilterNestedNode[];

    beforeEach(() => {
      nestedNode = component.dataSource.data[0].children as FilterNestedNode[];
      component.filter = [testCheckFilter];
      component.dataSource.data[0].children = nestedNode.map(node => ({...node, checked: true}));
      fixture.detectChanges();
    });

    test('empty array', () => {
      component.removedFilter = [];

      expect(component.filtersSelected).toEqual(1);
    });

    test('datasource children undefined', () => {
      component.dataSource.data[0].children = undefined;
      fixture.detectChanges();

      component.removedFilter = [testCheckFilter];

      expect(component.filtersSelected).toEqual(0);
    });

    test('remove initial filter', () => {
      component.removedFilter = [testCheckFilter];

      expect(component.filtersSelected).toEqual(0);
    });
  });
});
