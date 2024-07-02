import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { MockComponent, MockDirective, MockModule, MockProvider } from 'ng-mocks';
import { of, Subject } from 'rxjs';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestData, testDataSource } from '../test-setup';
import { DatasourceService, Filter, GroupedFilter, PanelStateService, SelectedFilterStateService } from '@local/angular-material/data-grid/utils';
import { DataGridUiModule } from '@local/angular-material/data-grid/ui';
import { TranslateModule } from '@ngx-translate/core';


describe('DataGridComponent', () => {
  let component: DataGridComponent<TestData>;
  let fixture: ComponentFixture<DataGridComponent<TestData>>;

  let selectedFilterStateService: SelectedFilterStateService;
  let dataSourceService: DatasourceService<TestData>;
  let panelStateService: PanelStateService;

  let spyOnFiltered: jest.SpyInstance;

  const testFilter = {id: 'test-filter-1'} as Filter;
  const testFilterGroup = new Map<string, Filter[]>().set('column1', [
    testFilter
  ]);
  const selectedFilterMock = new Subject<GroupedFilter>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(TranslateModule),
        MockModule(FontAwesomeModule),
        MockModule(DataGridUiModule)
      ],
      declarations: [
        DataGridComponent,
        MockDirective(MatAccordion),
        MockComponent(MatExpansionPanel),
        MockComponent(MatExpansionPanelHeader),
        MockDirective(MatExpansionPanelTitle),
        MockDirective(MatExpansionPanelDescription)
      ]
    })
      .overrideComponent(DataGridComponent, {
        set: {
          providers: [
            MockProvider(SelectedFilterStateService, {
              selectedFilter$: selectedFilterMock.asObservable(),
              removeFilter: jest.fn(),
              removeAllFilter: jest.fn()
            }),
            MockProvider(DatasourceService<TestData>, {
              applyFilter: jest.fn(),
              filteredData$: of(testDataSource)
            }),
            MockProvider(PanelStateService, {
              setPanelState: jest.fn()
            })
          ]
        }
      }).compileComponents();
    jest.clearAllMocks();

    fixture = TestBed.createComponent(DataGridComponent<TestData>);

    selectedFilterStateService = fixture.debugElement.injector.get(SelectedFilterStateService);
    dataSourceService = fixture.debugElement.injector.get(DatasourceService<TestData>);
    panelStateService = fixture.debugElement.injector.get(PanelStateService);

    component = fixture.componentInstance;
    component.dataSource = testDataSource;

    spyOnFiltered = jest.spyOn(component.filtered, 'emit');

    fixture.detectChanges();
  });

  test('create component', () => {
    selectedFilterMock.next(testFilterGroup);

    expect(component).toBeTruthy();
    expect(component.groupedFilter()).toEqual(testFilterGroup);
    expect(dataSourceService.applyFilter).toHaveBeenCalledWith(testFilterGroup);
    expect(dataSourceService.dataSource).toEqual(testDataSource);
    expect(spyOnFiltered).toHaveBeenCalled();
  });

  describe('datasource', () => {

    let spyOnApplyFilter: jest.SpyInstance;

    beforeEach(() => {
      jest.clearAllMocks();
      spyOnApplyFilter = jest.spyOn(dataSourceService, 'applyFilter');
    });

    test('update and apply filter', () => {
      selectedFilterMock.next(testFilterGroup);

      component.dataSource = [...testDataSource];

      expect(spyOnApplyFilter).toHaveBeenCalledWith(component.groupedFilter());
    });

    test('update without applying filter', () => {
      component.dataSource = [...testDataSource];

      expect(spyOnApplyFilter).not.toHaveBeenCalled();
    });
  });

  describe('removeFilter()', () => {

    test('remove single filter', () => {
      component.removeFilter(testFilter);

      expect(selectedFilterStateService.removeFilter).toHaveBeenCalledWith(
        testFilter
      );
    });
  });

  describe('removeAllFilter()', () => {

    test('remove all filter', () => {
      component.removeAllFilter();

      expect(selectedFilterStateService.removeAllFilter).toHaveBeenCalled();
    });

    test('remove all filter, stop propagation', () => {
      const eventMock = {stopPropagation: jest.fn()} as unknown as Event;

      component.removeAllFilter(eventMock);

      expect(eventMock.stopPropagation).toHaveBeenCalled();
      expect(selectedFilterStateService.removeAllFilter).toHaveBeenCalled();
    });
  });

  describe('openPanel()', () => {

    test('open panel', () => {
      component.panelOpenState = false;

      component.openPanel();

      expect(panelStateService.setPanelState).toHaveBeenCalledWith(true);
    });
  });

  describe('closePanel()', () => {

    test('close panel', () => {
      component.panelOpenState = true;

      component.closePanel();

      expect(component.panelOpenState).toBeFalsy();
      expect(panelStateService.setPanelState).toHaveBeenCalledWith(false);
    });
  });
});
