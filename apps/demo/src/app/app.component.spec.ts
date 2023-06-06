import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Title } from "@angular/platform-browser";
import { DateAdapter } from "@angular/material/core";
import { MockModule, MockProvider } from "ng-mocks";
import { ShellFeatureModule } from "@local/demo/shell/feature";
import moment from "moment";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let titleService: Title;
  let dateAdapter: DateAdapter<any>;

  let spyOnMomentLocale: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ShellFeatureModule)
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MockProvider(Title, {setTitle: jest.fn()}),
        MockProvider(DateAdapter, {setLocale: jest.fn()})
      ]
    }).compileComponents();

    jest.clearAllMocks();

    titleService = TestBed.inject(Title);
    dateAdapter = TestBed.inject(DateAdapter);

    spyOnMomentLocale = jest.spyOn(moment, 'locale');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(app).toBeTruthy();
  });

  describe('Title', () => {

    it("should render title", () => {
      expect(titleService.setTitle).toHaveBeenCalledWith('Local demo app');
    });
  });

  describe('Locale setting', () => {

    it('should set locale to "de"', () => {
      expect(spyOnMomentLocale).toHaveBeenCalledWith('de');
      expect(dateAdapter.setLocale).toHaveBeenCalledWith('de-DE');
    });
  });
});
