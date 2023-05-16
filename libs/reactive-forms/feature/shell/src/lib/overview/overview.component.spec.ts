import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { MockProvider } from "ng-mocks";
import { SharedDataService } from "@local/shared/data-access";
import { CountryService } from "@local/shared/utils";
import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      providers: [
        MockProvider(SharedDataService, {
          getCountries$: () => of([]),
          getEmployees$: () => of([])
        }),
        MockProvider(CountryService, {
          setPreferredCountries: jest.fn()
        }),
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
