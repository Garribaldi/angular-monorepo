import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { DateAdapter } from "@angular/material/core";
import { MockModule, MockProvider } from "ng-mocks";
import { ShellModule } from "@local/demo/shell/feature";
import moment from "moment";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let dateAdapter: DateAdapter<any>;

  let spyOnMomentLocale: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ShellModule)
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MockProvider(DateAdapter, {setLocale: jest.fn()})
      ]
    }).compileComponents();

    jest.clearAllMocks();

    dateAdapter = TestBed.inject(DateAdapter);

    spyOnMomentLocale = jest.spyOn(moment, 'locale');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(app).toBeTruthy();
  });


  describe('Locale setting', () => {

    it('should set locale to "de"', () => {
      expect(spyOnMomentLocale).toHaveBeenCalledWith('de');
      expect(dateAdapter.setLocale).toHaveBeenCalledWith('de-DE');
    });
  });
});
