import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoReactiveFormsComponent } from './demo-reactive-forms.component';
import { MockProvider } from "ng-mocks";
import { of } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { SharedDataService } from "@local/shared/data-access";
import { CountryService } from "@local/shared/utils";

describe('DemoReactiveFormsComponent', () => {
  let component: DemoReactiveFormsComponent;
  let fixture: ComponentFixture<DemoReactiveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DemoReactiveFormsComponent
      ],
      providers: [
        MockProvider(SharedDataService, {
          getCities$: () => of([]),
          getCountries$: () => of([]),
          getEmployees$: () => of([])
        }),
        MockProvider(CountryService, {
          setPreferredCountries: jest.fn()
        }),
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
