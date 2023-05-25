import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Title } from "@angular/platform-browser";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        Title
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
});
