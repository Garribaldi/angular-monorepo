import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MockModule } from "ng-mocks";
import { MatDatepickerModule } from "@angular/material/datepicker";
import moment from "moment";
import { DateFilter } from "../models/date-filter.model";

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;

  const testLabel = 'Test Label';
  const testColumn = 'test-column';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule)
      ],
      declarations: [DataGridDateFilterComponent]
    }).compileComponents();


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
      spyOnUpdateFilter = jest.spyOn(component.updateColumn, 'emit');
      spyOnRemoveFilter = jest.spyOn(component.removeColumn, 'emit');
    });

    it('should update date filter', () => {
      component.fromDate = moment();
      component.toDate = moment();

      component.datePickerClosed();

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expect.any(DateFilter));
    });

    it('should remove date filter', () => {
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

    it('should update date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = moment();
      component.toDate = moment();

      component.onKeyUp(event);

      expect(spyOnUpdateFilter).toHaveBeenCalledWith(expect.any(DateFilter));
    });

    it('should remove date filter on "Enter"', () => {
      const event = new KeyboardEvent('keyup', {key: 'Enter', code: 'Enter'});
      component.fromDate = null;
      component.toDate = null;

      component.onKeyUp(event);

      expect(spyOnRemoveFilter).toHaveBeenCalled();
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
