import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Title } from "@angular/platform-browser";
import { MockProvider } from "ng-mocks";
import { Environment, EnvironmentsService } from "@local/shared/feature/environments";

const env: Partial<Environment> = {
  production: false,
  apiBackendUrl: 'https://test.com:8080',
  externalIntegrationUrl: 'https://integration.com:8080'
};

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        Title,
        MockProvider(EnvironmentsService, {
          apiBackendUrl: env.apiBackendUrl,
          externalIntegrationUrl: env.externalIntegrationUrl
        })
      ]
    }).compileComponents();

    jest.clearAllMocks();

    titleService = TestBed.inject(Title);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("main")).toBeDefined();
    expect(app).toBeTruthy();
  });

  describe('Title', () => {

    it("should render title", () => {
      expect(titleService.getTitle()).toEqual("Local demo app");
    });
  });

  describe('Environment', () => {

    it('should set backend url', () => {
      expect(app.backendUrl).toEqual(env.apiBackendUrl);
    })

    it('should set integration url', () => {
      expect(app.integrationUrl).toEqual(env.externalIntegrationUrl);
    });
  });
});
