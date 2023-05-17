import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Captchav3Component } from './captchav3.component';
import { MockProvider } from "ng-mocks";
import { ReCaptchaV3Service } from "ng-recaptcha";

describe('Captchav3Component', () => {
  let component: Captchav3Component;
  let fixture: ComponentFixture<Captchav3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Captchav3Component],
      providers: [
        MockProvider(ReCaptchaV3Service)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Captchav3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
